import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iProduct, iImage } from "$lib/interface"

const selectionList = [
  "*",
  "category.*",
  "next.*",
  "thumbnail.*",
  "next.thumbnail.*"
] as any

const productQuery = (url: URL) => {
  const categoryName = url.searchParams.get("category") || undefined;
  const colorOptions = url.searchParams.get("color") || undefined;
  const colors = colorOptions ? colorOptions.split('--') : undefined;
  const sizeOptions = url.searchParams.get("size") || undefined;
  const sizes = sizeOptions ? sizeOptions.split('--') : undefined
  const isFeatured = url.searchParams.get("isFeatured") || undefined;
  const priceOptions = url.searchParams.get('price') || undefined;
  const prices = priceOptions ? priceOptions.split('-') : undefined

  const query = {
    ...(categoryName ? { "category.name": { $iContains: categoryName } } : {}),
    ...(sizes ? { sizes: { $includes: sizes } } : {}),
    ...(colors ? { colors: { $includes: colors } } : {}),
    ...(isFeatured ? { isFeatured: true } : {}),
    isArchived: false,
    ...(prices ? { $all: [{ price: { $ge: Number(prices[0]) } }, { price: { $le: Number(prices[1]) } }] } : {})
  };

  return { query };
}

const imagePromise = async (product: iProduct) => {
  const xata = getXataClient()
  const productImages = await xata.db.product_image
    .select(["*", "image.*"])
    .filter({ product: product.xata_id })
    .getMany()
  const images = productImages.map((pI: any) => pI.image) as iImage[]

  let newProduct = { ...product, images } as iProduct
  return newProduct
}

export const getProducts = async (url: URL) => {
  const xata = getXataClient()

  const { query } = productQuery(url)
  const sort = url.searchParams.get('sort')
  const [column, direction]: Array<any> = sort ? sort.split('_') : []

  try {
    let products = []
    if (column) {
      products = await xata.db.product
        .filter(query as any)
        .select(selectionList)
        .sort(column, direction)
        .getMany({ pagination: { size: 200 } }) as unknown as iProduct[]
    } else {
      products = await xata.db.product
        .filter(query as any)
        .select(selectionList)
        .sort("xata_updatedat", "desc")
        .getMany({ pagination: { size: 200 } }) as unknown as iProduct[]
    }

    const promises = products.map(imagePromise)
    const result = await Promise.all(promises)

    return onSuccess(result)
  } catch (error: any) {
    console.trace("getProducts()", error.message)
    return onError(error.message, [])
  }
}

export const getProduct = async (productId: string) => {
  const xata = getXataClient()
  try {
    const product = await xata.db.product
      .filter({
        xata_id: productId
      })
      .select(selectionList).getFirst() as unknown as iProduct

    if (product) {
      const result = await imagePromise(product)
      return onSuccess(result)
    } else {
      return onSuccess(product)
    }
  } catch (error: any) {
    console.trace("getProduct()", error.message)
    return onError(error.message)
  }
}

export const addProduct = async (partialProduct: any) => {
  const xata = getXataClient()
  try {
    const product = await xata.db.product.create({
      ...partialProduct
    })
    return onSuccess(product)
  } catch (error: any) {
    console.log("addProduct()", error.message)
    return onError(error.message)
  }
}

export const deleteProduct = async (productId: string) => {
  const xata = getXataClient()

  try {
    const product = await xata.db.product.delete(productId)
    return onSuccess(product)
  } catch (error: any) {
    console.log("deleteProduct()", error.message)
    return onError(error.message)
  }
}

export const updateProduct = async (productId: string, data: any) => {
  const xata = getXataClient()

  console.log({ data })

  try {
    const product = await xata.db.product.update(productId, data) as unknown as iProduct

    const result = await imagePromise(product)
    return onSuccess(result)
  } catch (error: any) {
    console.log("updateProduct()", error.message)
    return onError(error.message)
  }
}

export const getFilters = async () => {
  const xata = getXataClient()

  try {
    const records = await xata.db.product.summarize({
      columns: ['sizes', 'category.name', 'colors']
    })

    return onSuccess(records.summaries)
  } catch (error: any) {
    console.log("getSummary()", error.message)
    return onError(error.message)
  }
}

export const filterProducts = (products: iProduct[], term: string) => {
  const filterKeys: (keyof iProduct)[] = [
    'name',
    'price',
    'oldPrice',
    'sku',
    'description',
    'xata_createdat',
    'xata_updatedat'
  ];

  const lowercasedTerm = term.toLowerCase();
  const result = products.filter((item) =>
    filterKeys.some((key) => {
      const childValue = item[key];
      return childValue?.toString().toLowerCase().includes(lowercasedTerm);
    })
  );
  return result
}