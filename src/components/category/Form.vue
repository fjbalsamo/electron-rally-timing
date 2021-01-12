<template>
  <b-form validated @submit.prevent="submit" @reset="reset">
    <b-form-group>
      <championship-select
        ref="select"
        :required="true"
        v-on:change="getChampionship"
      />
    </b-form-group>
    <b-form-group description="3 chars max">
      <b-form-input
        id="className"
        type="text"
        v-model="item.name"
        placeholder="class name"
        class="text-uppercase"
        required
        maxlength="3"
        @keypress.enter.prevent="changeFocus('classPriority')"
      />
    </b-form-group>
    <b-form-group>
      <b-form-input
        id="classPriority"
        type="number"
        v-model="item.priority"
        placeholder="class priority"
        class="text-uppercase"
        min="0"
        step="1"
        required
        @keypress.enter.prevent="changeFocus('classType')"
      />
    </b-form-group>
    <b-form-group>
      <b-form-select
        id="classType"
        class="text-uppercase" 
        :options="categoryTypes" 
        v-model="item.type" 
        required 
      />
    </b-form-group>
    <b-form-group class="text-right">
      <b-button
        type="reset"
        variant="primary"
        class="mr-2"
        v-show="!insertMode"
        @click="reset"
      >
        <fa-icon icon="ban" />
      </b-button>
      <b-button
        type="submit"
        variant="success"
        :disabled="!nameValid || !priorityValid || !championshipValid"
      >
        <fa-icon icon="save" />
      </b-button>
    </b-form-group>
  </b-form>
</template>

<script>
import ChampionshipSelect from "../championship/Select.vue";
import { mapActions } from "vuex";
import { inputFocus } from '../../util/keyboard.handeler';

export default {
  name: "CategoryForm",
  components: {
    ChampionshipSelect,
  },
  data() {
    return {
      item: {
        championship_id: 0,
        name: "",
        priority: null,
        type: 'car'
      },
      insertMode: true,
    };
  },
  methods: {
    ...mapActions({
      insertAction: "newCategory",
      updateAction: "updateCategory",
    }),
    async submit() {        
      try {
        if (this.insertMode) {
          await this.insertAction(this.item);
        } else {
          await this.updateAction(this.item);
        }
        this.reset();
        this.$emit("update");
      } catch (error) {
          console.error(error);
      }
    },
    reset() {
      this.item = {
        championship_id: 0,
        name: "",
        priority: null,
        type: 'car'
      };
      this.insertMode = true;
      this.$refs['select'].setItem({id: 0})
    },
    setItem(item) {        
      this.item = item;
      this.insertMode = false;
      this.$refs['select'].setItem({id: item.championship_id})
    },
    getChampionship(championship_id) {
      this.item.championship_id = championship_id;
      inputFocus('className')
    },
    changeFocus(inputID){
      inputFocus(inputID);
    }
  },
  computed: {
    nameValid() {
      return this.item.name.trim().length > 0;
    },
    priorityValid() {
      let priority = isNaN(this.item.priority) ? -1 : parseInt(this.item.priority);
      return priority >= 0;
    },
    championshipValid() {
      return this.item.championship_id > 0;
    },
    categoryTypes: () => ['buggy', 'car', 'moto', 'quads', 'truck', 'utv']
  },
};
</script>

<style></style>
