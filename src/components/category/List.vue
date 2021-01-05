<template>
  <b-list-group>
    <b-list-group-item variant="info" v-if="list.length == 0">
      <h4>Empty List</h4>
    </b-list-group-item>
    <b-list-group-item v-for="(item, index) in list" :key="index">
      <h4 class="text-uppercase">{{ item.name }}</h4>
      <p>
        <small>
            Priority #{{ item.priority }} | Championship
            <strong class="text-uppercase">
              {{item.championship.name}}
            </strong>
        </small>
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
import { mapActions } from "vuex";

export default {
  name: "CategoryList",
  data() {
    return {
      list: [],
    };
  },
  methods: {
    ...mapActions({
      listAction: "listCategory",
      deleteAction: "deleteCategory",
    }),

    async loadList() {
      this.list = await this.listAction();
    },
    async remove(index){
        await this.deleteAction(this.list[index]);
        this.loadList();
    },
    edit(index){        
        this.$emit('select', this.list[index]);
    }
  },
  created() {
    this.loadList();
  },
};
</script>

<style></style>
