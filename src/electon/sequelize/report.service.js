import { TimeModel, CrewModel, CategoryModel, StageModel } from './connection';
import { literal, Op } from 'sequelize';
import { addReportFormat, addReportFormatGrouped } from '../../util/report.util';

class ReportService {

    constructor(){}

    async report(data){
        const { stages, categories, groupByCategory } = data;

        if(!stages) throw new Error(`stages array is missing`);

        if(stages.length==0) throw new Error(`stages array is empty`);

        if(!categories) throw new Error(`categories array is missing`);

        if(categories.length==0) throw new Error(`categories array is empty`);

        let response = []

        if(stages.length==1){
            response = await this.simple(stages[0], categories);
        }else{
            let complex =  await this.complex(stages, categories);

            response = complex.filter(e => e.stageCount == stages.length )
        }

        if(groupByCategory){
            return addReportFormatGrouped(response, categories);            
        }else{
            return addReportFormat(response);
        }
        
    }

    async simple(stage_id, categories){
        const rows = await TimeModel.findAll({
            attributes: [
                ['time_partial', 'partial'],
                ['time_penalty_race', 'penalty'],
                [literal('(`time`.`time_partial` + `time`.`time_penalty_race`)'), 'total']
            ],
            include: [
                {
                    model: StageModel,
                    as: 'stage',
                    attributes: [ 
                        ['stage_long', 'long']
                    ]
                },
                {
                    model: CrewModel,
                    as: 'crew',
                    attributes: [
                        ['crew_id', 'id'],
                        ['crew_location', 'location'],
                        ['crew_name', 'name'],
                        ['crew_number', 'number'],
                        ['crew_vehicle', 'vehicle'],
                    ],
                    include: [
                        {
                            model: CategoryModel,
                            as: 'category',
                            attributes: [
                                ['category_id', 'id'],
                                ['category_name', 'name'],
                                ['category_priority', 'priority'],
                            ]
                        }
                    ],
                    where: [
                        { crew_category_id: { [Op.in]: categories } }
                    ]
                },
            ],
            where: {
                [Op.and]: [
                    { time_stage_id: stage_id },
                    { time_hook: false },
                    { time_hidden: false },
                    { time_partial: { [Op.gt]: 0 } }
                ]
            },
            order: [
                [literal(`total`), 'ASC'],
                ['time_partial', 'ASC'],
                ['time_start', 'ASC'],
            ]
        });

        return rows.map(r => r.toJSON());
    }

    async complex(stages, categories){

        const rows = await TimeModel.findAll({
            attributes: [
                [literal('SUM(`time`.`time_partial`)'), 'partial'],
                [literal('(SUM(`time`.`time_penalty_race`)+SUM(`time`.`time_penalty_control`))'), 'penalty'],
                [literal('(SUM(`time`.`time_penalty_race`)+SUM(`time`.`time_penalty_control`)+SUM(`time`.`time_partial`))'), 'total'],
                [literal('COUNT(`time`.`time_id`)'), 'stageCount']
            ],
            include: [
                {
                    model: StageModel,
                    as: 'stage',
                    attributes: [ 
                        [literal('SUM(`stage`.`stage_long`)'), 'long']
                    ],
                    where: [
                        { stage_id: { [Op.in]: stages } }
                    ]
                },
                {
                    model: CrewModel,
                    as: 'crew',
                    attributes: [
                        ['crew_id', 'id'],
                        ['crew_location', 'location'],
                        ['crew_name', 'name'],
                        ['crew_number', 'number'],
                        ['crew_vehicle', 'vehicle'],
                    ],
                    include: [
                        {
                            model: CategoryModel,
                            as: 'category',
                            attributes: [
                                ['category_id', 'id'],
                                ['category_name', 'name'],
                                ['category_priority', 'priority'],
                            ]
                        }
                    ],
                    where: [
                        { crew_category_id: { [Op.in]: categories } }
                    ]
                },
            ],
            where: {
                time_hook: false,
                time_hidden:false,
                time_partial: { [Op.gt]: 0 }
            },
            order: [
                [literal(`total`), 'ASC'],
                [literal('partial'), 'ASC'],
                ['time_start', 'ASC'],
            ],
            group: [
                'time_crew_id'
            ]
        });

        return rows.map(r => r.toJSON());

    }


    async documentControl(calendar){

        const { id } = calendar;

        if(!id) throw new Error(`calendar id is missing`);

        const rows = await  TimeModel.findAll({
            attributes: [
                ['time_id', 'id'],
                ['time_stage_id', 'stage_id'],
                ['time_start', 'start'],
                ['time_arrival', 'arrival'],
                ['time_partial', 'partial'],
                ['time_hook', 'hook'],
                ['time_penalty_race', 'penalty_race'],
                ['time_penalty_control', 'penalty_control'],
            ],
            include: [
                {
                    model: CrewModel,
                    as: 'crew',
                    attributes: [
                        ['crew_number', 'number'],
                    ],
                    include: [
                        {
                            model: CategoryModel,
                            as: 'category',
                            attributes: [
                                ['category_name', 'name'],
                            ]
                        }
                    ]
                },
                {
                    model: StageModel,
                    as: 'stage',
                    attributes: [
                        ['stage_priority', 'priority'],
                    ]
                }
            ],
            where: {
                time_calendar_id: id
            },
            order: [
                ['time_start', 'ASC']
            ]
        });

        return rows.map(r => r.toJSON());       

    }
}

export default new ReportService();