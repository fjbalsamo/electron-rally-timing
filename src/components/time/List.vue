<template>
  <b-card>
    <b-card-body>
      <last-time-added :list="list"/>     
    </b-card-body>
    <b-card-body class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th class="text-center">
              #
            </th>
            <th class="text-center">
              <fa-icon icon="users" />
            </th>
            <th class="text-center">
              <fa-icon icon="car" />
            </th>
            <th class="text-center">
              <fa-icon icon="clock" />
            </th>
            <th class="text-center">
              <fa-icon icon="stopwatch" />
            </th>
            <th class="text-center">
              <fa-icon icon="stopwatch" class="text-success" />
            </th>
            <th class="text-center">
              <fa-icon icon="stopwatch" class="text-warning" />
            </th>
            <th class="text-center">
              <fa-icon icon="stopwatch" class="text-danger" />
            </th>
            <th class="text-center">
              <b-button-close
                text-variant="danger"
                :disabled="list.length == 0"
                @click="delAll"
              >
                <fa-icon icon="trash-alt" />
              </b-button-close>
            </th>
          </tr>
        </thead>
        <tbody v-if="list.length == 0">
          <tr class="table-info">
            <td colspan="9" class="text-uppercase text-center">
              list empty
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr
            v-for="(item, index) in list"
            :key="index"
            :class="item.hook && item.partial > 0 ? 'table-danger' : null"
          >
            <td class="text-center">
              <small>{{ index+1 }}</small>
            </td>
            <td class="text-center">
              <small>{{ item.crew.number }}</small>
            </td>
            <td class="text-center text-uppercase">
              <small>{{ item.crew.category.name }}</small>
            </td>
            <td class="text-center">
              <small>{{ item.start | start }}</small>
            </td>
            <td class="text-center">
              <small v-if="item.arrival == 0">-</small>
              <small v-else>{{ item.arrival | arrival }}</small>
            </td>
            <td class="text-center">
              <small v-if="item.partial == 0">-</small>
              <small v-else>{{ item.partial | partial }}</small>
            </td>
            <td class="text-center">
              <small v-if="item.penalty_race == 0">-</small>
              <small v-else class="penalty-warning" @click="showPenalty('race', item)">{{
                item.penalty_race | penalty
              }}</small>
            </td>
            <td class="text-center">
              <small v-if="item.penalty_control == 0">-</small>
              <small v-else class="penalty-danger" @click="showPenalty('control', item)">{{
                item.penalty_control | penalty
              }}</small>
            </td>
            <td class="text-center">
              <b-button-close text-variant="secondary" @click="delOne(index)">
                <fa-icon icon="trash-alt" />
              </b-button-close>
            </td>
          </tr>
        </tbody>
      </table>
    </b-card-body>
    <penalty-modal :type="penaltyType" :data="data" ref="penaltyModal" />
  </b-card>
</template>

<script>
import PenaltyModal from "../penalty/ListModal.vue";
import LastTimeAdded from '../time/LastTimeAdded.vue';

import { mapGetters, mapActions } from "vuex";

export default {
  name: "TimeList",
  components: {
    PenaltyModal,
    LastTimeAdded
  },
  data(){
      return {
          penaltyType: 'race',
          data: null
      }
  },
  methods: {
    ...mapActions({
      deleteTimeAction: "deleteTime",
      deleteStageTimesAction: "deleteStageTimes",
    }),

    delOne(index) {
      this.deleteTimeAction(this.list[index]);
    },
    delAll() {
      this.deleteStageTimesAction(this.list[0]);
    },
    showPenalty(type, item){
        this.penaltyType = type;
        this.data = item;
        this.$refs['penaltyModal'].toggle();
    }
  },
  computed: {
    ...mapGetters({
      list: "getStageTimes",
    }),
  },
};
</script>

<style>
.penalty-danger,
.penalty-warning {
  cursor: pointer;
}

.penalty-danger:hover {
  color: #dc3545;
}

.penalty-warning:hover {
  color: #ffc107;
}
</style>
