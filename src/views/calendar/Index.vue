<template>
  <div>
     <b-container fluid>
         <b-row>
             <b-col>
                 <b-breadcrumb :items="menu" />
             </b-col>
         </b-row>
         <b-row>
             <b-col cols="5">
                 <calendar-form ref="form" v-on:update="onUpdate" />                 
             </b-col>
             <b-col>
                 <calendar-list ref="list" v-on:select="onSelect" />                                  
             </b-col>
         </b-row>
     </b-container>
  </div>
</template>

<script>
import CalendarForm from '../../components/calendar/Form.vue';
import CalendarList from '../../components/calendar/List.vue';
export default {
    name: 'CalendarPage',
    components: {
        CalendarForm,
        CalendarList
    },
    data(){
        return {
           menu: [
               {
                   text: 'Home',
                   to: '/'
               },
               {
                   text: 'Calendars',
                   active: true
               },
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
        }
    }
}
</script>

<style>

</style>