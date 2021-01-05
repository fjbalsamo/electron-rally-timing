import Vue from 'vue'
import Vuex from 'vuex'

import championshipModule from './championship'
import categoryModule from './category';
import crewModule from './crew';
import calendarModule from './calendar';
import stageModule from './stage';
import timeModule from './time';
import reportModule from './report';
import liveModule from './live';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },  
  modules: {
    championship: championshipModule,
    category: categoryModule,
    crew: crewModule,
    calendar: calendarModule,
    stage: stageModule,
    time: timeModule,
    report: reportModule,
    live: liveModule
  }
})
