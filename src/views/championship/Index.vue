<template>
  <div>
      <b-container fluid>
          <b-row>
              <b-col>
                  <b-breadcrumb :items="menu"></b-breadcrumb>
              </b-col>
          </b-row>
          <b-row>
              <b-col cols="4">
                  <championship-form ref="form" v-on:update="update"/>                  
              </b-col>
              <b-col>
                  <championship-list ref="list" v-on:selected="selected"/>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
import ChampionshipForm from '../../components/championship/Form.vue';
import ChampionshipList from '../../components/championship/List.vue';

export default {
    name: 'ChampionshipPage',
    components: {
        ChampionshipForm,
        ChampionshipList
    },
    data(){
        return {
            menu: [
                {
                    text: 'Home',
                    to: '/'
                },
                {
                    text: 'Championship',
                    active: true
                }
            ]
        }
    },
    methods: {
        update(){
            this.$refs['list'].loadList();
        },
        selected(item){
            const { ...clone } = item;
            this.$refs['form'].setItem(clone);
        }
    }
}
</script>

<style>

</style>