<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-input-group-text>
        <fa-icon icon="route" />
      </b-input-group-text>
    </b-input-group-prepend>

    <b-form-input
      placeholder="Stage Number"
      type="number"
      min="1"
      step="1"
      max="999"
      required
      v-model="number"
      :id="`${prefix}_stage`"
      @keyup.left="move('left')"
      @keyup.right="move('right')"
      @keydown.enter.prevent="search"
    />
  </b-input-group>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "StageInput",
  props: {
    prefix: {
      type: String,
      default: "_",
    },
  },
  data() {
    return {
      number: null,
    };
  },
  methods: {
    ...mapActions({
      searchAction: "oneStage",
      updateStageListAction: "updateStageList"
    }),

    reset(){
        this.number = null
    },

    async search() {
      try {
        let number = parseInt(this.number);

        if (!isNaN(number) && number > 0) {
          
          let stages = await this.searchAction({
            calendar_id: this.WorkCalendar.id,
            priority: number,
          });

          if(stages.length==1){
              this.$emit('stageFound', stages[0]);
              this.updateStageListAction({stage_id: stages[0].id});
          }else if(stages.length>1){
              console.error(`more one stage with same number`)
          }else{
              console.error(`stage number not found`)
          }
        }
      } catch (error) {
          console.error(error);
      }
    },

    move(direction) {
      this.$emit("move", direction);
    },
  },
  computed: {
    ...mapGetters({
      WorkCalendar: "getWorkCalendar",
    }),
  },
};
</script>
