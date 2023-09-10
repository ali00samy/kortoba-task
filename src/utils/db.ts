import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';

const sequelize = new Sequelize('kortoba_task', 'root', config.db_pass , {dialect:'mysql'})

export default sequelize;