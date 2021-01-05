<template>
    <b-input-group>
        <b-input-group-prepend>
          <b-input-group-text>
            <fa-icon icon="car" />
          </b-input-group-text>
        </b-input-group-prepend>

        <b-form-input 
            placeholder="Vehicle Number"
            type="number"
            min="1"
            step="1"
            max="999"
            required
            v-model="number"
            :id="`${prefix}_crew`"
            @keyup.left="move('left')"
            @keyup.right="move('right')"
            @keydown.enter.prevent="search"
        />
    </b-input-group>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'CrewInput',
    props: {
        prefix: {
            type: String,
            default: '_'
        }
    },
    data(){
        return {
            number: null
        }
    },
    methods: {
        ...mapActions({
            searchAction: 'oneCrew'
        }),

        reset(){
            this.number = null
        },
        
        async search(){
            try {
                let number = parseInt(this.number);
                if(!isNaN(number) && number>0){
                    let crews = await this.searchAction({number: number})
                    if(crews.length==1){
                        this.$emit('crewFound', crews[0]);
                    }else if(crews.length==0){
                        console.error(`crew not found`);
                    }else{
                        console.error(`more one crew with same number`);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        move(direction){
            this.$emit('move', direction);
        }
    }
}
</script>