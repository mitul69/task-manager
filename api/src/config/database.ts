import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('task_manager', 'root', 'Weavolve!23', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
