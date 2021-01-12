<template>
  <b-form name="calendarForm" validated @submit.prevent="submit" @reset="reset">
      <b-form-group>
          <b-form-input 
            id="calendarNumber"
            type="number"
            class="text-uppercase"
            placeholder="calendar number"
            min="1"
            step="1"
            max="60"
            required
            v-model="item.number"
            autofocus
            @keypress.enter.prevent="changeFocus('calendarName')"
          />
      </b-form-group>

      <b-form-group>
          <b-form-input 
            id="calendarName"
            type="text"
            class="text-uppercase"
            placeholder="calendar name"
            required
            v-model="item.name"
            @keypress.enter.prevent="changeFocus('calendarLocation')"
          />
      </b-form-group>
      
      <b-form-group>
          <b-form-input 
            id="calendarLocation"
            type="text"
            class="text-uppercase"
            placeholder="calendar location"
            required
            v-model="item.location"
            @keypress.enter.prevent="changeFocus('calendarFrom')"
          />
      </b-form-group>
      
      <b-form-group>
          <b-form-input 
            id="calendarFrom"
            type="date"
            class="text-uppercase"
            placeholder="calendar from"
            required
            v-model="item.from"
            @keypress.enter.prevent="changeFocus('calendarTo')"
          />
      </b-form-group>
      
      <b-form-group>
          <b-form-input 
            id="calendarTo"
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
import { inputFocus } from '../../util/keyboard.handeler';

export default {
    name: 'CalendarForm',
    data(){
        return {
            item: {
                name: '',
                location: '',
                from: '',
                to: '',
                number: null
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
                number: null
            };
            this.insertMode = true;
            inputFocus('calendarNumber')
        },
        setItem(item){
            this.item = item;
            this.insertMode = false;
            inputFocus('calendarNumber')
        },
        changeFocus(inputID){
            inputFocus(inputID);
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