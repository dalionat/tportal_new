<template>
  <date-picker v-model="date"></date-picker>
</template>
 
<script>
  import DatePicker from 'vue3-persian-datetime-picker'
  export default {
    name: 'JDatePicker',
    data(){
      return {
        date: ''
      }
    },
    components: { DatePicker }
  }
</script>

<style scoped>
</style>