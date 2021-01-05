<template>
    <b-list-group>
        <b-list-group-item variant="info" v-if="list.length==0">
            <h4>Empty List</h4>
        </b-list-group-item>
        <b-list-group-item v-for="(item, index) in list" :key="index">
            <h4 class="text-uppercase">
                <strong class="mr-2">#{{item.number}}</strong>
                {{item.category.name}}
                <sup class="text-uppercase">
                    <b-badge variant="info">{{item.category.championship.name}}</b-badge>
                </sup>
            </h4>
            <p>
                <small class="text-uppercase">{{item.name}}</small>
            </p>
            <p>
                <small class="text-uppercase">{{item.location}}</small>
            </p>
            <hr />
            <p class="text-right">
                <b-button variant="link" @click="select(index)">
                    <fa-icon icon="pen"/>
                </b-button>
                <b-button variant="link" class="text-danger" @click="remove(index)">
                    <fa-icon icon="trash-alt"/>
                </b-button>
            </p>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'CrewList',
    data(){
        return {
            list: []
        }
    },
    methods: {
        ...mapActions({
            deleteAction: 'deleteCrew',
            listAction: 'listCrew'
        }),
        async loadList(){
            this.list = await this.listAction();
        },
        select(index){
            this.$emit('select', this.list[index]);
        },

        async remove(index){
            try {
                await this.deleteAction(this.list[index]);
                this.loadList();
            } catch (error) {
                console.error(error);
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