<template>
    <div dir="rtl">
    <div id="groupOperations">
    <button
      type="button"
      class="button is-success mb-3"
      data-target="createModal"
      @click="showModal = true">جدید</button>
    <Modal
      v-show="showModal"
      @close="closeModal"
      @saveChanges="saveParojectData('create')">
      <template v-slot:modalTitle>
      ایجاد پروژه جدید
      </template>

      <template v-slot:modalForm>
        <ProjectForm ref="ProjectForm" />

      </template>
    </Modal>
  </div>

  <EasyDataTable 
    :headers="headers"
    :items="items"
    theme-color="#1d90ff"
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="center"
    show-index
    alternating
  >
    <template #item-title="{ title, page }">
      <div class="title-wrapper">
        <a target="_blank" :href="page">{{ title }}</a>
      </div>
    </template>
    <template #item-operation="item">
      <div class="operation-wrapper">
        <button class="button is-info ml-2" @click="deleteItem(item)">ویراش</button>
        <button class="button is-danger ml-2" @click="editItem(item)">حذف</button>
      </div>
    </template>
    </EasyDataTable>
    </div>
</template>


<script>
import Modal from '../../components/Modal.vue';
import "vue3-easy-data-table/dist/style.css";
import {ref} from "vue";
import axios from "axios";
import ProjectForm from './ProjectForm.vue';
import moment from 'jalali-moment';

export default {
 name: "ProjectManagementCrudeView",
 components: {
    Modal,
    ProjectForm
 },
 data() {
    return {
        showModal: false,
      };
 },
 setup() {
 // Row Data: The data to be displayed.
 moment.locale('fa', { useGregorianParser: true });

 const headers = [
  { text: "عنوان پروژه", value: "title" },
  { text: "تاریخ شروع", value: "start_date"},
  { text: "تاریخ پایان", value: "end_date"},
  { text: "مدیر پروژه", value: "manager"},
  { text: "وضعیت", value: "status"},
  { text: "اداره متولی", value: "department", sortable: true},
  { text: "عملیات", value: "operation"},
];
const items= ref([]);
items.value = [];

axios.get('http://127.0.0.1:8000/api/project_mgmt/projects')
            .then(response => {
                response.data.forEach(project => {
                    items.value.push({
                        id: project.project_id,
                        title: project.title,
                        page: "/projects/" + project.project_id,
                        status: project.status_title,
                        start_date: moment(project.start_date).format('YYYY/MM/DD'),
                        end_date: moment(project.end_date).format('YYYY/MM/DD'),
                        department: project.department_title,
                        manager:project.manager.first_name + ' ' + project.manager.last_name,
                    })
                    
                });
            })
            .catch(error => {
                console.log(error)
            }) ;

    return {
      headers,
      items,
    };
},
methods: {
    openModal() {
        this.showModal = true;  
      },
    closeModal() {
        this.showModal = false;
      },
    saveParojectData(mode) {
        // console.log('Hello')
        // this.updateComponent();
        this.$refs.ProjectForm.submitForm(event, mode);
        this.closeModal();
      },
    deleteItem(item) {
        console.log(item);
      },
    editItem(item) {
        console.log(item);
    },
    updateComponent() {
        this.$forceUpdate();
    }
}
};
</script>


<style>
.vue3-easy-data-table__footer {
    direction: ltr !important;
}
.customize-table {
  /* --easy-table-border: 1px solid #445269; */
  /* --easy-table-row-border: 1px solid #5d6b81; */

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #fbfcfd;
  --easy-table-header-background-color: #2d3a4f;

  --easy-table-header-item-padding: 10px ;
  --easy-table-body-row-height: 15px;
  --easy-table-body-row-font-size: 14px;

  /* --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #2d3a4f;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee; */

  --easy-table-body-item-padding: 15px;
  --easy-table-body-item-border: 1px solid #5d6b81;

  --easy-table-footer-background-color: #2d3a4f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 10px;
  --easy-table-footer-height: 50px;
  --easy-table-footer-directrion: ltr !important;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>

<style>
.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
.title-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
  width: 400px;
}
.avator {
  margin-right: 10px;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}
</style>