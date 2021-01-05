<template>
  <b-container fluid class="mt-5">
      <b-row v-if="workCalendar!=null">
          <b-col>
              <b-alert variant="info" :show="true">
                  <h4 class="text-uppercase">{{workCalendar.name}}</h4>
                  <h6 class="text-uppercase">{{workCalendar.number}}<sup>th</sup> race of year</h6>
                  <p class="text-uppercase">
                      {{workCalendar.location}}
                  </p>
                  <p>
                      {{workCalendar.from}} to {{workCalendar.to}}
                  </p>
              </b-alert>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CalendarBanner',
    computed: {
        ...mapGetters({
            workCalendar: 'getWorkCalendar'
        })
    }

}
</script>

<style>

</style>