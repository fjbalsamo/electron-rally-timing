import { Sequelize, DataTypes } from 'sequelize';
import { createHomeFolder, SQLITE_DB_PATH } from '../../util/file.util';

const sqlite3 = require('sqlite3').verbose();

createHomeFolder();

export const connection = new Sequelize({
    dialectModule: sqlite3,
    dialect: 'sqlite',
    storage: SQLITE_DB_PATH
});


export const ChampionshipModel = connection.define('championship', {
    championship_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    championship_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    championship_priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export const CategoryModel = connection.define('category', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category_type: {
        type: DataTypes.TEXT,
        defaultValue: 'car'
    },
    category_priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});


export const CrewModel = connection.define('crew', {
    crew_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    crew_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    crew_location: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    crew_number: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    crew_vehicle: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

export const CalendarModel = connection.define('calendar', {

    calendar_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    calendar_number: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    calendar_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    calendar_location: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    calendar_from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    calendar_to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    calendar_uuid: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    
});

export const StageModel = connection.define('stage', {
    
    stage_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    stage_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    stage_day: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    stage_priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stage_max_delay: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stage_long: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }

});

export const TimeModel = connection.define('time', {
    time_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    time_start: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time_arrival: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    time_partial: {
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    time_hook: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    time_hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    time_penalty_race:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    time_penalty_control:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    time_penalty_description:{
        type: DataTypes.TEXT,
        defaultValue: '[]'
    },
    total_simple: {
        type: DataTypes.VIRTUAL,
        get(){
            return (this.getDataValue('time_partial') 
            + this.getDataValue('time_penalty_race'));
        }
    },
    total_complex: {
        type: DataTypes.VIRTUAL,
        get(){
            return (this.getDataValue('time_partial') 
            + this.getDataValue('time_penalty_race') 
            + this.getDataValue('time_penalty_control'));
        }
    },
    total_penalty: {
        type: DataTypes.VIRTUAL,
        get(){
            return (this.getDataValue('time_penalty_race') 
            + this.getDataValue('time_penalty_control'));
        }
    }
});

CategoryModel.belongsTo(ChampionshipModel, {
    foreignKey: 'category_championship_id'
});

CrewModel.belongsTo(CategoryModel, {
    foreignKey: 'crew_category_id'
});

StageModel.belongsTo(CalendarModel, {
    foreignKey: 'stage_calendar_id'
});

TimeModel.belongsTo(CalendarModel, {
    foreignKey: 'time_calendar_id',
});

TimeModel.belongsTo(StageModel, {
    foreignKey: 'time_stage_id',
});

TimeModel.belongsTo(CrewModel, {
    foreignKey: 'time_crew_id',
})