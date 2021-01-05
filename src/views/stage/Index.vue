<template>
    <b-container fluid >
        <b-row>
            <b-col>
                <b-breadcrumb :items="menu"/>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <stage-form ref="form" :calendar="workCalendar" v-on:update="onUpdate" />
            </b-col>
            <b-col>
                <stage-list ref="list" :calendar="workCalendar" v-on:select="onSelect" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import StageForm from '../../components/stage/Form.vue';
import StageList from '../../components/stage/List.vue';

import { mapGetters } from 'vuex';

export default {
    name: 'StagePage',
    components: {
        StageForm,
        StageList
    },
    data(){
        return {
            menu: [
                {
                    text: 'Home',
                    to: '/'
                },
                {
                    text: 'Stages',
                    active: true
                }
            ]
        }
    },
    methods: {
        onUpdate(){
            this.$refs['list'].loadList();
        },
        onSelect(item){
            const { ...clone } = item;
            this.$refs['form'].setItem(clone);
        },

    },
    computed: {
        ...mapGetters({
            workCalendar: 'getWorkCalendar'
        }),
    }
}
</script>

<style>

</style>