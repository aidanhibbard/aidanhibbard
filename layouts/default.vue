<script setup lang='ts'>

</script>

<template>
  <div class="min-h-full">
    <MaintnenceBanner />
    <NavBar />
    <main>
      <slot />
    </main>
    <footer class="mx-auto mt-32 w-full max-w-container px-4 sm:px-6 lg:px-8">
      <h2
        id="footer-heading"
        class="sr-only"
      >
        Footer
      </h2>
      <div class="mb-16">
        <hr class="mt-10 border-t border-zinc-100"><div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div>
            <h3 class="text-sm/6 font-semibold text-gray-900">
              Social Links
            </h3>
            <ul class="mt-4 space-y-4">
              <li class="group">
                <a
                  href="/components/marketing/sections/heroes"
                  class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5"
                >LinkedIn</a>
              </li>
              <li class="group">
                <a
                  href="/components/marketing/sections/feature-sections"
                  class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5"
                >GitHub</a>
              </li>
              <li class="group">
                <a
                  href="/components/marketing/sections/pricing"
                  class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5"
                >CodePen</a>
              </li>
              <li class="group">
                <a
                  href="/components/marketing/sections/header"
                  class="text-sm/6 text-gray-600 hover:text-gray-900 group-last:text-slate-900 [&amp;>span]:group-last:inline-block [&amp;>span]:group-last:transition [&amp;>span]:group-last:hover:translate-x-0.5"
                >Instagram</a>
              </li>
            </ul>
          </div><div>
            <h3 class="text-sm/6 font-semibold text-gray-900">
              About
            </h3>
            <ul class="mt-4 space-y-4" />
          </div><div>
            <h3 class="text-sm/6 font-semibold text-gray-900">
              Templates &amp; UI Kits
            </h3>
            <ul class="mt-4 space-y-4" />
          </div>
        </div>
      </div>
      <div class="items-centers grid grid-cols-1 justify-center gap-4 border-t border-gray-100 py-6 md:grid-cols-2">
        <p class="text-sm/6 text-slate-600 max-md:text-center">
          © <!-- -->2024<!-- --> Aidan Hibbard. All rights reserved.
        </p>
        <div class="flex items-center justify-center space-x-4 text-sm/6 font-semibold text-slate-900 md:justify-end">
          <a href="/privacy-policy">Contact</a>
          <div class="h-4 w-px bg-slate-200" /><a href="/changelog">GitHub</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>