import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  provider: { type: DataTypes.STRING, defaultValue: "local" }, 
  googleId: { type: DataTypes.STRING },
  facebookId: { type: DataTypes.STRING },
  photo: { type: DataTypes.STRING },
}, {
  timestamps: true
});

export default User;
