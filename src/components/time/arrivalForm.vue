<template>
  <b-form validated @submit.prevent="submit">
    <b-form-group>
        <StageInput 
          prefix="arrival" 
          ref="arrivalStageInput"
          v-on:move="onStageMove"
          v-on:stageFound="onStageFound"
        />
    </b-form-group>

    <b-form-group>
        <CrewInput 
          prefix="arrival" 
          ref="arrivalCrewInput"
          v-on:move="onCrewMove" 
          v-on:crewFound="onCrewFound"
        />
    </b-form-group>

    <b-form-group>
        <InputHMSD 
          prefix="arrival"
          ref="arrivalTimeInput"
          v-on:move="onTimeMove"
          v-on:timeParsed="onTimeParsed"
          :includeHours="true"
        />
    </b-form-group>

    <b-form-group class="text-right">
        <b-button 
          id="arrivalSubmit"
          type="submit" 
          variant="success"
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
import { arrivalFocus } from '../../util/keyboard.handeler';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ArrivalForm",
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
      arrivalTimeAction: 'arrivalTime'
    }),

    async submit(){
      try {
        
        let res = await this.arrivalTimeAction({
          ...this.item,
          calendar: this.workCalendar
        })

        this.$refs['arrivalCrewInput'].reset();
        this.$refs['arrivalTimeInput'].reset();
        
        this.item.crew = null;
        this.item.time = null;
        arrivalFocus('stage');
      } catch (error) {
        console.error(error);
      }
    },

    onStageFound(stage){
      this.item.stage = stage;
      arrivalFocus('crew');
    },

    onCrewFound(crew){
      this.item.crew = crew;
      arrivalFocus('mm')
    },

    onTimeParsed(time){
      this.item.time = time;
      this.submit();
    },
    
    focus: () => arrivalFocus('stage'),
    
    onStageMove: (d) => (d === 'right' ? arrivalFocus('crew') : arrivalFocus('dd')),
    
    onCrewMove: (d) => (d === 'right' ? arrivalFocus('hh') : arrivalFocus('stage')),
    
    onTimeMove: (d) => (d === 'right' ? arrivalFocus('stage') : arrivalFocus('crew')),
    
  },
  computed: {
    ...mapGetters({
      workCalendar: 'getWorkCalendar'
    }),
  }
};
</script>
