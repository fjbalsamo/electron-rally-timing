<template>
  <div class="container">
      <div class="row" v-if="last.start!=null">
          <div class="col text-right">
              <small><strong>Last Start</strong></small>
          </div>
          <div class="col text-center">
              <small class="text-uppercase">
                  {{last.start.crew.number}}
              </small>
          </div>
          <div class="col text-center">
              <small class="text-uppercase">
                  {{last.start.crew.category.name}}
              </small>
          </div>
          <div class="col text-left">
              <small class="text-uppercase">
                  {{last.start.start | start}}
              </small>
          </div>
      </div>

      <div class="row" v-if="last.arrival!=null">
          <div class="col text-right">
              <small><strong>Last Arrival</strong></small>
          </div>
          <div class="col text-center">
              <small class="text-uppercase">
                  {{last.arrival.crew.number}}
              </small>
          </div>
          <div class="col text-center">
              <small class="text-uppercase">
                  {{last.arrival.crew.category.name}}
              </small>
          </div>
          <div class="col text-left">
              <small class="text-uppercase">
                  {{last.arrival.arrival | arrival}}
              </small>
          </div>
      </div>

  </div>
</template>

<script>
import { gestLastItem } from '../../util/time.util';

export default {
    name: 'LastTimeAdded',
    props: {
        list: {
            type: Array,
            default: () => []    
        }
    },
    data(){
        return {
            last: {
                start: null,
                arrival:  null
            }
        }
    },
    watch: {
        list: {
            deep: true,
            handler(newVal, oldVal){
                this.last = gestLastItem(newVal);
            }
        }
    }
}
</script>