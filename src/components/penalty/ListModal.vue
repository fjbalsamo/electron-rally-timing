<template>
    <b-modal v-model="modal" hide-footer size="lg" :title="title"> 
        <b-list-group>
            <b-list-group-item
                v-for="(item, index) in array"
                :key="index"
                v-show="item.type == type"
            >
                <b-button-close text-variant="danger" @click="remove(item.index)">
                    <fa-icon icon="trash-alt"/>
                </b-button-close>
                <h3>
                    {{ item.time | penalty }}
                </h3>
                <p class="text-uppercase">
                    <small>{{item.description}}</small>
                </p>
            </b-list-group-item>
        </b-list-group>
    </b-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'PenaltyModal',
    props:{
        type: {
            type: String,
            required: true,
        },
        data: {
           type: Object,
           default: () => ({})
        }
    },
    data(){
        return {
            modal: false
        }
    },
    methods: {
        ...mapActions({
            delPenaltyAction: 'delPenalty'
        }),
        toggle(){
            this.modal=!this.modal;
        },
        async remove(index){
            try {

                await this.delPenaltyAction({
                    id: this.data.id,
                    index: index,
                    stage_id: this.data.stage_id
                });
                
                this.modal = false;     
            } catch (error) {
                console.error(error);
            }

        }
    },
    computed: {
        array(){
            const { penalty_description } = this.data || {};
            if(!penalty_description) return [];
            let parse = JSON.parse(penalty_description);
            let fullPenalty = parse.map((v, i) => ({...v, index: i}));

            return fullPenalty.filter(v => v.type == this.type);
        },
        title(){
            if(this.type == 'race'){
                return 'Crew penalties for an error within a race sector';
            }else if(this.type == 'control'){
                return 'Crew penalties for an error in a hourly control';
            }else{
                return ``;
            }
        }
    }
}
</script>