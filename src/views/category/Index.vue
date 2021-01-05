<template>
  <b-container fluid>
      <b-row>
          <b-col>
              <b-breadcrumb :items="menu"/>
          </b-col>
      </b-row>
      <b-row>
          <b-col cols="5">
              <category-form ref="form" v-on:update="update"/>
          </b-col>
          <b-col>
              <category-list ref="list" v-on:select="edit" />              
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import CategoryForm from '../../components/category/Form.vue';
import CategoryList from '../../components/category/List.vue';

export default {
    name: 'CategoryPage',
    components: {
        CategoryForm,
        CategoryList
    },
    data(){
        return {
            menu: [
                {
                    text: 'Home',
                    to: '/'
                },
                {
                    text: 'Classes',
                    active: true
                }
            ]
        }
    },
    methods: {
        update(){
            this.$refs['list'].loadList();
        },
        edit(item){
            let { ...clone } = item;
            this.$refs['form'].setItem(clone);
        }
    }
}
</script>

<style>

</style>