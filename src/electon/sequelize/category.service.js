import { CategoryModel, ChampionshipModel } from './connection';

class CategoryService {

    constructor(){}

    async save(item){
        const { championship_id, name, priority, type } = item;

        if(isNaN(championship_id)) throw new Error(`championship id is missing`);

        if(isNaN(priority)) throw new Error(`class priority is required`);

        if(!name) throw new Error(`class name is required`);

        if(!type) throw new Error(`class type is required`);

        let res = await CategoryModel.create({
            category_name: name.trim().toLowerCase(),
            category_priority: priority,
            category_championship_id: championship_id,
            category_type: type
        })

        return res;
    }

    async update(item){

        const { id, championship_id, name, priority, type } = item;

        if(isNaN(id)) throw new Error(`class id is missing`);

        if(isNaN(championship_id)) throw new Error(`championship id is missing`);

        if(isNaN(priority)) throw new Error(`class priority is required`);

        if(!name) throw new Error(`class name is required`);

        if(!type) throw new Error(`class type is required`);

        let res = await CategoryModel.update({
            category_name: name.trim().toLowerCase(),
            category_priority: priority,
            category_championship_id: championship_id,
            category_type: type
        }, {
            where: {
                category_id: id
            }
        })

        return res;
    }

    async delete(item){
        const { id } = item;

        if(isNaN(id)) throw new Error(`class id is missing`);

        let res = await CategoryModel.destroy({
            where: {
                category_id: id
            }
        })

        return res;
    }

    async listAll(){

        return await CategoryModel.findAll({
            attributes: [
                ['category_id', 'id'],
                ['category_championship_id', 'championship_id'],
                ['category_name', 'name'],
                ['category_priority', 'priority'],
                ['category_type', 'type']
            ],
            include: {
                model: ChampionshipModel,
                attributes: [
                    ['championship_id', 'id'],
                    ['championship_name', 'name'],
                    ['championship_priority', 'priority']
                ],
                as: 'championship'
            },
            order: [
                ['championship', 'championship_priority', 'ASC'],
                ['category_priority', 'ASC'],
            ]
        })
    }
}

export default new CategoryService();