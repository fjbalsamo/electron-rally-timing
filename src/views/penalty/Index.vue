<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-breadcrumb :items="menu" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="3">
          <hidden-form ref="hiddenForm" v-on:update="onUpdate" />
      </b-col>
      <b-col>
        <hidden-list ref="hiddenList"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HiddenForm from "../../components/penalty/HiddenForm.vue";
import HiddenList from '../../components/penalty/HideList.vue';

export default {
  name: "PenaltyPage",
  components: {
    HiddenForm,
    HiddenList
  },
  data() {
    return {
      menu: [
        {
          text: "Home",
          to: "/",
        },
        {
          text: "Hide Times",
          active: true,
        },
      ],
    };
  },
  methods: {
    onUpdate(){
      this.$refs['hiddenList'].load()
    }
  }
};
</script>