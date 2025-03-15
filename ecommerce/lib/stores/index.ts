import { Constants, eProductCardType } from "$lib/constants";
import type { iModal, iXataCart, ProductCardType } from "$lib/interface";
import { createPersistentStore } from "@toolsntuts/utils";
import { writable } from "svelte/store";

const modalStore = writable<iModal>({
  title: "Create Store",
  description: "Enter store name",
  open: false,
  type: "createStore"
})

const drawerStore = writable<iModal>({
  title: "Beuzibah Stores",
  description: "Navigate our space",
  open: false,
  type: "navigation"

})

const formStore = writable<iModal>({
  title: "Create Color",
  description: "Enter color",
  open: false,
  type: 'createColor'
})

const cartStore = createPersistentStore<Partial<iXataCart>[]>(Constants.CART, [])

const viewStore = createPersistentStore<ProductCardType>(Constants.VIEW, eProductCardType.GRID)

const shippingOpenStore = writable(false)

export { modalStore, formStore, viewStore, cartStore, drawerStore, shippingOpenStore }