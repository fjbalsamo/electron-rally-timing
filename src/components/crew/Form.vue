<template>
  <b-form validated @submit.prevent="submit" @reset="reset">
      <b-form-group>
          <category-select ref="select" v-on:change="onChange" :required="true"/>
      </b-form-group>
      <b-form-group>
          <b-form-input 
            type="number" 
            class="text-uppercase"
            v-model="item.number"
            placeholder="crew number"
            required
            min="1"
            step="1"
            max="999"
          />
      </b-form-group>

      <b-form-group>
          <b-form-input 
            type="text" 
            class="text-uppercase"
            v-model="item.name"
            placeholder="crew name"
            required
          />
      </b-form-group>
      
      <b-form-group>
          <b-form-input 
            type="text" 
            class="text-uppercase"
            v-model="item.location"
            placeholder="crew location"
            required
          />
      </b-form-group>
      
      <b-form-group>
          <b-form-input 
            type="text" 
            class="text-uppercase"
            v-model="item.vehicle"
            placeholder="vehicle mark or model"
            required
          />
      </b-form-group>
      <b-form-group class="text-right">
          <b-button type="reset" variant="primary" class="mr-2" v-show="!insertMode">
              <fa-icon icon="ban"/>
          </b-button>
          <b-button 
            type="submit" 
            variant="success"
            :disabled="!categoryValid || !numberValid || !nameValid || !locationValid || !vehicleValid"
          >
              <fa-icon icon="save"/>
          </b-button>
      </b-form-group>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex';
import CategorySelect from '../category/Select.vue';

export default {
  name: "CrewForm",
  components: {
      CategorySelect
  },
  data() {
    return {
      item: {
        name: "",
        location: "",
        category_id: 0,
        number: 0,
        vehicle: "",
      },
      insertMode: true,
    };
  },
  methods: {
      ...mapActions({
          insertAction: 'newCrew',
          updateAction: 'updateCrew'
      }),
    async submit() {
        try {
            if(this.insertMode){
                await this.insertAction(this.item);
            }else{
                await this.updateAction(this.item);
            }
            this.reset();
            this.$emit('update')
        } catch (error) {
            console.error(error)
        }
    },
    reset() {
      this.item = {
        name: "",
        location: "",
        category_id: 0,
        number: 0,
        vehicle: "",
      };
      this.insertMode = true;
       this.$refs['select'].setItem({id: 0});
    },
    onChange(category_id){
        this.item.category_id = category_id;
    },
    setItem(item){
        this.item = item;
        this.insertMode = false;
        this.$refs['select'].setItem({id: item.category_id});
    }
  },
  computed: {
      /**
        category_id: 0,
        number: 0,
       */

      nameValid(){
          return this.item.name.trim().length>0;
      },
      locationValid(){
          return this.item.location.trim().length>0;
      },
      vehicleValid(){
          return this.item.vehicle.trim().length>0;
      },
      categoryValid(){
          return this.item.category_id>0;
      },
      numberValid(){
          return this.item.number>0 && this.item.number<1000;
      }

  }
};
</script>

<style></style>
