import { Model, DataTypes, CreationOptional } from "sequelize";
import sequelize from "../utils/db";

class User extends Model {
  public id!: CreationOptional<number>;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "User",
    sequelize,
    timestamps: false,
  }
);

export default User;
