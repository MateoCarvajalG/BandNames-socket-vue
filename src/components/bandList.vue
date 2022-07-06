<template>
  <div>
    <!-- <pre>
      {{bands}}
    </pre> -->
    <tr v-for="band in bands" :key="band.id" class="band">
      <td>
        <button
          class="btn-plus"
          @click="$emit('addVote',band.id)"
        >+1</button>
      </td>
      <td>
        <input
            type="text"
            class="form-control"
            v-model="band.name"
            aria-label="close"
            @blur="$emit('changeName', band.name, band.id)"
        >
      </td>
      <td><h3>{{band.votes}}</h3></td>
      <td>
        <button
          class="btn-delete"
          @click="$emit('deleteBand',band.id)"
        >Borrar</button>
      </td>
    </tr>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class bandList extends Vue {
  @Prop() private bands
}
</script>

<style scoped>

.band{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}
</style>
