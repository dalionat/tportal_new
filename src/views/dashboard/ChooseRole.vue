<template>
        <form @submit.prevent="submitForm">
          <div class="columns">
            <div class="column is-8">
        <label for="role">عنوان نقش</label>
        <div class="control">
        <div class="field">
        <span class="select is-fullwidth">
        <select name ="role" v-model="status">
            <option v-for="option in options" :value="option.value">
                {{ option.text }}
            </option>
        </select>
        </span>
        </div>
    </div>
          </div>
          </div>
    </form>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ChooleRole',
    data() {
        return {
           options: [],
           status: ''
        }
    },
    methods: {
        getUserDetails() {

            const token = localStorage.getItem('token');
            if(!token) {
                return;
            }
            axios.defaults.headers.common['Authorization'] = "Token " + token;
            axios.get('http://127.0.0.1:8000/api/v1/users/me/')
            .then(response => {  
                response.data.forEach(item => {
                    this.options.push({
                        value: item.id,
                        text: item.username,
                    })
                    
                });
            })
            .catch(error => {
                console.log(error)
            }) ;

        },
    },
    mounted() {
        this.getUserDetails();
    },
    computed: {
        
    }
    
  };
</script>
<style>
.form-control .textarea {
    font-family: 'Vazir' ;
}

</style>