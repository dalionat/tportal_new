<template>
    <div class="page-dashboard" dir="rtl">
        <div class="colum is-12">
               <p class="title has-text-centered mb-6">کارتابل</p>
            </div>
        <div class="columns is-multiline">
            
            <div class="column is-2" v-for="sub in roleData" v-bind:key="sub.id">
                <div class="box has-text-centered">
                    <h3 class="is-size-4 mb-4 has-text-centered">{{sub.fa_title}}</h3>
                    <button @click = "goToModule(sub.title)" class="button is-success is-full-width">برو</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name: 'Dashboard',
    data() {
        return {
            roleData: []
        }
    }, 
    mounted() {
        this.getSubSystems()
    },
    methods: {
        getSubSystems() {
            let userData = JSON.parse(localStorage.getItem("userData"));
            let profile = userData.pid;
              
            axios.get('/api/v1/subsystems/?pid=' + profile )
            .then(response => {
                let subsystems = response.data[0].subsystems
                for (let i=0; i<subsystems.length; i++) {
                    this.roleData.push(subsystems[i]);
                }
                
            })
            .catch(error => {
                console.log(error)
            })
        }, 
        goToModule(e) {
            this.$router.push('/'+ e)
        }
    }
}
</script>