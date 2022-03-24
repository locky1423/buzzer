<template>
  <img v-if="button=== 'unpressed'" @click="click" class="big-button" src="~/static/button.svg"/>
  <img v-else-if="button === 'pressed'" class="big-button" src="~/static/button_pressed.svg"/>
  <img v-else-if="button === 'disabled'" class="big-button" src="~/static/button_disabled.svg"/>
  <span v-else>Error: {{$route.params}}</span>
</template>

<script>
export default {
  name: 'Buzzer',
  data() {
		return {
			button: "disabled"
		}
	},
  methods: {
    click() {
      this.button='pressed';
      let ref = this.$fire.database.ref('buzzer/' + (this.$route.params.game).toString()+ '/winner')
      ref.set((this.$route.params.name).toString(), () => { this.button = 'unpressed' })
      
    } 
  },
  created() {
      let ref = this.$fire.database.ref('buzzer/' + (this.$route.params.game).toString()+ '/players/' + (this.$route.params.name).toString());
      ref.on('value', (snap) => {
        switch (snap.val()) {
          case null:
            this.button = "disabled";
            break;
          case false:
            this.button = "disabled";
            ref.set(true);
            break;
          default:
            this.button = "unpressed";
            break;
        }
      })
  }
}
</script>