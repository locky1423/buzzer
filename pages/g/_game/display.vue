<template>
  <div class="winner-div">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <p class="winner">{{winner}} {{
      
      
      }}</p>
  </div>
</template>

<script>
export default {
  name: 'Display',
  data() {
		return {
			winner: "Loading..."
		}
	},
  created() {
      let ref = this.$fire.database.ref('buzzer/' + (this.$route.params.game).toString()+ '/winner')
      ref.on('value', (snap) => {this.winner = snap.val()})
  }

}
</script>

<style>
  p.winner {
    margin:auto;
    text-align:center;
    font-size: 50px;
    font-weight: bold;
  }
  .winner-div {
    background: rgba(0,0,0,0);
  }
</style>