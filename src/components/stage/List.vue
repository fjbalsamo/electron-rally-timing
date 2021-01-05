<template>
  <b-list-group>
      <b-list-group-item variant="info" v-if="list.length==0">
          <h4>Empty List</h4>
      </b-list-group-item>
      <b-list-group-item v-for="(item, index) in list" :key="index">
          <h4 class="text-uppercase">#{{item.priority}} - {{item.name}}</h4>
          <p>
             <small>
                 {{item.long}}Km in {{item.max_delay | maxDelay}}
             </small>
          </p>
          <p>
             <small>{{item.day | day}}</small>
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
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'StageList',
    props: {
        calendar: {
            type: Object, 
            required: true
        }
    },
    data(){
        return {
            list: []
        }
    },
    methods: {
        ...mapActions({
            listAction: 'listStage',
            deleteAction: 'deleteStage'
        }),

        async loadList(){
            this.list = await this.listAction(this.calendar);
        },
        edit(index){
            this.$emit('select', this.list[index]);
        },
        async remove(index){
            await this.deleteAction(this.list[index]);
            this.loadList();
        }
    },
    created(){
        this.loadList();
    }
}
</script>

<style>

</style>