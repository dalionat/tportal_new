<template>
        <form @submit.prevent="submitForm">
          <div class="columns">
            <div class="column is-8">
        
          <div class="field">
              <label for="title">عنوان پروژه</label>
              <div class="control">
                  <input type="text" name="title" class="input" v-model="title">
              </div>
          </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="department">اداره متولی</label>
                  <div class="control">
                      <DepartmentSelect @change="departmentChanged($event)" ref="DepartmentSelect" v-model="department"> </DepartmentSelect>
                  </div>  
          </div>
          </div>
          </div>
          <div class="field">
              <label for="description">شرح</label>
                  <div class="control">
                      <textarea class="textarea" name="description" placeholder="شرح پروژه" v-model="description"></textarea>
                  </div>
          </div>
          <div class="columns">
            <div class="column is-4"><div class="field">
              <label for="description">مدیر پروژه</label>
                  <div class="control">
                      <!-- <input type="text" name="department" class="input" v-model="department"> -->
                       <ManagerSelect @change="managerChanged($event)" ref="ManagerSelect" v-model="manager"/>
                  </div>
          </div></div>
            <div class="column is-4"><div class="field">
              <label for="description">وضعیت</label>
                  <div class="control">
                      <StatusSelect @change="statusChanged($event)" ref="StatusSelect" />
                  </div>
          </div></div>
            <div class="column is-4"><div class="field">
              <label for="description">نوع پروژه</label>
                  <div class="control">
                      <TypeSelect @change="typeChanged($event)" ref="TypeSelect" />

                  </div>
          </div></div>
          </div>
          <div class="columns">
            <div class="column is-4"><div class="field">
                <label for="description">تقویم</label>
                  <div class="control">
                      <!-- <input type="text" name="department" class="input" v-model="department"> -->
                      <ManagerSelect @change="managerChanged($event)" ref="ManagerSelect" v-model="manager"/>
                  </div>
              
           </div></div>
            <div class="column is-4"><div class="field">
              <label for="description">تاریخ شروع</label>
                  <div class="control">
                      <!-- <input type="text" name="department" class="input" v-model="department"> -->
                       <JDatePicker ref="JDatePicker" v-model="start_date" />
                  </div>
          </div></div>
            
            <div class="column is-4"><div class="field">
              <label for="description">تاریخ پایان</label>
                  <div class="control">
                      <!-- <input type="text" name="department" class="input" v-model="department"> -->
                      <JDatePicker ref="JDatePicker" v-model="end_date"/>
                  </div>
          </div></div>
          </div>
        </form>
</template>

<script>
import JDatePicker from '@/components/JDatePicker.vue';
import ManagerSelect from '@/components/ManagerSelect.vue';
import StatusSelect from '@/components/StatusSelect.vue';
import TypeSelect from '@/components/TypeSelect.vue';
import DepartmentSelect from '@/components/DepartmentSelect.vue';

  export default {
    name: 'ProjectForm',
    data() {
        return {
            title: '',
            description: '',
            department: '',
            start_date: '',
            end_date: '',
            manager: '',
            status : '',
            type: ''
        }
    },
    methods: {
        submitForm(event, mode) { 
           console.log(this.status); 
        },
        statusChanged(event) {
            this.status = event.target.value;
            
        },
        managerChanged(event) {
            this.manager = event.target.value;
            console.log(this.manager);
        },
        typeChanged(event) {
            this.type = event.target.value;
            console.log(this.type);
        },
        departmentChanged(event) {
            this.department = event.target.value;
            console.log(this.type);
        },
        
    },
    components : {
        JDatePicker,
        ManagerSelect,
        StatusSelect,
        TypeSelect,
        DepartmentSelect
    }
    
  };
</script>
<style>
.form-control .textarea {
    font-family: 'Vazir' ;
}

</style>