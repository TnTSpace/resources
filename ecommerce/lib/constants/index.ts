import type { CurrencyType, iRoute, iSelect, iSizeMap, SizeType } from "$lib/interface";
import { BabyIcon, LaptopIcon, MicrochipIcon, SmartphoneIcon, TvMinimalIcon, User } from "lucide-svelte";

export enum Constants {
  CART = 'beuzibah-store-cart',
  VIEW = 'beuzibah-store-product-view',
  SELLERNO = '+2348066514072'
}

export enum Mode {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Role {
  ADMIN = "admin",
  EDITOR = "editor",
  GUEST = "guest"
}

export enum Currency {
  NAIRA = 'naira',
  DOLLAR = 'dollar',
  EURO = 'euro',
  POUND = 'pound'
}

export enum CurrencySymbol {
  NAIRA = '₦',
  DOLLAR = '$',
  POUND = '£',
  EURO = '€'
}

export enum CurrencyAcronym {
  NAIRA = 'NGN',
  DOLLAR = 'USD',
  POUND = 'GBP',
  EURO = 'EUR'
}

export enum eProductCardType {
  LIST = 'list',
  GRID = 'grid'
}

export const sizeMap: Record<SizeType, iSizeMap> = {
  'Adult Cloth': {
    icon: User,
    items: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    label: "Select adult cloth size(s)"
  },
  'Baby Cloth': {
    icon: BabyIcon,
    items: ['1 - 2 Years', '3 - 4 Years', '5 - 6 Years', '7 - 8 Years', '9 - 10 Years', '11 - 12 Years'],
    label: "Select baby cloth size(s)"
  },
  Televisions: {
    icon: TvMinimalIcon,
    items: ['24"', '32"', '43"', '50"', '55"', '65"', '85"'],
    label: "Select television size(s)"
  },
  Phones: {
    icon: SmartphoneIcon,
    items: ['1 - 2"', '6 - 7"'],
    label: "Select Phone size(s)"
  },
  RAM: {
    icon: MicrochipIcon,
    items: ['4GB', '8GB', '16GB', '32GB', '64GB'],
    label: "Select device RAM"
  },
  ROM: {
    icon: LaptopIcon,
    items: ['4GB', '6GB', '8GB', '16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB', '4TB'],
    label: "Select device ROM / disc space"
  }
}

export const symbolMap: Record<CurrencyType, CurrencySymbol> = {
  naira: CurrencySymbol.NAIRA,
  dollar: CurrencySymbol.DOLLAR,
  pound: CurrencySymbol.POUND,
  euro: CurrencySymbol.EURO
};

export const acronymMap: Record<CurrencyType, CurrencyAcronym> = {
  naira: CurrencyAcronym.NAIRA,
  dollar: CurrencyAcronym.DOLLAR,
  pound: CurrencyAcronym.POUND,
  euro: CurrencyAcronym.EURO
};

export const educationalList: iRoute[] = [
  {
    name: 'About Us',
    href: '/about'
  },
  {
    name: 'Vision',
    href: '/vision'
  },
  {
    name: 'Mission',
    href: '/mission'
  },
  {
    name: 'How to Shop',
    href: '/how-to-shop'
  },
  {
    name: 'Delivery',
    href: '/delivery'
  },
  {
    name: 'Bulk Purchase',
    href: '/bulk-purchase'
  },
  {
    name: 'Privacy Policy',
    href: '/privacy-policy'
  },
  {
    name: 'Terms of Use',
    href: '/terms-of-use'
  },
  {
    name: 'Cookie Policy',
    href: '/cookie-policy'
  }
]

export const footerExclusionList = educationalList.map(item => item.href)

export const widgetOptions: iSelect[] = [
  {
    label: "Banners",
    value: "banner"
  },
  {
    label: "Product Carousel",
    value: "productcarousel"
  }
]

export enum eWidgetType {
  BANNER = 'banner',
  PRODUCTCAROUSEL = 'productcarousel'
}