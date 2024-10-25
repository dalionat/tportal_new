<template>
  <div class="control">
    <div class="field">
  <date-picker v-model="date"></date-picker>
  </div>
  </div>
</template>
 
<script>
  import DatePicker from 'vue3-persian-datetime-picker'
  export default {
    name:'PDatePicker',
    data(){
      return {
        date: ''
      }
    },
    components: { DatePicker }
  }
</script>