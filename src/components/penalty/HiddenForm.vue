<template>
  <b-form @submit.prevent="submit">
      <b-form-group description="Hide times an specific crew">
          <crew-input 
            prefix="hidden" 
            ref="hiddenCrewInput"  
            :required="true" 
            v-on:crewFound="onCrewFound" 
          />
      </b-form-group>
      <!-- <b-form-group class="text-right">
          <b-button type="submit" variant="secondary">
              <fa-icon icon="save"/>
          </b-button>
      </b-form-group> -->
  </b-form>
</template>

<script>
import CrewInput from '../crew/Input.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'HiddenForm',
    components: {
        CrewInput
    },
    data(){
        return {
            crew: null,
        }
    },
    methods: {
        ...mapActions({
            hiddenTimeStatusAction: 'hiddenTimeStatus'
        }),
        onCrewFound(crew){
            this.crew = crew;

            this.submit();
        },
        async submit(){
            try {

                let hiddenStatus = {
                    status: true,
                    crew_id: this.crew.id,
                    calendar_id: this.workCalendar.id
                };
                await this.hiddenTimeStatusAction(hiddenStatus);
                this.$refs['hiddenCrewInput'].reset();
                this.crew = null;
                this.$emit('update');
                
            } catch (error) {
                console.error(error);                
            }
        }
    },
    computed: {
    ...mapGetters({
       workCalendar: 'getWorkCalendar'
    })
  }
}
</script>