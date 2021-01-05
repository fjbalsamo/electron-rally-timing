import { ChampionshipModel } from './connection';

class ChampionshipService {
    
    constructor(){}

    async save(item){
        
        const { name, priority } = item;

        if(!name) throw new Error(`championship name is required`);

        if(isNaN(priority)) throw new Error(`championship priority is required`);

        let save = await ChampionshipModel.create({
            championship_name: name.trim().toLowerCase(),
            championship_priority: parseInt(priority)
        });

        return save;
    }
    

    async listAll(){
        
        let list = await ChampionshipModel.findAll({
            attributes: [
                ['championship_id', 'id'],
                ['championship_name', 'name'],
                ['championship_priority', 'priority']
            ],
            order: [
                ['championship_priority', 'ASC']
            ]
        })

        return list;
    }

    async update(item){
        
        const { id, name, priority } = item;

        if(!id) throw new Error(`championship id is missing`);
        
        if(!name) throw new Error(`championship name is required`);

        if(isNaN(priority)) throw new Error(`championship priority is required`);

        let update = await ChampionshipModel.update({
            championship_name: name.trim().toLowerCase(),
            championship_priority: parseInt(priority)
        }, {
            where: {
                championship_id: id
            }
        });

        return update;
    }

    async delete(item){
        
        const { id } = item;

        if(!id) throw new Error(`championship id is missing`);

        let update = await ChampionshipModel.destroy({
            where: {
                championship_id: id
            }
        })

        return update;
    }

}

export default new ChampionshipService();