<template>
  <b-form validated @submit.prevent="submit">
    <b-form-group 
      class="text-right"
      :description="penaltyTypeDescription"
    >
      <b-button-group>
        <b-button 
          type="button" 
          :variant="item.type == 'race' ? 'success' : 'secondary'"
          @click="item.type='race'"
        >
          in race
        </b-button>
        <b-button
          type="button" 
          :variant="item.type == 'control' ? 'success' : 'secondary'"
          @click="item.type='control'"
        >
          in a control
        </b-button>
      </b-button-group>
    </b-form-group>
    <b-form-group>
        <StageInput
          ref="penaltyStageInput" 
          prefix="penalty" 
          v-on:move="onStageMove"
          v-on:stageFound="onStageFound"
        />
    </b-form-group>

    <b-form-group>
        <CrewInput
          ref="penaltyCrewInput" 
          prefix="penalty" 
          v-on:move="onCrewMove" 
          v-on:crewFound="onCrewFound"
        />
    </b-form-group>

    <b-form-group>
        <InputHMS
          ref="penaltyTimeInput" 
          prefix="penalty" 
          v-on:move="onTimeMove"
          v-on:timeParsed="onTimeParsed"
        />
    </b-form-group>
    
    <b-form-group>
        <b-form-input 
          size="lg"
          id="penalty_description" 
          placeholder="Penalty description" 
          required 
          maxlength="49"
          v-model="item.description" 
          @keyup.left="internalMove('ss')"
          @keyup.right="internalMove('stage')"
        />
    </b-form-group>

    <b-form-group class="text-right">
        <b-button 
          type="submit" 
          variant="danger"
          :disabled="item.stage==null || item.crew==null || item.time==null || item.description.trim().length==0"
        >
            <fa-icon icon="save"/>
        </b-button>
    </b-form-group>

  </b-form>
</template>

<script>
import InputHMS from '../time/InputHMS';
import StageInput from '../stage/Input.vue';
import CrewInput from '../crew/Input.vue';
import { penaltyFocus } from '../../util/keyboard.handeler';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "PenaltyForm",
  components: {
      InputHMS,
      StageInput,
      CrewInput
  },
  data(){
    return {
      item: {
        stage: null,
        crew: null,
        time: null, 
        type: 'race',
        description: ''
      }
    };
  },
  methods: {

    ...mapActions({
      addPenaltyAction: 'addPenalty'
    }),

    async submit(){

      await this.addPenaltyAction({
        ...this.item,
        calendar: this.workCalendar
      })

      this.$refs['penaltyStageInput'].reset();
      this.$refs['penaltyCrewInput'].reset();
      this.$refs['penaltyTimeInput'].reset();
      
      this.item = {
        stage: null,
        crew: null,
        time: null,
        type: 'race',
        description: ''
      };

      penaltyFocus('stage');
    },

    onStageFound(stage){
      this.item.stage = stage;
      penaltyFocus('crew');
    },

    onCrewFound(crew){
      this.item.crew = crew;
      penaltyFocus('hh');
    },

    onTimeParsed(time){
      this.item.time = time;
      penaltyFocus('description');
    },
    
    internalMove(id){
      penaltyFocus(id);
    },

    focus: () => penaltyFocus('stage'),

    onStageMove: (d) => (d === 'right' ? penaltyFocus('crew') : penaltyFocus('description')),

    onCrewMove: (d) => (d === 'right' ? penaltyFocus('hh') : penaltyFocus('stage')),
    
    onTimeMove: (d) => (d === 'right' ? penaltyFocus('description') : penaltyFocus('crew')),
    
    
  },
  computed: {
    penaltyTypeDescription(){
      return `Crew penalized for an error `+(this.item.type == 'race' 
    ? `within a race sector` 
    : `in a hourly control`); 
    },
    ...mapGetters({
      workCalendar: 'getWorkCalendar'
    }) 
  },
};
</script>
