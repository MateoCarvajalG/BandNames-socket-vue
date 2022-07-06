<template>
  <div>
    <h3> Agregar Banda</h3>
    <form v-on:submit.prevent="onSubmit">
        <input
            class='form-control'
            placeholder='nuevo nombre de banda'
            v-model='newBand'
        />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AddBand extends Vue {
  @Prop() private bands

  newBand='';

  onSubmit() {
    console.log('envio formulario', this.newBand);
    this.$emit('addBand', this.newBand);
  }
}
</script>

<style scoped>

</style>
