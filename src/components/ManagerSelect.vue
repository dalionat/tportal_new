<template>
    <div class="control">
        <div class="field">
        <span class="select is-fullwidth">
        <select v-model="selected">
            <option v-for="option in options" :value="option.value">
                {{ option.text }}
            </option>
        </select>
        </span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserSelect',
    data() {
        return {
           options: [],
           selected: []
        }
    },
    methods: {
        getusers() {
            let did = JSON.parse(localStorage.getItem("userData")).department_id
            axios.get('http://127.0.0.1:8000/api/v1/depusers/?did=' + did)
            .then(response => {
                response.data.forEach(manager => {
                    this.options.push({
                        value: manager.user_id,
                        text: manager.first_name +' ' +manager.last_name,
                    })
                    
                });
            })
            .catch(error => {
                console.log(error)
            }) ;

        },
    },
    mounted() {
        this.getusers();
    }
}
</script>

<style>
     select {
        font-family: 'Vazir';
     }
</style>