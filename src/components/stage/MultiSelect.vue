<template>
  <b-form-select class="text-uppercase" multiple :options="options" v-model="selected" :required="required"/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'StageMultiSelect',
     props: {
        calendar: {
            type: Object, 
            required: true
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            selected: [],
            list: []
        }
    },
    watch: {
        selected: {
            deep: true,
            handler(newValue, oldValue){
                this.$emit('select', this.selected)
            }
        }
    },
    methods: {
        ...mapActions({
            listAction: 'listStage'
        }),
        async loadList(){
            this.list = await this.listAction(this.calendar);
        }
    },
    computed: {
        options(){
            return this.list.map(e => ({text: `#${e.priority} - ${e.name}`, value: e.id}));
        }
    },
    created(){
        this.loadList();
    }

}
</script>

<style>

</style>