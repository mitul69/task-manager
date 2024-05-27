import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TaskAttributes {
    id: number;
    title: string;
    description?: string;
    status: 'To Do' | 'In Progress' | 'Done';
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> { }

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: 'To Do' | 'In Progress' | 'Done';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
            defaultValue: 'To Do',
        },
    },
    {
        sequelize,
        tableName: 'tasks',
    }
);

export default Task;
