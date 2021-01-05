import { Op } from 'sequelize';
import { StageModel } from './connection';

class StageService {

    constructor(){}

    async save(item){

        const { calendar_id, name, day, priority, max_delay, long } = item;

        if(!calendar_id) throw new Error(`calendar id is missing`);

        if(!name) throw new Error(`stage name is required`);

        if(!day) throw new Error(`stage day is required`);

        if(!priority) throw new Error(`stage number is required`);

        if(!max_delay) throw new Error(`max delay is required`);

        if(!long) throw new Error(`stage long is required`);

        return await StageModel.create({
            stage_calendar_id: calendar_id,
            stage_name: name.trim().toLowerCase(),
            stage_day: day,
            stage_priority:priority,
            stage_max_delay: max_delay,
            stage_long: long
        })

    }

    async update(item){
        const { id, name, day, priority, max_delay, long } = item;

        if(!id) throw new Error(`stage id is missing`);

        if(!name) throw new Error(`stage name is required`);

        if(!day) throw new Error(`stage day is required`);

        if(!priority) throw new Error(`stage number is required`);

        if(!max_delay) throw new Error(`max delay is required`);

        if(!long) throw new Error(`stage long is required`);

        return await StageModel.update({
            stage_name: name.trim().toLowerCase(),
            stage_day: day,
            stage_priority:priority,
            stage_max_delay: max_delay,
            stage_long: long
        }, {
            where: {
                stage_id: id
            }
        })
    }

    async delete(item){
        const { id } = item;

        if(!id) throw new Error(`stage id is missing`);

        return await StageModel.destroy({
            where: {
                stage_id: id
            }
        })
    }

    async list(calendar){
        const { id } = calendar;

        if(!id) throw new Error(`stage id is missing`);

        return await StageModel.findAll({
            attributes: [
                ['stage_id', 'id'],
                ['stage_calendar_id', 'calendar_id'],
                ['stage_day', 'day'],
                ['stage_long', 'long'],
                ['stage_max_delay', 'max_delay'],
                ['stage_name', 'name'],
                ['stage_priority', 'priority'],
            ],
            order: [
                ['stage_day', 'ASC'],
                ['stage_priority', 'ASC'],
            ]
        })
    }

    async one(where){
        const { calendar_id, priority } = where;

        if(!calendar_id) throw new Error(`calendar id is missing`);

        if(!priority) throw new Error(`stage number is required`);

        return await StageModel.findAll({
            attributes: [
                ['stage_id', 'id'],
                ['stage_calendar_id', 'calendar_id'],
                ['stage_day', 'day'],
                ['stage_long', 'long'],
                ['stage_max_delay', 'max_delay'],
                ['stage_name', 'name'],
                ['stage_priority', 'priority'],
            ],
            where: {
                [Op.and]: [
                    {stage_calendar_id: calendar_id},
                    {stage_priority: priority}
                ]
            }
        })
    }
}

export default new StageService();