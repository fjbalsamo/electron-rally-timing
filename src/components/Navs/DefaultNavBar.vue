<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" sticky>
    <b-navbar-brand to="/">
      <fa-icon icon="home"/>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/championship">
          <fa-icon icon="trophy"/>
        </b-nav-item>
        <b-nav-item to="/category">
          <fa-icon icon="car"/>
        </b-nav-item>
        <b-nav-item to="/crew">
          <fa-icon icon="users"/>
        </b-nav-item>
        <b-nav-item to="/calendar">
          <fa-icon icon="calendar"/>
        </b-nav-item>
        <b-nav-item to="/stage" :disabled="workCalendar==null">
          <fa-icon icon="route"/>
        </b-nav-item>
        <b-nav-item to="/time" :disabled="workCalendar==null">
          <fa-icon icon="stopwatch"/>
        </b-nav-item>
        <b-nav-item to="/penalty" :disabled="workCalendar==null">
          <fa-icon icon="eye"/>
        </b-nav-item>
       
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
         <b-nav-item to="/live" v-if="workCalendar!=null">
          <fa-icon icon="wifi"/>
         </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "DefaultNavBar",
  computed: {
    ...mapGetters({
       workCalendar: 'getWorkCalendar'
    })
  }
};
</script>

<style></style>
