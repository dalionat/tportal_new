<template>
<div>
  <Gantt/>
</div>

</template>



<script>
import Gantt from "./project_mgmt/Gantt.vue";
import PDatePicker from './project_mgmt/PDatePickerView.vue';
 
export default {
  name: 'HomeView',
  components: {Gantt},
}
</script>


<style>
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
</style>
