<template>
  <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title"><slot name="modalTitle"></slot></p>
      <button class="delete is-danger is-large" aria-label="close" @click="close()"></button>
    </header>
    <section class="modal-card-body">
      <slot name="modalForm"></slot>
    </section>
    <footer class="modal-card-foot is-flex is-justify-content-center">
      <div class="buttons">
        <button class="button" @click="saveChanges()">ثبت</button>
        <button class="button" @click="close()">انصراف</button>
      </div>
    </footer>
  </div>
</div>
</template>

<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
      saveChanges() {
        this.$emit('saveChanges');
      }
    },
  };
</script>

<style >
.modal {
    --bulma-modal-content-width: 70rem;
}
.modal-card-body {
  height: 600px !important;
}
.delete {
    background: rgb(166, 2, 2);
}
</style>

