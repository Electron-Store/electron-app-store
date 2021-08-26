<template>
  <div class="app_bar flex flex_between center-v w-100 pos-abs top0 left0">
    <div class="flex center-a">
      <img class="logo mr5 ml5" src="@/assets/images/logo.png" alt="" />
      <p>Electron App Store</p>
    </div>
    <div class="drag_area">
    </div>
    <div class="win_controls flex">
      <button
        @click="sendWindowAction('minimize')"
        class="control flex center-a pa5"
      >
        <img src="@/assets/images/chevron-down.svg" class="icon" />
      </button>
      <button
      v-if="maximized"
        @click="toggleMaximize()"
        class="control flex center-a pa5"
      >
        <img src="@/assets/images/minimize.svg" class="icon" />
      </button>
      <button
      v-else
        @click="toggleMaximize()"
        class="control flex center-a pa5"
      >
        <img src="@/assets/images/maximize.svg" class="icon" />
      </button>
      <button @click="sendWindowAction('close')" class="control flex center-a pa5">
        <img src="@/assets/images/x.svg" class="icon" />
      </button>
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
export default {
 data(){return{
 	maximized: true
 }},
  methods: {
    sendWindowAction(action) {
      ipcRenderer.send("windowAction", action);
    },
    toggleMaximize(){
    	this.maximized =!this.maximized
    	if(this.maximized){
    		      ipcRenderer.send("windowAction", 'maximize');
    	}else{
    		      ipcRenderer.send("windowAction", 'unmaximize');
    	}
    }
  },
  mounted(){
  	ipcRenderer.on("windowIsMaximize",(e,payload)=>{
  			console.log(payload)
  			this.maximized=payload
		}
	)
  }
};
</script>
<style scoped lang="scss">
.app_bar {
  height: 30px;
  z-index: 20;
  background: var(--primaryColor);
  p {
    font-size: 0.8rem;
  }
  .logo {
    width: 15px;
  }
  .win_controls {
  webkit-app-region: no-drag;
    button {
      webkit-app-region: no-drag;
      img {
        width: 15px;
        margin-bottom: -2px;
      }
    }
  }
}
.drag_area{
	height:100%;
	flex-grow:2;
	    -webkit-app-region: drag;
}
</style>
