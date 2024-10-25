<template>
    <div class="page-dashboard" dir="rtl">
        <div class="colum is-12">
                <p class="title has-text-centered mb-6">مدیریت پروژه</p>
        </div>
        <div class="columns is-multiline">
            
            <div class="column is-2" v-for="module in modules" v-bind:key="module.id">
                <div class="box has-text-centered">
                    <h3 class="is-size-4 mb-4 has-text-centered">{{module.fa_title}}</h3>
                    <button @click = "goToProjectMgmt()" class="button is-success is-fullwidth">برو</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    
    name: 'ProjectManagemenMainView',
    data() {
        return {
              subsystem_name: 'project_mgmt',
              modules : [], 

        }
      
    },
    mounted() {
        this.getModules()
    },
    methods: {
        getModules() {
            let profile = JSON.parse(localStorage.getItem("userData")).pid
            axios.get('/api/v1/subsystems/?pid=' + profile)
            .then(response => {
                let modules = response.data[0].modules
                for (let i=0; i<modules.length; i++) {
                    if(modules[i].subsystem_name == this.subsystem_name)
                    this.modules.push(modules[i]);
                }
                console.log(this.modules);
            })
            .catch(error => {
                console.log(error)
            })
        },
        goToProjectMgmt() {
            this.$router.push('/project_mgmt/crude');
        }
    }
}
</script>