<template>
    <div dir="rtl">
        <Modal
            v-show="showModal"
            @close="closeModal"
            @saveChanges="setUserData()">
            <template v-slot:modalTitle>
            انتخاب نقش
            </template>

            <template v-slot:modalForm>
                <div class="columns">
            <div class="column is-8">
        <label for="role">واحد سازمانی</label>
        <div class="control">
        <div class="field">
        <span class="select is-fullwidth">
        <select name ="role" v-model="profile">
            <option v-for="option in roleOptions" :value="option.value">
                {{ option.text }}
            </option>
        </select>
        </span>
        </div>
    </div>
          </div>
          </div>
            </template>
        </Modal>


        <div class="page-login" dir="rtl">
            <div class="columns">
                <div class="column is-4 is-offset-4">
                    <h1 class="title">ورود</h1>
                    <form @submit.prevent="submitForm">
                        <div class="field">
                            <label for="username">پست الکترونیک</label>
                            <div class="control">
                                <input type="email" name="username" class="input" v-model="username">
                            </div>
                        </div>
                        <div class="field">
                            <label for="password">رمز عبور</label>
                                <div class="control">
                                    <input type="password" name="password" class="input" v-model="password">
                                </div>
                            
                        </div>

                        <div class="notification is-danger" v-if="errors.length">
                            <p v-for="error in errors" v-bind:key="error"> {{error}}</p>
                        </div>

                        <div class="field">
                            <div class="control">
                                <button class="button is-success">ورود</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import Modal from '@/components/Modal.vue';
export default {
    name:'LogIn',
    data() {
        return {
            username: '',
            password: '',
            profile: '',
            userprofiles :[],
            showModal: false,
            roleOptions: [],
            errors: []
        }
    },
    methods:{
        submitForm(event) {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem('token')

            const formData = {
                username: this.username,
                password: this.password
            }

            axios.post("/api/v1/token/login/", formData)
            .then(response => {
                const token = response.data.auth_token
                this.$store.commit('setToken', token)
                axios.defaults.headers.common['Authorization'] = "Token " + token
                localStorage.setItem('token', token);
                this.getUserDetails();
                //this.$router.push('/dashboard')
                 
            })
            .catch(error => {
                if(error.response) {
                    // for(const prop in error.response.data) {
                    //     this.errors.push(`${prop} : ${error.response.data[prop]}`)
                    // }
                    console.log(JSON.stringify(error.response.data))
                }
                else if (error.message){
                    console.log(JSON.stringify(error.message));
                }
                else {
                    console.log(JSON.stringify(error));
                    
                }
            })
        },
        closeModal() {
        this.showModal = false;
      },
      getUserDetails() {
            axios.get('/api/v1/profiles/')
            .then(response => {
                console.log(response.data) ;
                    response.data.forEach(item => {
                        this.roleOptions.push({
                            value: item.id,
                            text: item.department_title,
                        })  
                    });
                this.userprofiles = response.data;
                this.showModal = true;
            })
            .catch(error => {
                console.log(error)
            }) ;

        },
        setUserData() {
            const pid = this.profile;
            const s_profile = this.userprofiles.filter((item) => item.id == pid);
            const data = {
                "pid" : s_profile[0].id,
                "department_id" : s_profile[0].department_id,
                "department_title" : s_profile[0].department_title,
                "role_id" : s_profile[0].role_id,
                "role_title" : s_profile[0].role_title,
                "user_id" : s_profile[0].user_id,
                "user_name" : s_profile[0].user_name,
            }
            this.$store.commit('setUserProfile', data);
            this.$router.push('/dashboard')
        }
    },
    components : {
        Modal,
    }
}
</script>