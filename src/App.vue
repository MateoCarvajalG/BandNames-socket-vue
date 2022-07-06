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
          <BandList
            :bands="bands"
            @addVote="addVote"
            @deleteBand="deleteBand"
            @changeName="changeName"
          />
        </div>
        <div class="add-band">
          <AddBand
            @addBand="addBand"
          />
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
import AddBand from './components/AddBand.vue';

@Component({
  components: {
    HelloWorld,
    BandList,
    AddBand,
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

  addVote(id) {
    this.socket.emit('votar-banda', id); // incrementa en 1 el voto desde el backend, usando websockets
  }

  deleteBand(id) {
    this.socket.emit('delete-band', id); // bora la banda dependiendiendo el id desde el back usando websockets
  }

  changeName(newName, id) {
    this.socket.emit('change-name', { id, newName }); // cambia el nombre de la banda desde el back usando websoclket
  }

  addBand(name) {
    this.socket.emit('create-band', { name });
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
