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
  name: "SelectChampionship",
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
      listAction: "listChampionship",
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
              text: 'choose an championship',
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
