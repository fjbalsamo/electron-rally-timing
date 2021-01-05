<template>
  <b-form-select
    v-model="itemSelected"
    :options="options"
    class="text-uppercase"
    :required="required"
  />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SelectCategory",
  props: {
      required: {
          type: Boolean,
          default: false
      }
  },
  data() {
    return {
      list: [],
      itemSelected: null,
    };
  },
  watch: {
    itemSelected: {
      deep: true,
      handler() {
        this.$emit("change", this.itemSelected);
      },
    },
  },
  methods: {
    ...mapActions({
      listAction: "listCategory",
    }),
    async loadList() {
      this.list = await this.listAction();
    },
    setItem({ id }) {
      this.itemSelected = id;
    },
  },
  computed: {
    options() {
      return [
          {
              value: null,
              text: 'choose an class',
              disabled: true
          },
          ...this.list.map((v) => ({ value: v.id, text: v.name }))
      ]
    },
  },
  async created() {
    await this.loadList();
  },
};
</script>

<style></style>
