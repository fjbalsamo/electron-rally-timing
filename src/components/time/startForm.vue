<template>
  <b-form validated @submit.prevent="submit">
    <b-form-group>
        <StageInput 
          prefix="start" 
          ref="startStageInput" 
          v-on:move="onStageMove"
          v-on:stageFound="onStageFound"
        />
    </b-form-group>

    <b-form-group>
        <CrewInput 
          prefix="start" 
          ref="startCrewInput" 
          v-on:move="onCrewMove" 
          v-on:crewFound="onCrewFound"
        />
    </b-form-group>

    <b-form-group>
        <InputHMS 
          prefix="start" 
          ref="startTimeInput"  
          v-on:move="onTimeMove"
          v-on:timeParsed="onTimeParsed"
        />
    </b-form-group>

    <b-form-group class="text-right">
        <b-button 
          id="startSubmit" 
          type="submit" 
          variant="primary"
          :disabled="item.stage==null || item.crew==null || item.time==null"
        >
            <fa-icon icon="save"/>
        </b-button>
    </b-form-group>
  </b-form>
</template>

<script>
import InputHMS from './InputHMS.vue';
import StageInput from '../stage/Input.vue';
import CrewInput from '../crew/Input.vue';
import {
  startFocus
} from '../../util/keyboard.handeler';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "StartForm",
  components: {
      InputHMS,
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
      startTimeAction: 'startTime'
    }),

    async submit(){

      try {
        let res = await this.startTimeAction({
          ...this.item,
          calendar:this.workCalendar
        });

        this.$refs['startCrewInput'].reset();
        this.$refs['startTimeInput'].reset();
        
        this.item.crew = null;
        this.item.time = null;
        startFocus('stage');
        
        

      } catch (error) {
        console.error(error);        
      }
      
    },

    onStageFound(stage){
      this.item.stage = stage;
      startFocus('crew');
      this.$refs['startTimeInput'].addNextStart();
    },

    onCrewFound(crew){
      this.item.crew = crew;
      startFocus('hh');
    },

    onTimeParsed(time){
      this.item.time = time;
      //document.getElementById('startSubmit').focus();
      this.submit();
    },

    /** start keyboard handeler */
    focus: () => startFocus('stage'),

    onStageMove: (d) => (d === 'right' ? startFocus('crew') : startFocus('ss')),
    
    onCrewMove: (d) => (d === 'right' ? startFocus('hh') : startFocus('stage')),

    onTimeMove: (d) => (d === 'right' ? startFocus('stage') : startFocus('crew')),
    /** end keyboard handeler */
    
  },
  created(){
    
  },
  computed: {
    ...mapGetters({
      workCalendar: 'getWorkCalendar'
    }),
  }

};
</script>
