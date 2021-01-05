<template>
  <b-jumbotron>
      <h1 class="text-center">Put your Rally in Orbit</h1>
      <hr />
       <p class="text-right">
            <small v-if="isOnline" class="float-left">
                {{ transmissionCount }} success transmissions
            </small>
            <b-button
              :variant="isOnline ? 'success' : 'secondary'"
              @click="toggleOnlineAction"
            >
              <fa-icon icon="wifi" />
            </b-button>
          </p>
          <p>
            <small class="text-muted">
                The app throw updates using internet each time a crew arrives or 
                time arrival is set, a penalty is added or removed, a time 
                register is show or hide.
            </small>
          </p>
  </b-jumbotron>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
    name: 'ToggleBtnLive',
    props: {
        calendar: {
            type: Object,
            required: true
        }
    },
    methods: {
    ...mapActions({
      toggleOnlineAction: "toggleOnline",
      updateCalendarAction: 'updateCalendar',
      saveFireStoreAction: 'saveFireStoreCalendar'
    }),

  },
  computed: {
    ...mapGetters({
      isOnline: "isOnline",
      transmissionCount: "getTransmissionCount",
    }),
  },
}
</script>