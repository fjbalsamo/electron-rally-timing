<template>
  <b-container fluid>
      <b-row>
          <b-col>
              <b-breadcrumb :items="menu"/>
          </b-col>
      </b-row>
      <b-row>
          <b-col cols="5">
              <crew-form ref="form" v-on:update="onUpdate"/>
          </b-col>
          <b-col>
              <crew-list ref="list" v-on:select="onSelect"/>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import CrewForm from '../../components/crew/Form.vue';
import CrewList from '../../components/crew/List.vue';

export default {
    name: 'CrewPage',
    components: {
        CrewForm,
        CrewList
    },
    data(){
        return {
            menu: [
                {
                    text: 'Home',
                    to: '/'
                },
                {
                    text: 'Crews',
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
        }
    }
}
</script>

<style>

</style>