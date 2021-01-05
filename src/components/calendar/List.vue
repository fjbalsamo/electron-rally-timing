<template>
    <b-list-group>
        <b-list-group-item variant="info" v-if="list.length==0">
            <h4>Empty List</h4>
        </b-list-group-item>
        <b-list-group-item v-for="(item, index) in list" :key="index">
            <h5 class="text-uppercase">
                {{item.name}}
            </h5>
            <p>
                <small>FROM {{item.from}} TO {{item.to}}</small>
            </p>
            <p>
                <small class="text-uppercase">{{item.location}}</small>
            </p>
            <hr />
            <p class="text-right">
                <b-button variant="link" class="text-success float-left" @click="selectToWork(index)">
                    <fa-icon icon="calendar" />
                </b-button>
                <b-button variant="link" class="mr-2" @click="edit(index)" :disabled="workCalendar_id==item.id">
                    <fa-icon icon="pen" />
                </b-button>
                <b-button variant="link" class="text-danger" @click="remove(index)" :disabled="workCalendar_id==item.id">
                    <fa-icon icon="trash-alt" />
                </b-button>
            </p>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CalendarList',
    data(){
        return {
            list: []
        }
    },
    methods: {
        ...mapActions({
            listAction: 'listCalendar',
            deleteAction: 'deleteCalendar',
            setWorkCalendar: 'setWorkCalendar'
        }),
        async loadList(){
            this.list = await this.listAction();            
        },
        edit(index){
            this.$emit('select', this.list[index]);
        },
        async remove(index){
            await this.deleteAction(this.list[index]);
            this.loadList();
        },
        selectToWork(index){
            let calendar = this.list[index];
            if(calendar.id == this.workCalendar_id){
                this.setWorkCalendar(null)
            }else{
                this.setWorkCalendar(this.list[index]);
            }
        },
    },
    computed: {
        ...mapGetters({
            workCalendar: 'getWorkCalendar'
        }),
        workCalendar_id(){
            if(this.workCalendar!=null){
                return this.workCalendar.id;
            }else{
                return -1;
            }
        }
    },
    created(){
        this.loadList();
    }
}
</script>

<style>

</style>