import { DataTypes } from "sequelize";
import sequelize from "../config/DataBaseConfig.js";

const Task = sequelize.define("Tasks", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"),
        defaultValue: "PENDENTE",
        allowNull: false // allowNull: false garante que o campo seja obrigatório
    },
    dataTask: {
        type: DataTypes.DATEONLY, // DATEONLYU armaze apenas a data, sem a parte de tempo
        allowNull: true // allowNull: true permite que o campo seja opcional
    }
})
export default Task;