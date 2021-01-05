import { CrewModel, CategoryModel, ChampionshipModel } from './connection';

class CrewService {
    
    constructor(){}

    async save(item){
        
        const { category_id, name, location, number, vehicle } = item;

        if(!category_id) throw new Error(`class id is missing`);

        if(!name) throw new Error(`crew name is required`);

        if(!location) throw new Error(`crew location is required`);

        if(!number) throw new Error(`crew number is required`);

        if(!vehicle) throw new Error(`vehicle mark is required`);

        return await CrewModel.create({
            crew_name: name.trim().toLowerCase(),
            crew_location: location.trim().toLowerCase(),
            crew_number: number,
            crew_vehicle: vehicle.trim().toLowerCase(),
            crew_category_id: category_id
        })

    }

    async update(item){

        const { id, category_id, name, location, number, vehicle } = item;

        if(!id) throw new Error(`crew id is missing`);

        if(!category_id) throw new Error(`class id is missing`);

        if(!name) throw new Error(`crew name is required`);

        if(!location) throw new Error(`crew location is required`);

        if(!number) throw new Error(`crew number is required`);

        if(!vehicle) throw new Error(`vehicle mark is required`);

        return await CrewModel.update({
            crew_name: name.trim().toLowerCase(),
            crew_location: location.trim().toLowerCase(),
            crew_number: number,
            crew_vehicle: vehicle.trim().toLowerCase(),
            crew_category_id: category_id
        }, {
            where: {
                crew_id: id
            }
        })
    }

    async delete(item){

        const { id } = item;

        if(!id) throw new Error(`crew id is missing`);

        return await CrewModel.destroy({
            where: {
                crew_id: id
            }
        });
    }

    async listAll(){

        return await CrewModel.findAll({
            include: {
                model: CategoryModel,
                attributes: [
                    ['category_id', 'id'],
                    ['category_championship_id', 'championship_id'],
                    ['category_name', 'name'],
                    ['category_priority', 'priority'],
                ],
                as: 'category',
                include: {
                    model: ChampionshipModel,
                    attributes: [
                        ['championship_id', 'id'],
                        ['championship_name', 'name'],
                        ['championship_priority', 'priority']
                    ],
                    as: 'championship'
                }
            },
            attributes: [
                ['crew_id', 'id'],
                ['crew_category_id', 'category_id'],
                ['crew_location', 'location'],
                ['crew_name', 'name'],
                ['crew_number', 'number'],
                ['crew_vehicle', 'vehicle'],
            ],
            order: [
                ['category', 'category_priority', 'ASC'],
                ['crew_number', 'ASC'],
            ]
        })

    }

    async findByNumber(item){
        
        const { number } = item;
        
        if(!number) throw new Error(`crew number is required`);

        return await CrewModel.findAll({
            include: {
                model: CategoryModel,
                attributes: [
                    ['category_id', 'id'],
                    ['category_championship_id', 'championship_id'],
                    ['category_name', 'name'],
                    ['category_priority', 'priority'],
                ],
                as: 'category',
                include: {
                    model: ChampionshipModel,
                    attributes: [
                        ['championship_id', 'id'],
                        ['championship_name', 'name'],
                        ['championship_priority', 'priority']
                    ],
                    as: 'championship'
                }
            },
            attributes: [
                ['crew_id', 'id'],
                ['crew_category_id', 'category_id'],
                ['crew_location', 'location'],
                ['crew_name', 'name'],
                ['crew_number', 'number'],
                ['crew_vehicle', 'vehicle'],
            ],
            where: {
                crew_number: number
            }
        })
    }
}

export default new CrewService();