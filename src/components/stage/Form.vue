<template>
    <b-form validated @submit.prevent="submit" @reset="reset">
        <b-form-group>
            <b-form-input 
                id="stageName"
                type="text"
                placeholder="stage name"
                class="text-uppercase"
                required
                v-model="item.name"
                @keypress.enter.prevent="changeFocus('stageDay')"
                autofocus
            />
        </b-form-group>
        
        <b-form-group>
            <b-form-input 
                id="stageDay"
                type="date"
                class="text-uppercase"
                required
                v-model="item.day"
                :min="calendar.from"
                :max="calendar.to"
                @keypress.enter.prevent="changeFocus('stagePriority')"
            />
        </b-form-group>

         <b-form-group>
            <b-form-input 
                id="stagePriority"
                type="number"
                placeholder="stage number"
                class="text-uppercase"
                required
                v-model="item.priority"
                min="1"
                step="1"
                @keypress.enter.prevent="changeFocus('stageLong')"
            />
        </b-form-group>

         <b-form-group
            description="use kilometers as distance unit"
         >
            <b-form-input 
                id="stageLong"
                type="number"
                placeholder="stage long"
                class="text-uppercase"
                required
                v-model="item.long"
                min="0.01"
                step="0.01"
                @keypress.enter.prevent="changeFocus('stageDelay')"
            />
        </b-form-group>

         <b-form-group
            description="Max. Delay"
         >
            <b-form-input 
                id="stageDelay"
                type="time"
                class="text-uppercase"
                required
                v-model="max_delay"
            />
        </b-form-group>

        <b-form-group class="text-right">
            <b-button type="reset" variant="primary" class="mr-2" v-show="!insertMode">
                <fa-icon icon="ban"/>
            </b-button>
            <b-button 
                type="submit" 
                variant="success"
                :disabled="!nameValid || !dayValid || !maxDelayValid || !priorityValid || !longValid"
            >
                <fa-icon icon="save"/>
            </b-button>
        </b-form-group>
        
    </b-form>
</template>

<script>
import { mapActions } from 'vuex';
import { hhmmss_to_ms, ms_to_string } from '../../util/time.util';
import { inputFocus } from '../../util/keyboard.handeler';

export default {
    name: 'StageForm',
    props: {
        calendar: {
            type: Object, 
            required: true,
        }
    },
    data(){
        return {
            max_delay: '',
            item: {
                name: '',
                day: '',
                max_delay: 0,
                long: null,
                priority: null
            },
            insertMode: true
        }
    },
    watch: {
        max_delay(newVal, oldVal){
            this.item.max_delay = hhmmss_to_ms(newVal)
        }
    },
    methods: {
        ...mapActions({
            insertAction: 'newStage',
            updatAction: 'updateStage'
        }),
        async submit(){
            //add calendar id 
            try {
                if(this.insertMode){
                    await this.insertAction({
                        ...this.item,
                        calendar_id: this.calendar.id
                    });
                }else{
                    await this.updatAction(this.item);
                }
                this.reset();
                this.$emit('update');
            } catch (error) {
                console.error(error);
            }

        },
        async reset(){
            this.item = {
                name: '',
                day: '',
                max_delay: 0,
                long: null,
                priority: null
            },
            this.insertMode = true;
            this.max_delay = '';
        },
        setItem(item){
            this.insertMode = false;
            this.item = item;
            this.max_delay = ms_to_string(item.max_delay, 'HH:mm')
            inputFocus('stageName')
        },
        changeFocus(inputID){
            inputFocus(inputID);
        }
    },
    computed: {
        nameValid(){
            return this.item.name.trim().length>0;
        },
        dayValid(){
            return this.item.day.trim().length>0;
        },
        maxDelayValid(){
            return this.item.max_delay>0;
        },
        priorityValid(){
            return this.item.priority>0;
        },
        longValid(){
            return this.item.long>0
        }
    }
}
</script>

<style>

</style>