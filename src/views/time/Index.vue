<template>
  <b-container fluid class="pb-3">
    <b-row>
      <b-col>
        <b-breadcrumb :items="menu" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="7">
        <time-list ref="list" />
      </b-col>
      <b-col>
        <b-card no-body>
            <b-tabs card justified v-model="tab">
              <b-tab title="start" :active="tab == 'start'">
                <start-form class="mt-3" ref="startForm" />
              </b-tab>
              <b-tab title="arrival" :active="tab == 'arrival'">
                <arrival-form class="mt-3" ref="arrivalForm" />
              </b-tab>
              <b-tab title="assign" :active="tab == 'assign'">
                <assign-form class="mt-3" ref="assignForm" />
              </b-tab>
              <b-tab title="penalty" :active="tab == 'penalty'">
                <penalty-form ref="penaltyForm" class="mt-3" />
              </b-tab>
              <b-tab title="report" :active="tab == 'report'">
                <report-form
                  class="mt-3"
                  ref="reportForm"
                  :calendar="workCalendar"
                />
              </b-tab>
            </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import StartForm from "../../components/time/startForm.vue";
import ArrivalForm from "../../components/time/arrivalForm.vue";
import AssignForm from "../../components/time/assignForm.vue";
import PenaltyForm from "../../components/penalty/Form.vue";
import ReportForm from "../../components/report/Form.vue";
import TimeList from "../../components/time/List.vue";
import { focusGained } from '../../util/keyboard.handeler';

import { mapGetters } from "vuex";

export default {
  name: "TimePage",
  components: {
    StartForm,
    ArrivalForm,
    AssignForm,
    PenaltyForm,
    ReportForm,
    TimeList,
  },
  data() {
    return {
      tab: 0,
      menu: [
        {
          text: "Home",
          to: "/",
        },
        {
          text: "Times",
          active: true,
        },
      ],
    };
  },
  watch: {
    tab() {
      if (this.tab == 0) {
          setTimeout(() => {
            focusGained('start', 'stage');
          }, 100);
       console.log();
      } else if (this.tab == 1) {
        setTimeout(() => {
            focusGained('arrival', 'stage');
          }, 100);
      } else if (this.tab == 2) {
        setTimeout(() => {
            focusGained('assign', 'stage');
          }, 100);
      } else if (this.tab == 3) {
        setTimeout(() => {
            focusGained('penalty', 'stage');
          }, 100);
      } else if (this.tab == 4){
        //without focus    
      } else {
        this.tab = 0;
        setTimeout(() => {
            focusGained('start', 'stage');
          }, 100);
      }
    },
  },
  methods: {},
  computed: {
    ...mapGetters({
      workCalendar: "getWorkCalendar",
    }),
  },
  created() {
    document.addEventListener("keyup", (e) => {
      if (e.altKey && e.key.toLowerCase() == "a") {
        this.tab++;
      }
    });
  },
};
</script>