<template>
  <b-form name="calendarForm" validated @submit.prevent="submit" @reset="reset">
      <b-form-group>
          <b-form-input 
            type="number"
            class="text-uppercase"
            placeholder="calendar number"
            min="1"
            step="1"
            max="60"
            required
            v-model="item.number"
          />
      </b-form-group>

      <b-form-group>
          <b-form-input 
            type="text"
            class="text-uppercase"
            placeholder="calendar name"
            required
            v-model="item.name"
          />
      </b-form-group>
      
      <b-form-group>
          <b-form-input 
            type="text"
            class="text-uppercase"
            placeholder="calendar location"
            required
            v-model="item.location"
          />
      </b-form-group>
      
      <b-form-group>
          <b-form-input 
            type="date"
            class="text-uppercase"
            placeholder="calendar from"
            required
            v-model="item.from"
          />
      </b-form-group>
      
      <b-form-group>
          <b-form-input 
            type="date"
            class="text-uppercase"
            placeholder="calendar to"
            required
            v-model="item.to"
            :min="item.from"
          />
      </b-form-group>

      <b-form-group class="text-right">
          <b-button type="reset" variant="primary" class="mr-2" v-show="!insertMode">
              <fa-icon icon="ban" />
          </b-button>
          <b-button 
            type="submit" 
            variant="success"
            :disabled="!nameValid || !locationValid || !numberValid || !fromValid || !toValid"
          >
              <fa-icon icon="save" />
          </b-button>
      </b-form-group>

  </b-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'CalendarForm',
    data(){
        return {
            item: {
                name: '',
                location: '',
                from: '',
                to: '',
                number: 0
            },
            insertMode:true
        }
    },
    methods: {
        ...mapActions({
            insertAction: 'newCalendar',
            updateAction: 'updateCalendar'
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
                console.error(error);
            }
        },
        reset(){
            this.item = {
                name: '',
                location: '',
                from: '',
                to: '',
                number: 0
            };
            this.insertMode = true;
        },
        setItem(item){
            this.item = item;
            this.insertMode = false;
        }
    },
    computed: {
        numberValid(){
            return (this.item.number>0 && this.item.number<61);
        },
        nameValid(){
            return (this.item.name.trim().length>0);
        },
        locationValid(){
            return (this.item.location.trim().length>0);
        },
        fromValid(){
            return (this.item.from.trim().length == 10);
        },
        toValid(){
            return (this.item.to.trim().length == 10);
        },
        rangeValid(){
            let from = (new Date(this.item.from)).getTime();
            let to = (new Date(this.item.to)).getTime();
            return to>=form;
        }
    },
}
</script>

<style>

</style>