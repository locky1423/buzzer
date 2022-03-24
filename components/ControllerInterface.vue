
import Message from 'primevue/message';

<template>
  <Base>
  
    <div class="flex align-items-baseline">
      <h2 class="text-2xl leading-7 font-semibold">
        Buzzer Controller
      </h2>
      <div class="flex-grow-1"></div>
      <Button label="Edit" class="p-button-text" @click="open"/>
    </div>
    
    <Message severity="warn">Currently in beta</Message>

    <div class="flex flex-row">
      <h3 class="text-2xl leading-7 font-semibold mb-3">Buzzer</h3>
      <div class="flex-grow-1"></div>
      <Button label="Clear" class="p-button-text p-button-danger p-0 " @click="clear"/>
    </div>
    <Chip 
        :label="winner" 
        class="mr-2 mb-2" :class="[winner ? 'chip-connected' :'chip-error']"
        :icon="winner ? 'pi pi-check' : 'pi pi-spin pi-spinner'"
      />
  

    <DataView :value="players" layout="list">
			<template #header>
        <div class="flex flex-row">
          <h4>Players</h4>
        </div>
			</template>

			<template #list="slotProps">
				<div class="col-12">
          <i v-show="slotProps.data.connected" class="pi pi-check"></i>
          <i v-show="!slotProps.data.connected" class="pi pi-spin pi-spinner"></i>
          {{slotProps.data.name}}
          <a :href="'/g/'+ game + '/b/'+ slotProps.data.name" target="_blank" rel="noopener noreferrer">Open Buzzer</a>
          
            
					
				</div>
			</template>
      <template #empty>No players.</template>

			
		</DataView>
    
    <a :href="'/g/'+ game + '/display'" target="_blank" rel="noopener noreferrer">Open Display</a>
    
    <Dialog  :visible="display" :style="{width: '50vw'}" :modal="true" :closeOnEscape="false" :closable="false">
      <template #header>
        <h2 class="text-2xl leading-7 font-semibold">
          Setup
        </h2>
      </template>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">Players</span>
        <Chips v-model="playerList" />
      </div>
      <div class="p-inputgroup mt-2">
        <span class="p-inputgroup-addon">Passcode</span>
        <InputMask v-model="passcode" mask="9999" />
      </div>

      
      

      <template #footer>
          <NuxtLink to="/"><Button label="Back" class="p-button-text"/></NuxtLink>
          <Button label="Create" @click="create" autofocus />
      </template>
    </Dialog>
    
  </Base>
</template>

<script>
export default {
  name: 'NuxtTutorial',
  data() {
		return {
      game: 0,
			display: false,
      playerList: [],
      players:[],
      passcode:'1234',
      winner:""
		}
	},
  methods: {
        open() {
            this.display = true;
        },
        create() {
            this.display = false;
            let ref = this.$fire.database.ref('buzzer/' + this.game + '/players/');
            let playerUpdate = {}
            this.playerList.forEach( (player) => {
              playerUpdate[player] = false;
            })
            ref.update(playerUpdate)

        },
        clear() {
          let ref2 = this.$fire.database.ref('buzzer/' + this.game + '/winner').remove();
          
        }
  },
   created() {

     let setup = (auth) => {
       console.info(this.game)
       let setupRef = this.$fire.database.ref('buzzer/' + this.game + "/owner");
          
          setupRef.set(auth.user.uid).then(() => {
            let setupRef2 = this.$fire.database.ref('buzzer/' + this.game + "/players");
            setupRef2.set({})
          });
     }

     let init = (auth) => {
       
       let ref = this.$fire.database.ref('buzzer/' + this.game + '/players/');
      ref.on('value', (snap) => {
        
        let val = snap.val();

        if (val) {
          this.playerList= Object.keys(val);
          this.players = [];
          Object.entries(val).forEach((player) => {
            console.log({name: player[0], connected: player[1]})
            this.players.push({name: player[0], connected: player[1]})
          })
        } else {
          this.playerList = [];
          this.players = [];
          
        }
      })
      let ref2 = this.$fire.database.ref('buzzer/' + this.game + '/winner');
      ref2.on('value', (snap) => {
        
        let val = snap.val();
        console.log(this.winner)
        if (!val) this.winner = null;
        else this.winner = val;
      })
     }

    this.$fire.auth.signInAnonymously().then((auth) => {
        // Signed in..
        this.game = auth.user.uid.toString().slice(0,6);

        setup(auth)
        init(auth)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.info(error)
        // ...
      });
    

      
  }
}
</script>

<style>
.chip-connected{
  background-color: var(--green-600);
  color: var(--primary-color-text);
}
.chip-error{
  background-color: var(--orange-500);
  color: var(--primary-color-text);
}
</style>
