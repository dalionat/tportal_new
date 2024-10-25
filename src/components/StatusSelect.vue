<template>
    <div class="control">
        <div class="field">
        <span class="select is-fullwidth">
        <select v-model="status">
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
    name: 'StatusSelect',
    data() {
        return {
           options: [],
           status: ''
        }
    },
    methods: {
        getusers() {
            axios.get('http://127.0.0.1:8000/api/project_mgmt/base/statuses')
            .then(response => {
                response.data.forEach(item => {
                    this.options.push({
                        value: item.project_status_id,
                        text: item.title,
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