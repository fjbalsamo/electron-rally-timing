<template>
  <div id="app">
    <default-nav-bar ref="defaultNavBar" />
    <router-view class="mt-3"/>
    <calendar-banner ref="calendarBanner" />
  </div>
</template>

<script>
import DefaultNavBar from './components/Navs/DefaultNavBar.vue';
import CalendarBanner from './components/calendar/Banner.vue';

export default {
  name: 'App',
  components: {
    DefaultNavBar,
    CalendarBanner
  }
}
</script>