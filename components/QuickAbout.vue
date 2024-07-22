<script setup lang='ts'>
import { SparklesIcon, ServerIcon, WrenchIcon, ArrowPathIcon, ClockIcon } from '@heroicons/vue/20/solid';
</script>

<template>
  <div class="relative isolate overflow-hidden bg-white px-6 py-12 sm:py-8 lg:overflow-visible lg:px-0">
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
      <div class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div class="lg:pr-4">
          <div class="lg:max-w-lg">
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Building services to meet user needs. 
            </h1>
            <p class="mt-6 text-xl leading-8 text-gray-700">
              Whether it's public facing, or internal, software shouldn't feel difficult to use.
            </p>
          </div>
        </div>
      </div>
      <div class="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
        <NuxtImg
          class="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
          alt="Application Image"
          loading="lazy"
          format="webp"
        />
      </div>
      <div class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div class="lg:pr-4">
          <div class="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
            <p>
              Being a full-stack developer means crafting the user expierence from start to finish. However, launching a project isn't only writing lines of code. 
              Setting up Jira, Slack, and onboarding users in workspaces can all be part of the technical process. 
              When launching a new project, new developers are always a top consideration after a MVP. 
              Setting up deployment procedures, disaster recovery processes, and standards are all requirements for a smoothly running team. 
            </p>
            <ul class="mt-8 space-y-8 text-gray-600">
              <li class="flex gap-x-3">
                <SparklesIcon
                  class="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span><strong class="font-semibold text-gray-900">Beautiful UIs.</strong> Working with designers, and analysts to build user interfaces with the latest in design, such as Tailwind, Vuetify, Styled Components, and more.</span>
              </li>
              <li class="flex gap-x-3">
                <ServerIcon
                  class="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span><strong class="font-semibold text-gray-900">Scalable Backend Solutions.</strong> Using SSO, Pusher, background processing, Kubernetes, and more to handle production workloads.</span>
              </li>
              <li class="flex gap-x-3">
                <WrenchIcon
                  class="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span><strong class="font-semibold text-gray-900">Tooling and DevOps.</strong> Developing CLIs to standardize team processes. Deploying applications with Cloud Run, App Engine, and platforms such as Vercel. Using Docker and creating CI/CD pipelines with GitHub Actions, Google Cloud Build, CodeFresh, and more.</span>
              </li>
              <li class="flex gap-x-3">
                <ArrowPathIcon
                  class="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span><strong class="font-semibold text-gray-900">Battle Tested.</strong> Ensuring bugs stay squashed is crucial, using crossbrowser testing with Selenium, and BrowserStack keeps regressions minimal. Maintaining a unit test suite for services with Vitest, RSpec, and more ensures new features don't break the old ones.</span>
              </li>
              <li class="flex gap-x-3">
                <ClockIcon
                  class="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span><strong class="font-semibold text-gray-900">Legacy Code.</strong> Still have frontend apps using JavaScript? Running up security alerts on GitHub? Upgrading apps, their spec suites, and infastructure dependencies are familiarities.</span>
              </li>
            </ul>
            <p class="mt-8">
              With years expierence working across tech stacks, I'm always looking for a new challenge.
            </p>
            <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              No code? No problem.
            </h2>
            <p class="mt-6">
              Comapnies nowadays want to launch faster than ever before retool, webflow, and wordpress allow for a MVP to be spunup almost instantly. 
              However, long running queries, and bloated wordpress projects are all to prevelant. 
              Always happy to help reduce page speed, and lower server response times.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>