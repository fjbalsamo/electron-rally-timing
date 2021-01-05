<template>
  <b-form-select
    v-model="selection"
    :options="options"
    class="text-uppercase"
    :required="required"
    multiple
  />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MultiSelectCategory",
  props: {
      required: {
          type: Boolean,
          default: false
      }
  },
  data() {
    return {
      list: [],
      selection: [],
    };
  },
  watch: {
    selection: {
      deep: true,
      handler(newVal, oldVal) {
        this.$emit("select", this.selection);
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
      this.selection = id;
    },
  },
  computed: {
    options() {
      return this.list.map((v) => ({ 
            value: v.id, 
            text: `${v.name } - ${v.championship.name}`
          }));
    },
  },
  async created() {
    await this.loadList();
  },
};
</script>

<style></style>
