import { DataTypes } from "sequelize";
import sequelize from "../config/DataBaseConfig.js";    

const User = sequelize.define("Users", {
    id: {
        type: DataTypes.UUID, // Define o tipo como UUID
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false // allowNull: false garante que o campo seja obrigatório
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garante que o email seja único
        validate:{
            isEmail: true // Valida se o valor é um email válido
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("USER", "ADMIN"),
        defaultValue: "USER", // Define o valor padrão como "USER"
        allowNull: false
    }
})
export default User;