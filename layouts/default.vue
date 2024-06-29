<script setup lang='ts'>

</script>

<template>
  <div class="min-h-full">
    <NavBar />
    <main>
      <slot />
    </main>
    <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mb-16">
            <hr class="mt-10 border-t border-zinc-100"><div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"><div>
              <h3 class="text-sm/6 font-semibold text-gray-900">Social Links</h3>
              <ul class="mt-4 space-y-4">
                <li class="group"><a href="/components/marketing/sections/heroes" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">LinkedIn</a></li>
                <li class="group"><a href="/components/marketing/sections/feature-sections" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">GitHub</a></li>
                  <li class="group"><a href="/components/marketing/sections/pricing" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">CodePen</a></li>
                  <li class="group"><a href="/components/marketing/sections/header" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Instagram</a></li>
              </ul></div><div><h3 class="text-sm/6 font-semibold text-gray-900">About</h3><ul role="list" class="mt-4 space-y-4"><li class="group"><a href="/components/ecommerce/components/product-overviews" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Product Overviews</a></li>
                <li class="group"><a href="/components/ecommerce/components/product-lists" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Contact</a></li>
                <li class="group"><a href="/components/ecommerce/components/category-previews" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Category Previews</a></li>
                <li class="group"><a href="/components/ecommerce/components/shopping-carts" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Shopping Carts</a></li>
                <li class="group"><a href="/components/ecommerce/components/category-filters" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Category Filters</a></li>
                <li class="group"><a href="/components/ecommerce/components/product-quickviews" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Product Quickviews</a></li>
                <li class="group"><a href="/components/ecommerce/components/product-features" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Product Features</a></li>
                <li class="group"><a href="/components/ecommerce/components/store-navigation" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Store Navigation</a></li>
                <li class="group"><a href="/components/ecommerce/components/promo-sections" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Promo Sections</a></li>
                <li class="group"><a href="/components/ecommerce/components/checkout-forms" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Checkout Forms</a></li>
                <li class="group"><a href="/components/ecommerce/components/reviews" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Reviews</a></li>
                <li class="group"><a href="/components/ecommerce/components/order-summaries" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Order Summaries</a></li>
                <li class="group"><a href="/components/ecommerce/components/order-history" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Order History</a></li>
                <li class="group"><a href="/components/ecommerce/components/incentives" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Incentives</a></li>
                <li class="group"><a href="/components#product-ecommerce" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Browse all <span>→</span></a></li>
              </ul></div><div><h3 class="text-sm/6 font-semibold text-gray-900">Templates &amp; UI Kits</h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li class="group"><a href="/templates/catalyst" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Catalyst UI Kit</a></li>
                  <li class="group"><a href="/templates/spotlight" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Personal Website Template</a></li>
                  <li class="group"><a href="/templates/salient" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Landing Page Template</a></li>
                  <li class="group"><a href="/templates/protocol" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">API Reference Template</a></li>
                  <li class="group"><a href="/templates/commit" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Changelog Template</a></li>
                  <li class="group"><a href="/templates/primer" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Info Product Template</a></li>
                  <li class="group"><a href="/templates/studio" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Agency Template</a></li>
                  <li class="group"><a href="/templates/transmit" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Podcast Template</a></li>
                  <li class="group"><a href="/templates/pocket" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">App Marketing Template</a></li>
                  <li class="group"><a href="/templates/syntax" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Documentation Template</a></li>
                  <li class="group"><a href="/templates/keynote" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Conference Template</a></li>
                  <li class="group"><a href="/templates" class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5">Browse all <span>→</span></a></li>
                </ul></div></div></div><div class="items-centers grid grid-cols-1 justify-between gap-4 border-t border-gray-100 py-6 md:grid-cols-2">
                  <p class="text-sm/6 text-slate-600 max-md:text-center">© <!-- -->2024<!-- --> Aidan Hibbard. All rights reserved.</p>
                    <div class="flex items-center justify-center space-x-4 text-sm/6 font-semibold text-slate-900 md:justify-end">
                    <a href="/privacy-policy">Contact</a>
                    <div class="h-4 w-px bg-slate-200"></div><a href="/changelog">GitHub</a></div>
                </div>
  </div>
</template>

<style scoped>

</style>