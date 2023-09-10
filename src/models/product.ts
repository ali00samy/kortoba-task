import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../utils/db';
import User from './user';

class Product extends Model {
    public id!: CreationOptional<number>;
    public title!: string;
    public price!: number;
    public image!: string;
    public userId!: number;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
    }
    },
    {
        modelName: 'Product',
        sequelize,
        timestamps: false
    }
);

Product.belongsTo(User, { foreignKey: 'userId' });

export default Product;