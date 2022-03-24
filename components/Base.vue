<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8 sm:col-8 md:col-6 xl:col-5">
      <client-only>
      <a class="flex justify-center pt-8 sm:pt-0" href="https://stuffbylocky.com" target="_blank">
        <NuxtLink to="/"><MonsterLogo /></NuxtLink>
      </a>
      </client-only>
      <div class="mt-4 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <slot></slot>
      </div>
      <Footer/>
    </div>
  </div>
</template>

