<template>
    <div class="control">
        <div class="field">
        <span class="select is-fullwidth">
        <select v-model="type">
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
    name: 'DepartmentSelect',
    data() {
        return {
           options: [],
           type: ''
        }
    },
    methods: {
        getDepartments() {
            let department = JSON.parse(localStorage.getItem("userData")).department_id;
            
            axios.get('/api/v1/departments/?did=' + department )
            .then(response => {
                response.data.forEach(item => {
                    this.options.push({
                        value: item.department_id,
                        text: item.title,
                    })
                });
            })
            .catch(error => {
                console.log(error)
            })

        },
    },
    mounted() {
        this.getDepartments();
    },
    computed: {
        
    }
}
</script>

<style>
     select {
        font-family: 'Vazir';
     }
</style>