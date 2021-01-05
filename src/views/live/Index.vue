<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-breadcrumb :items="menu" />
      </b-col>
    </b-row>
    <b-row>
      <b-col> </b-col>
      <b-col>
        <toggle-btn-live ref="toggleBtn" :calendar="workCalendar" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ToggleBtnLive from '../../components/live/ToggleBtnLive.vue';

import { mapGetters } from 'vuex';

export default {
  name: "LivePage",
  components: {
    ToggleBtnLive
  },
  data() {
    return {
      menu: [
        {
          text: "Home",
          to: "/",
        },
        {
          text: "Live",
          active: true,
        },
      ],
    };
  },
  computed: {
     ...mapGetters({
            workCalendar: 'getWorkCalendar'
        }),
  }
  
};
</script>

<style></style>
