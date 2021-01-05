<template>
  <b-form @submit.prevent="submit">
      <b-form-group
        label="Stages"
        description="Select one or more stages"
      >
        <stage-multi-select :calendar="calendar" :required="true" v-on:select="onStageSelect"/>
      </b-form-group>

      <b-form-group
        label="Classes"
        description="Select one or more classes"
      >
        <CategoryMultiSelect :required="true" v-on:select="onCategorySelect"/>
      </b-form-group>

       <b-form-group>
        <b-form-checkbox v-model="report.groupByCategory" switch :disabled="report.categories.length<2" >
          Group By Class
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
        label="Title"
        validated
      >
        <b-form-input 
            type="text"
            placeholder="Report Title"
            maxlength="70"
            required
            v-model="report.title"
        />
      </b-form-group>

       <b-form-group>
        <b-form-checkbox v-model="report.sportCheck" switch >
          Sport Auth
        </b-form-checkbox>
      </b-form-group>
       
       <b-form-group>
        <b-form-checkbox v-model="report.technicalCheck" switch >
          Technical Auth
        </b-form-checkbox>
      </b-form-group>

      <b-form-group class="text-right">        
        <b-button variant="info" type="submit" :disabled="!reportReady">
          <fa-icon icon="print"/>
        </b-button>
      </b-form-group>
      <b-form-group>
        <b-button class="float-left text-muted" type="button" variant="link" @click="createDocs" size="sm">
          race documentation
        </b-button>
      </b-form-group>
  </b-form>
</template>

<script>
import StageMultiSelect from '../stage/MultiSelect.vue';
import CategoryMultiSelect from '../category/MultiSelect.vue';
import { mapActions } from 'vuex';

export default {
    name: 'ReportForm',
     props: {
        calendar: {
            type: Object, 
            required: true
        }
    },
    components: {
        StageMultiSelect,
        CategoryMultiSelect
    },
    data(){
      return {
        report: {
          stages: [],
          categories: [],
          title: '',
          sportCheck: false,
          technicalCheck: false,
          groupByCategory: false,
        }
      }
    },
    watch: {
      report: {
        deep: true, 
        handler(newVal, oldVal){
          if(newVal.categories.length<2){
            this.report.groupByCategory = false;
          }
        }
      },
    },
    methods: {
      ...mapActions({
        createReportAction: 'createReport',
        createDocumentControl: 'createDocumentControl'
      }),
        async submit(){
         this.createReportAction(this.report);
        },
        onStageSelect(list){
            this.report.stages = list;
        },
        onCategorySelect(list){
          this.report.categories = list;
        },
        createDocs(){
          this.createDocumentControl(this.calendar);
        },
    },
    computed: {
      reportReady(){
        return (this.report.stages.length>0 
        || this.report.categories.length>0 
        || this.report.title.trim().length>0);
      }
    }
}
</script>

<style>

</style>