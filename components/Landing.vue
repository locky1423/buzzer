
import Message from 'primevue/message';

<template>
  <Base>
    <h2 class="text-2xl leading-7 font-semibold">
      Welcome to Locky's Buzzer
    </h2>
    <Message severity="warn">Currently in beta</Message>
    <NuxtLink to="/controller"><Button label="Open new controller" class="mt-3"/></NuxtLink>
    
  </Base>
      
</template>

<script>
export default {
  name: 'NuxtTutorial'
}
</script>
