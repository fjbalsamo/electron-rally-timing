<template>
  <b-form validated >
    <b-form-group>
        <StageInput 
          ref="assingStageInput"
          prefix="assign" 
          v-on:move="onStageMove"
          v-on:stageFound="onStageFound"
        />
    </b-form-group>

    <b-form-group>
        <CrewInput 
          ref="assingCrewInput"
          prefix="assign" 
          v-on:move="onCrewMove" 
          v-on:crewFound="onCrewFound"
        />
    </b-form-group>

    <b-form-group>
        <InputHMSD 
          ref="assingTimeInput"
          prefix="assign" 
          v-on:move="onTimeMove"
          v-on:timeParsed="onTimeParsed"
        />
    </b-form-group>

    <b-form-group class="text-right">
        <b-button 
          type="submit" 
          variant="warning"
          :disabled="item.stage==null || item.crew==null || item.time==null"
        >
            <fa-icon icon="save"/>
        </b-button>
    </b-form-group>

  </b-form>
</template>

<script>
import InputHMSD from './InputHMSD.vue';
import StageInput from '../stage/Input.vue';
import CrewInput from '../crew/Input.vue';
import { assignFocus } from '../../util/keyboard.handeler';

import {  mapGetters, mapActions } from 'vuex';

export default {
  name: "AssignForm",
  components: {
      InputHMSD,
      StageInput,
      CrewInput,
  },
  data(){
    return {
       item: {
        stage: null,
        crew: null,
        time: null
      }
    };
  },
  methods: {

    ...mapActions({
      assignTimeAction: 'assignTime'
    }),

    async submit(){
      try {
        let res = await this.assignTimeAction({
          ...this.item,
          calendar:this.workCalendar
        });

        this.$refs['assingCrewInput'].reset();
        this.$refs['assingTimeInput'].reset();
        
        this.item.crew = null;
        this.item.time = null;
        assignFocus('stage');
      } catch (error) {
        console.error(error);
      }
    },

    onStageFound(stage){
      this.item.stage = stage;
      assignFocus('crew');
    },

    onCrewFound(crew){
      this.item.crew = crew;
      assignFocus('hh');
    },

    onTimeParsed(time){
      this.item.time = time;
      //document.getElementById('startSubmit').focus();
      this.submit();
    },

    focus: () => assignFocus('stage'),
    
    onStageMove: (d) => (d === 'right' ? assignFocus('crew') : assignFocus('dd')),

    onCrewMove: (d) => (d === 'right' ? assignFocus('hh') : assignFocus('stage')),
    
    onTimeMove: (d) => (d === 'right' ? assignFocus('stage') : assignFocus('crew')),
    
  },
  computed: {
    ...mapGetters({
      workCalendar: 'getWorkCalendar'
    }),
  }
};
</script>
