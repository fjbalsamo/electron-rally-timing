<template>
    <b-input-group>
        <!-- clock icon --> 
         <b-input-group-prepend>
          <b-input-group-text>
            <fa-icon icon="stopwatch" />
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input 
            type="number"
            min="0"
            step="1"
            max="23"
            placeholder="hh"
            v-model="item.hh"
            :id="`${prefix}_hh`"
            required
            @keyup.left="move('left')"
            @keyup.right="internalMove('mm')"
            @keydown.enter.prevent="internalMove('mm')"
        />
        <!-- two points separator between hours and minutes --> 
         <b-input-group-prepend>
          <b-input-group-text>:</b-input-group-text>
        </b-input-group-prepend>
        <b-form-input 
            type="number"
            min="0"
            step="1"
            max="59"
            placeholder="mm"
            v-model="item.mm"
            :id="`${prefix}_mm`"
            required
            @keyup.left="internalMove('hh')"
            @keyup.right="internalMove('ss')"
            @keydown.enter.prevent="internalMove('ss')"
        />
        <!-- two points separator between minutes and seconds --> 
         <b-input-group-prepend>
          <b-input-group-text>:</b-input-group-text>
        </b-input-group-prepend>
        <b-form-input 
            type="number"
            min="0"
            step="1"
            max="59"
            placeholder="ss"
            v-model="item.ss"
            :id="`${prefix}_ss`"
            required
            @keyup.left="internalMove('mm')"
            @keyup.right="internalMove('dd')"
            @keydown.enter.prevent="internalMove('dd')"
        />
        <!-- one point separator between seconds and ten of seconds --> 
         <b-input-group-prepend>
          <b-input-group-text>:</b-input-group-text>
        </b-input-group-prepend>
        <b-form-input 
            type="number"
            min="0"
            step="1"
            max="9"
            placeholder="dd"
            v-model="item.dd"
            :id="`${prefix}_dd`"
            required
            @keyup.left="internalMove('ss')"
            @keyup.right="move('right')"
            @keydown.enter.prevent="parseTime"
        />
    </b-input-group>
</template>

<script>
import { focusGained } from '../../util/keyboard.handeler';
import { timeObject_to_ms } from '../../util/time.util';
export default {
  name: "InputHMSD",
  props: {
      prefix: {
          type: String,
          default: '_'
      },
      includeHours: {
        type: Boolean,
        default: false
      }
  },
  data() {
    return {
        item: {
          hh:null,
          mm:null,
          ss:null,
          dd:null
        }
    };
  },
  methods: {
     reset(){
        this.item = {
          hh: this.includeHours ? (new Date()).getHours() : null,
          mm:null,
          ss:null,
          dd: null
        }
      },
      move(direction){
        this.$emit('move', direction);
      },
      internalMove(nextID) {
        focusGained(this.prefix, nextID);
      },
      parseTime(){
        let time = timeObject_to_ms(this.item);
        if(time>=0){
          this.$emit('timeParsed', time);
        }
      }
  },
  created(){
    if(this.includeHours){
      this.item.hh = (new Date()).getHours();
    }
  }
};
</script>

<style></style>
