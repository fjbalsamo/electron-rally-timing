import { CalendarModel } from './connection';
import { v4 as uuidv4 } from 'uuid';

/**

    calendar_id:
    calendar_number: 
    calendar_name: 
    calendar_location: 
    calendar_from: 
    calendar_to: 

 */

class CalendarService {
    
    constructor(){}

    async save(item){

        const { number, name, location,  from, to } = item;

        if(!number) throw new Error(`calendar number is required`);
        
        if(!name) throw new Error(`calendar name is required`);

        if(!location) throw new Error(`calendar location is required`);

        if(!from) throw new Error(`date from is required`);

        if(!to) throw new Error(`date to is required`);

        const dateFrom = new Date(from);
        const dateTo = new Date(to);

        if(!(dateTo.getTime()>=dateFrom.getTime())) throw new Error(`date range is wrong`);

        return await CalendarModel.create({
            calendar_number: number,
            calendar_name: name.trim().toLowerCase(),
            calendar_location: location.trim().toLowerCase(),
            calendar_from: from,
            calendar_to: to,
            calendar_uuid: uuidv4()
        });

    }

    async update(item){

        const { id, number, name, location,  from, to } = item;

        if(!id) throw new Error(`calendar id is missing`);
        
        if(!number) throw new Error(`calendar number is required`);
        
        if(!name) throw new Error(`calendar name is required`);

        if(!location) throw new Error(`calendar location is required`);

        if(!from) throw new Error(`date from is required`);

        if(!to) throw new Error(`date to is required`);

        const dateFrom = new Date(from);
        const dateTo = new Date(to);

        if(!(dateTo.getTime()>=dateFrom.getTime())) throw new Error(`date range is wrong`);

        return await CalendarModel.update({
            calendar_number: number,
            calendar_name: name.trim().toLowerCase(),
            calendar_location: location.trim().toLowerCase(),
            calendar_from: from,
            calendar_to: to
        }, {
            where: {
                calendar_id: id
            }
        });

    }

    async updateUUID(calendar){
        const { id, uuid } = calendar;

        if(!id) throw new Error(`calendar id is missing`);

        if(!uuid) throw new Error(`calendar uuid is missing`);

        return await CalendarModel.update({
            calendar_uuid: uuid
        }, {
            where: {
                calendar_id: id
            }
        })
    }

    async delete(item){

        const { id } = item;

        if(!id) throw new Error(`calendar id is missing`);

        return await CalendarModel.destroy({
            where: {
                calendar_id: id
            }
        });
    }

    async listAll(){
        return await CalendarModel.findAll({
            attributes: [
                ['calendar_id', 'id'],
                ['calendar_from', 'from'],
                ['calendar_location', 'location'],
                ['calendar_name', 'name'],
                ['calendar_number', 'number'],
                ['calendar_to', 'to'],
                ['calendar_uuid', 'uuid']
            ],
            order: [
                ['calendar_from', 'ASC'],
                ['calendar_number', 'ASC'],
            ]
        })
    }
}

export default new CalendarService();