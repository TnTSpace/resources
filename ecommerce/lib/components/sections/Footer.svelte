<script lang="ts">
	import { page } from '$app/state';
	import { footerExclusionList } from '$lib/constants';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import Wrap from '$lib/components/widgets/Wrap.svelte';
	import Brand from '$lib/components/sections/Brand.svelte';

	const pathname = page.url.pathname;
</script>

<Wrap class={cn("border-t bg-white dark:bg-secondary px-4", footerExclusionList.includes(pathname) && "md:hidden")}>
  <footer>
    <div class="pb-6 pt-16 lg:pt-24">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <div class="flex justify-center sm:justify-start">
            <Brand />
          </div>
  
          <p class="mt-6 max-w-md text-center text-sm leading-relaxed sm:max-w-xs sm:text-left">
            Style, Beauty, and Innovation Delivered!
          </p>
  
          <ul class="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
            <li>
              <a href="/" rel="noreferrer" target="_blank">
                <span class="sr-only">Facebook</span>
                <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
  
            <li>
              <a href="/" rel="noreferrer" target="_blank" class=" hover:/75 transition">
                <span class="sr-only">Instagram</span>
                <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
  
            <li class="size-6 flex items-center justify-center">
              <a href="/" rel="noreferrer" target="_blank">
                <span class="sr-only">Twitter</span>
                <svg class="size-4" viewBox="0 0 1300 1300" fill="currentColor">
                  <g transform="matrix(1,0,0,1,-410.66,-410.658)">
                    <path
                      d="M1346.34,1589.31L1030.32,1130.16L985.316,1064.8L618.611,532.007L776.351,532.007L1072.91,962.886L1117.91,1028.25L1504.08,1589.31L1346.34,1589.31ZM1569.29,1544.46L1171.26,966.196L1126.26,900.797L841.533,487.149L817.935,452.867L468.066,452.867L553.393,576.864L931.968,1126.92L976.97,1192.25L1281.15,1634.21L1304.75,1668.45L1654.62,1668.45L1569.29,1544.46Z"
                      style="fill-rule:nonzero;"
                    ></path>
                  </g>
                  <g transform="matrix(1,0,0,1,-410.66,-410.658)">
                    <path
                      d="M985.316,1064.8L1030.32,1130.16L976.97,1192.25L567.638,1668.45L466.699,1668.45L931.968,1126.92L985.316,1064.8Z"
                      style="fill-rule:nonzero;"
                    ></path>
                  </g>
                  <g transform="matrix(1,0,0,1,-410.66,-410.658)">
                    <path
                      d="M1612.5,452.867L1171.26,966.196L1117.91,1028.25L1072.91,962.886L1126.26,900.797L1425.15,552.907L1511.56,452.867L1612.5,452.867Z"
                      style="fill-rule:nonzero;"
                    ></path>
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </div>
  
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
          <div class="text-center sm:text-left">
            <p class="text-lg font-medium">About Us</p>
  
            <ul class="mt-8 space-y-4 text-sm">
              <li>
                <a class="" href="/about"> Company History </a>
              </li>
  
              <li>
                <a class="" href="/vision"> Vision </a>
              </li>
  
              <li>
                <a class="" href="/"> Mission </a>
              </li>
            </ul>
          </div>
  
          <div class="text-center sm:text-left">
            <p class="text-lg font-medium">Helpful Links</p>
  
            <ul class="mt-8 space-y-4 text-sm">
              <li>
                <a class="" href="/how-to-shop">How to Shop</a>
              </li>
  
              <li>
                <a class="" href="/delivery">Delivery</a>
              </li>
              <li>
                <a class="" href="/bulk-purchase">Bulk Purchase</a>
              </li>
            </ul>
          </div>
  
          <div class="text-center sm:text-left">
            <p class="text-lg font-medium">Contact Us</p>
  
            <ul class="mt-8 flex flex-col md:items-start space-y-4 text-sm">
              <li>
                <Button
                  variant="ghost"
                  class="h-auto p-0 hover:bg-transparent"
                  href="mailto:beuzibahz@gmail.com"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
  
                  <span class="flex-1">Mail Us</span>
                </Button>
              </li>
  
              <li>
                <Button
                  variant="ghost"
                  class="h-auto p-0 hover:bg-transparent"
                  href="tel:+2348066514072"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
  
                  <span class="flex-1">Call Us</span>
                </Button>
              </li>
  
              <li class="flex items-start gap-1.5 ltr:sm:justify-start">
                <Button
                  href="https://g.co/kgs/7JyezSs"
                  variant="ghost"
                  class="h-auto p-0 hover:bg-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
  
                  <address class="-mt-0.5 flex-1 not-italic">
                    Locate Us
                  </address>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <div class="mt-12 border-t border-muted-foreground/20 pt-6">
        <div class="text-center sm:flex sm:justify-between sm:text-left">
          <div class="flex flex-col items-center text-sm md:flex-row md:gap-1">
            <span class="block">All rights reserved.</span>
  
            <Button variant="link" class="dark:text-muted-foreground" href="/terms-of-use">
              Terms & Conditions
            </Button>
            <Button variant="link" class="dark:text-muted-foreground" href="/privacy-policy">
              Privacy Policy
            </Button>
            <Button variant="link" class="dark:text-muted-foreground" href="/cookie-policy">
              Cookie Policy
            </Button>
          </div>
  
          <p class="mt-4 text-sm sm:order-first sm:mt-0">
            &copy; {new Date().getFullYear()} Beuzibah Stores
          </p>
        </div>
      </div>
    </div>
  </footer>
</Wrap>
