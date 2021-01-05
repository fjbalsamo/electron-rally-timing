//import { TimeModel, CrewModel, CategoryModel, StageModel } from './connection';
//import sequelize, { literal, Op } from 'sequelize';
import stageService from './stage.service'; 
import categoryService from './category.service';
import reportService from './report.service';

const getStages = async (calendar) => {
    let data = await stageService.list(calendar);
    return data.map(d => d.toJSON());
}

const getCategories = async () => {
    let data = await categoryService.listAll();
    return data.map(d => d.toJSON());
}

const getSingleReport = async ({ stages, categories, groupByCategory }) => {
    return await reportService.report({stages, categories, groupByCategory});
};

const getComplexReport = async ({ stages, categories, groupByCategory }) => {
    return await reportService.report({stages, categories, groupByCategory});
};


class LiveService {

    constructor(){}

    async getLiveData(calendar){
        try {

            const stagesArray = await getStages(calendar);
            
            const categoryArray = await getCategories();

            let stagesIDs = stagesArray.map(s => s.id);

            let categoryIDs = categoryArray.map(c => c.id);

            let data = stagesIDs.map(async (s, i) => {
                
                return {
                    stage: stagesArray[i],
                    times: {
                        here: {
                            all: await reportService.report({
                                stages: [s],
                                categories: categoryIDs,
                                groupByCategory: false
                            }),
                            groupped: await reportService.report({
                                stages: [s],
                                categories: categoryIDs,
                                groupByCategory: true
                            })
                        },
                        until_here: {
                            all: await reportService.report({
                                stages: stagesIDs.filter((f, fi) => fi<=i),
                                categories: categoryIDs,
                                groupByCategory: false
                            }),
                            groupped: await reportService.report({
                                stages: stagesIDs.filter((f, fi) => fi<=i),
                                categories: categoryIDs,
                                groupByCategory: true
                            }),
                        }
                    }
                }

            })


            let promises = await Promise.all(data);
           

            return {
                calendar,
                classes: categoryArray,
                data: promises,
                error: false
            }
        } catch (error) {
            console.error(error);
            return {
                calendar,
                classes: [],
                data: [],
                error: true
            }
        }
    }

}

export default new LiveService();