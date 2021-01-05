import { TimeModel, StageModel, CrewModel, CategoryModel, ChampionshipModel } from './connection';
import { Op } from 'sequelize';

const dayZero = new Date(
    (new Date()).getFullYear(),
    (new Date()).getMonth(),
    (new Date()).getDate(),
    0,0,0,0
); 

class TimeService {
    
    constructor(){}

    async stageTimes(where){
        const { stage_id } = where;

        if(!stage_id) throw new Error(`stage id is missing`);

        return TimeModel.findAll({
            include: [
                {
                    model: CrewModel,
                    attributes: [
                        ['crew_id', 'id'],
                        ['crew_location', 'location'],
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
                                ['category_name', 'name'],
                                ['category_priority', 'priority'],
                                ['category_type', 'type']
                            ],
                            as: 'category',
                            include: [
                                {
                                    model: ChampionshipModel,
                                    attributes: [
                                        ['championship_id', 'id'],
                                        ['championship_name', 'name'],
                                        ['championship_priority', 'priority']
                                    ],
                                    as: 'championship'
                                }
                            ]
                        }
                    ]
                }
            ],
            attributes: [
                ['time_id', 'id'],
                ['time_stage_id', 'stage_id'],
                ['time_start', 'start'],
                ['time_arrival', 'arrival'],
                ['time_partial', 'partial'],
                ['time_hook', 'hook'],
                ['time_penalty_race', 'penalty_race'],
                ['time_penalty_control', 'penalty_control'],
                ['time_penalty_description', 'penalty_description'],
                ['updatedAt', 'updatedAt']
            ],
            where: {
                [Op.and]: [
                    { time_stage_id: stage_id },
                    { time_hidden: false }
                ]
            },
            order: [
                ['time_start', 'ASC'],
            ]
        })
    }

    async findOne(where){
        const { stage_id, crew_id, calendar_id } = where;
        
        if(!stage_id) throw new Error(`stage id is missing`);

        if(!crew_id) throw new Error(`crew id is missing`);

        if(!calendar_id) throw new Error(`calendar id is missing`);
        
        return TimeModel.findAll({
            attributes: [
                ['time_id', 'id'],
                ['time_start', 'start']
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

    async start(start){
        
        const { calendar, stage, crew, time } = start;

        if(!stage || !stage.id) throw new Error(`stage id is missing`);

        if(!crew || !crew.id) throw new Error(`crew id is missing`);

        if(!calendar || !calendar.id) throw new Error(`calendar id is missing`);

        if(isNaN(time)) throw new Error(`time start is required`);

        let item = await this.findOne({
            stage_id: stage.id, 
            calendar_id: calendar.id, 
            crew_id: crew.id
        });        

        if(item.length==0){
            return await TimeModel.create({
                time_crew_id: crew.id,
                time_stage_id: stage.id,
                time_calendar_id: calendar.id,
                time_start: (dayZero.getTime()+time),
                time_arrival: 0,
                time_partial: 0,
                time_hook: true,
                time_hidden: false
            });
        }else{
            return await TimeModel.update({
                time_crew_id: crew.id,
                time_stage_id: stage.id,
                time_calendar_id: calendar.id,
                time_start: (dayZero.getTime()+time),
                time_arrival: 0,
                time_partial: 0,
                time_hook: true,
            }, {
                where: {
                    [Op.and]:[
                        {time_crew_id: crew.id},
                        {time_stage_id: stage.id},
                        {time_calendar_id: calendar.id},
                    ]
                }
            });
        }

    }

    async arrival(arrival){
        const { calendar, stage, crew, time } = arrival;

        if(!stage || !stage.id) throw new Error(`stage id is missing`);

        if(!crew || !crew.id) throw new Error(`crew id is missing`);

        if(!calendar || !calendar.id) throw new Error(`calendar id is missing`);

        if(isNaN(time)) throw new Error(`time arrival is required`);


        let item = await this.findOne({
            stage_id: stage.id, 
            calendar_id: calendar.id, 
            crew_id: crew.id
        });

        if(item.length==1){
            const { id, start } = item[0].toJSON();
            
            if(!id) throw new Error(`time id is missing`);
            if(!start) throw new Error(`starting time is missing`);

            let partial = (dayZero.getTime() + time) - start;

            if(partial<0) throw new Error(`arrival time is less to starting time`);

            if(!stage.max_delay) throw new Error(`max delay is missing`);

            let hook = partial> stage.max_delay

            return await TimeModel.update({
                time_arrival: (dayZero.getTime()+time) ,
                time_partial: partial,
                time_hook: hook,
            }, {
                where: {
                    time_id: id
                }
            })

        }else{
            throw new Error(`starting register not found`)
        }

    }

    async assign(assign){

        const { calendar, stage, crew, time } = assign;

        if(!stage || !stage.id) throw new Error(`stage id is missing`);

        if(!crew || !crew.id) throw new Error(`crew id is missing`);

        if(!calendar || !calendar.id) throw new Error(`calendar id is missing`);

        if(isNaN(time)) throw new Error(`time assigned is required`);

        let item = await this.findOne({
            stage_id: stage.id, 
            calendar_id: calendar.id, 
            crew_id: crew.id
        });

        if(item.length==1){
            const { id } = item[0].toJSON();
            
            if(!id) throw new Error(`time id is missing`);

            if(!stage.max_delay) throw new Error(`max delay is missing`);

            if(time>stage.max_delay) throw new Error(`assigned time must be less that max delay `);

            return await TimeModel.update({
                time_arrival: 0,
                time_partial: time,
                time_hook: false
            }, {
                where: {
                    time_id: id
                }
            })
            
        }else{
            throw new Error(`starting register not found`)
        }





    }

    async deleteOne(where){
        const { id } = where;

        if(!id) throw new Error(`time id is missing`);

        return await TimeModel.destroy({
            where: {
                time_id: id
            }
        })
    }

    async deleteMany(where){
        const { stage_id } = where;

        if(!stage_id) throw new Error(`stage id is missing`);

        return await TimeModel.destroy({
            where: {
                time_stage_id: stage_id
            }
        })
    }
}

export default new TimeService();