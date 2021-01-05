<template>
  <div>
      <b-list-group>
          <b-list-group-item variant="info" v-if="list.length==0">
            <h4>Empty List</h4>
          </b-list-group-item>
          <b-list-group-item v-for="(item, index) in list" :key="index">
            <h4 class="text-uppercase">              
              {{item.name}}
            </h4>
            <p>
              Priority #{{item.priority}}
            </p>
            <hr />
            <p class="text-right">
              <b-button variant="link" @click="edit(index)">
                <fa-icon icon="pen"/>
              </b-button>
              <b-button variant="link" class="text-danger" @click="remove(index)">
                <fa-icon icon="trash-alt"/>
              </b-button>
            </p>
          </b-list-group-item>
      </b-list-group>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'ChampionshipList',
  data(){
    return {
      list: [],
      selectedIndex: -1
    } 
  },
  methods: {
    ...mapActions({
      listAction: 'listChampionship',
      deleteAction: 'deleteChampionship',

    }),
    async loadList(){
      try {
        this.list = await this.listAction();
        this.selectedIndex = -1;
      } catch (error) {
        console.error(error);        
      }
    },
    async remove(index){
      try {        
        let res = await this.deleteAction(this.list[index]);
        this.loadList()
      } catch (error) {
        console.error(error);
      }
    },
    edit(index){
      this.$emit('selected', this.list[index]);
    }
  },
  async created(){
    await this.loadList();
  }

}
</script>

<style>

</style>