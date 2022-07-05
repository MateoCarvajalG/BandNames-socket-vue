<template>
  <div>
    <div id="app">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
    <p>Service status:
      <span v-if="online">Online</span> <span v-if="!online">Offline</span>
    </p>
    <h1>BandNames</h1>
    <hr>
    <div class="container">
        <div class="list-bands">
          <BandList :bands="bands"/>
        </div>
        <div class="add-band">
        </div>
    </div>
    <div >
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import io from 'socket.io-client';
import HelloWorld from './components/HelloWorld.vue';
import BandList from './components/bandList.vue';

@Component({
  components: {
    HelloWorld,
    BandList,
  },
})
export default class App extends Vue {
  socket=null;

  online= false;

  bands=[];

  created() {
    this.socket = io('http://localhost:8080');
    this.socket.on('currentBands', (data) => {
      this.bands = data;
    });
    this.socket.on('connect', () => {
      this.online = true;
    });
    this.socket.on('disconnect', () => {
      this.online = false;
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}
.list-bands{
  display: flex;
  width: 60%;
}
.add-band{
  display: flex;
  width: 40%;
}
</style>
