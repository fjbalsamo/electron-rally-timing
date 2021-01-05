<template>
  <b-form
    @submit.prevent="submit"
    @reset="reset"
    validated
  >
      <b-form-group
      >
          <b-form-input
            type="text"
            id="name"
            class="text-uppercase"
            placeholder="championship name"
            v-model="item.name"
            required
          />
      </b-form-group>
      <b-form-group
      >
          <b-form-input
            type="text"
            id="priority"
            class="text-uppercase"
            placeholder="championship priority"
            v-model="item.priority"
            required            
          />
      </b-form-group>
      <b-form-group
        class="text-right"
      >
        <b-button type="button" variant="primary" class="mr-2" v-show="!insertMode" @click="reset">
            <fa-icon icon="ban"/>
        </b-button>
        <b-button type="submit" variant="success" :disabled="!nameValid || !priorityValid">
            <fa-icon icon="save"/>
        </b-button>
      </b-form-group>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'ChampionshipForm',
    data(){
        return {
            item: {
                id: 0,
                name: '',
                priority: null
            },
            insertMode: true,
        }
    },
    methods: {
        ...mapActions({
            insertAction: 'newChampionship',
            updateAction: 'updateChampionship',

        }),
        async submit(){
            try {

                if(this.insertMode){
                    await this.insertAction(this.item);
                }else{
                    await this.updateAction(this.item);
                }
                this.$emit('update');
                this.reset();
            } catch (error) {
                console.error(error)
            }
        },
        reset(){
            this.item = {
                name: '',
                priority: null
            };
            this.insertMode=true;
        },
        setItem(item){
            this.item = item;
            this.insertMode = false;
        }
    },
    computed: {
        nameValid(){
            return this.item.name.trim().length>0;
        },
        priorityValid(){
            return this.item.priority>0;
        },
    }
}
</script>

<style>

</style>