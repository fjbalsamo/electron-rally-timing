<template>
  <b-list-group>
      <b-list-group-item variant="success" v-if="list.length==0">
            <h4>Empty List</h4>
      </b-list-group-item>
      <b-list-group-item v-for="(item, index) in list" :key="index">
          <h4 class="text-uppercase">
              #{{item.crew.number}} {{item.crew.category.name}}
          </h4>
          <p>
              <b-button-close @click="changeStatus(index)">
                  <fa-icon icon="ban"/>
              </b-button-close>
              {{item.hideCount}} time item hidden
          </p>

      </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'HiddenList',
    data(){
        return {
            list: []
        }
    },
    methods: {
        ...mapActions({
            hiddenTimeListAction: 'hiddenTimeList',
            hiddenTimeStatusAction: 'hiddenTimeStatus'
        }),

        async load(){
            this.list = await this.hiddenTimeListAction(this.workCalendar);            
        },
        async changeStatus(index){
            let item = this.list[index];
            try {

                let hiddenStatus = {
                    ...item,
                    status: false,
                    
                };
                await this.hiddenTimeStatusAction(hiddenStatus);

                this.load();
                
            } catch (error) {
                console.error(error);                
            }

        }
    },
    computed: {
        ...mapGetters({
            workCalendar: 'getWorkCalendar'
        })
    },
    created(){
        this.load();
    }

}
</script>