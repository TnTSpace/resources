import { Role } from "$lib/constants";

export type ModalType = "createStore" | "createColor" | "createSize" | "createCategory" | "createProduct" | "checkoutOrder" | "expandProduct" | "sizeList" | "filter" | "navigation" | "productQuantity"

export type CurrencyType = 'naira' | 'dollar' | 'pound' | 'euro'

export type SizeType = "Baby Cloth" | "Adult Cloth" | "Televisions" | "Phones" | "RAM" | "ROM"

export type ProductCardType = 'grid' | 'list'

export type WidgetType = 'banner' | 'productcarousel'

export type ShippingType = "express" | "standard"

export interface iMeta {
  title: string;
  keywords: string[];
  description: string;
  ogimage: string;
  link: string;
}

export interface iXata {
  xata_createdat: Date;
  xata_updatedat: Date;
  xata_version: number;
  xata_id: string;
}

export interface iUser extends iXata {
  email: string;
  image: string;
  name: string;
  nameTag: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: Role
}

export interface iSizeMap {
  icon: any;
  items: string[];
  label: string
}

export interface iSelect {
  label: string;
  value: string;
}

export interface iListSelect {
  label: string;
  value: string;
}

export interface iModal {
  title: string;
  description: string;
  type: ModalType;
  open: boolean;
  data?: any;
  onClose?: () => void
}

export interface iCategory extends iXata {
  name: string;
  banner: string | iImage;
  thumbnail: string | iImage;
}

export interface iShipping extends iXata {
  country: string;
  state: string;
  location: string;
  standardNote: string;
  standard: number;
  expressNote: string;
  express: number;
  miscellaneous: number;
}

export interface iShippingType {
  amount: number;
  type: ShippingType
}

export interface iSize extends iXata {
  name: string;
  value: string;
  category: string | iCategory;
  dirty?: boolean;
}

export interface iColor extends iXata {
  name: string;
  value: string;
}

export interface iReview extends iXata {
  product: string | iProduct;
  comment: string;
  score: number;
  reviewer: string;
}

export interface iTag extends iXata {
  name: string;
  code: string;
}

export interface iProductImage extends iXata {
  product: string | iProduct;
  image: string | iImage
}

export interface iProduct extends iXata {
  category: string | iCategory;
  next: string | iProduct;
  thumbnail: string | iImage;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  sku: string;
  isFeatured: boolean;
  isArchived: boolean;
  sizes: string[];
  colors: string[];
  images: string[] | iImage[];
  tags: string[];
  reviewproduct: {
    records: iReview[]
  },
  reviews: number;
  rating: number
  discount: number;
  trending: boolean;
  stock: number;
}

export interface iImage extends iXata {
  url: string;
  fileId: string;
}

export interface Swatch {
  _rgb: [number, number, number];
  _hsl: [number, number, number];
  _population: number;
  r: number;
  g: number;
  b: number;
  hex: string;
  hsl: [number, number, number];
  rgb: [number, number, number];
  population: number;
  bodyTextColor: string;
  titleTextColor: string;
}
export interface iSwatch extends iImage {
  swatch: Swatch;
}


export interface iRoute {
  name: string;
  href: string;
  icon?: any
}

export interface iSwitcher {
  name: string;
  logo: any
  plan: string;
}

export interface iPaystackParams {
  amount: number;
  reference: string;
  name: string;
  email: string;
  metadata: Record<string, any>;
  [key: string]: any;
}

export interface iPaystackResData {
  authorization_url: string,
  access_code: string,
  reference: string
}
export interface iPaystackRes {
  status: boolean;
  message: string;
  data: iPaystackResData
}

export interface iPaystackWebhookData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: string | null;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: {
    details: {
      name: string;
      email: string;
      address: string;
      phone: string;
      products: string[];
      user: string;
      shippingType: string
      shippingLocation: string
      shippingAmount: number,
    };
    orderItems: Array<iOrderItem>;
  };
  fees_breakdown: any | null;
  log: any | null;
  fees: number;
  fees_split: any | null;
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: string | null;
    receiver_bank_account_number: string | null;
    receiver_bank: string | null;
  };
  customer: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    customer_code: string;
    phone: string | null;
    metadata: any | null;
    risk_action: string;
    international_format_phone: string | null;
  };
  plan: any;
  subaccount: any;
  split: any;
  order_id: string | null;
  paidAt: string;
  requested_amount: number;
  pos_transaction_data: any | null;
  source: {
    type: string;
    source: string;
    entry_point: string;
    identifier: string | null;
  };
}

export interface iPaystackWebhookResponse {
  event: string;
  data: iPaystackWebhookData
}

export interface iOrderItem extends iXata {
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
  order: string | iOrder;
  reference: string;
  product: string | iProduct,
  user: string | iUser
}


export interface iOrder extends iXata {
  isPaid: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
  reference: string;
  amount: number;
  shippingType: string
  shippingLocation: string
  shippingAmount: number
  products: string[];
  user: string | iUser
  order_itemorder: {
    records: iOrderItem[]
  }
}

export interface iCart {
  product: iProduct;
  quantityOrdered: number;
  sizeOrdered?: string;
  colorOrdered?: string;
}

export interface iXataCart extends iXata {
  product: string | iProduct;
  user: string | iUser;
  quantityOrdered: number;
  sizeOrdered?: string;
  colorOrdered?: string;
}

export interface iSummary {
  category: { name: string };
  colors: string[]
  sizes: string[]
}

export interface iPhone { value: string; selectedCountry: string }

export interface iBanner {
  image: string;
  title: string;
  href: string;
}

export interface iCarousel {

}

export interface iWidgetItem extends iXata {
  widget: string | iWidget;
  row: string;
  col: string
  banner: string | iImage
  product: string | iProduct
}

export interface iWidget extends iXata {
  id: string;
  type: WidgetType;
  position: number;
  title: string;
  subline: string;
  url: string;
}

export interface iRecentlyViewed extends iXata {
  user: string | iUser;
  product: string | iProduct;
}