import { TimeModel, StageModel, CrewModel, CategoryModel} from './connection';
import { Op, literal } from 'sequelize';

class PenaltyService {

    constructor(){}
    
    async findOne(where){
        const { stage_id, crew_id, calendar_id } = where;
        
        if(!stage_id) throw new Error(`stage id is missing`);

        if(!crew_id) throw new Error(`crew id is missing`);

        if(!calendar_id) throw new Error(`calendar id is missing`);
        
        return TimeModel.findAll({
            attributes: [
                ['time_id', 'id'],
                ['time_penalty_race', 'penalty_race'],
                ['time_penalty_control', 'penalty_control'],
                ['time_penalty_description', 'penalty_description'],
            ],
            where: {
                [Op.and]: [
                    {time_crew_id: crew_id},
                    {time_stage_id: stage_id},
                    {time_calendar_id: calendar_id},
                ]
            }
        })
    }


    async findByID(where){
        const { id } = where;
        
        if(!id) throw new Error(`time id is missing`);
        
        return TimeModel.findAll({
            attributes: [
                ['time_id', 'id'],
                ['time_penalty_race', 'penalty_race'],
                ['time_penalty_control', 'penalty_control'],
                ['time_penalty_description', 'penalty_description'],
            ],
            where: {
                time_id: id
            }
        })
    }

    async save(penalty){
        
        const { calendar, stage, crew, time, type, description } = penalty;

        if(!stage || !stage.id) throw new Error(`stage id is missing`);

        if(!crew || !crew.id) throw new Error(`crew id is missing`);

        if(!calendar || !calendar.id) throw new Error(`calendar id is missing`);

        if(isNaN(time)) throw new Error(`penalization time is required`);

        if(!type || !(type == 'race' || type == 'control')) throw new Error(`penalization type is required`);

        if(!description) throw new Error(`penalization detail is required`);

        const item = await this.findOne({
            stage_id: stage.id, 
            calendar_id: calendar.id, 
            crew_id: crew.id
        });

        if(item.length==1){
            
            const { id, penalty_description } = item[0].toJSON();
            
            if(!id) throw new Error(`time id is missing`);
            
            if(!penalty_description) throw new Error(`penalty list missing`);
            
            let list = JSON.parse(penalty_description); 

            list.push({
                type: type,
                time: time,
                description: description.trim().toLowerCase()
            });

            let race=0, control=0;

            list.map(value => {
                if(value.type == 'race'){
                    race+=value.time;
                }else if(value.type == 'control'){
                    control+=value.time;
                }
            })

            return await TimeModel.update({
                time_penalty_race: race,
                time_penalty_control: control,
                time_penalty_description: JSON.stringify(list)
            }, {
                where: {
                    time_id: id
                }
            })
        }else{
            throw new Error(`starting register not found`)
        }
    }

    async remove(where){
        const { id, index } = where;

        if(!id) throw new Error(`time id is missing`);

        if(isNaN(index) || index<0) throw new Error(`penalization item not found`);

        let item = await this.findByID({id});

        if(item.length==1){
            const { penalty_description } = item[0].toJSON();

            let list  = JSON.parse(penalty_description);

            list.splice(index, 1);

            let race=0, control=0;

            list.map(value => {
                if(value.type == 'race'){
                    race+=value.time;
                }else if(value.type == 'control'){
                    control+=value.time;
                }
            })

            return await TimeModel.update({
                time_penalty_race: race,
                time_penalty_control: control,
                time_penalty_description: JSON.stringify(list)
            }, {
                where: {
                    time_id: id
                }
            })


        }else{
            throw new Error(`starting register not found`)
        }
    }

    async hideTimeList(calendar){
        const { id } = calendar;

        return await TimeModel.findAll({
            attributes: [
                ['time_crew_id', 'crew_id'],
                ['time_calendar_id', 'calendar_id'],
                [literal('COUNT(`time`.`time_id`)'), 'hideCount']
            ],
            include: [
                {
                    model: CrewModel,
                    attributes: [
                        ['crew_name', 'name'],
                        ['crew_number', 'number'],
                        ['crew_vehicle', 'vehicle'],
                    ],
                    as: 'crew',
                    include: [
                        {
                            model: CategoryModel,
                            attributes: [
                                ['category_id', 'id'],
                                ['category_championship_id', 'championship_id'],
                                ['category_name', 'name'],
                                ['category_priority', 'priority'],
                            ],
                            as: 'category',
                        }
                    ]
                }
            ],
            where: {
                [Op.and]: [
                    {time_calendar_id: id},
                    {time_hidden: true}
                ]
            },
            group: [
                'time_crew_id'
            ]
        })
    }


    async changeHideStatus(where){
        const { calendar_id, crew_id, status } = where;

        return await TimeModel.update({
            time_hidden: status,
        }, {
            where: {
                [Op.and]: [
                    {time_calendar_id: calendar_id},
                    {time_crew_id: crew_id},
                ]
            }
        })


    }

}

export default new PenaltyService();