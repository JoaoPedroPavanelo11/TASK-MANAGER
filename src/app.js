import express from "express";
import sequelize from "./config/DataBaseConfig.js";
import router from "./routes/index.js";
import cors from "cors";

// Importação dos modelos para garantir que as tabelas sejam criadas
import User from "./model/User.js";
import Task from "./model/Tesk.js"

User.hasMany(Task);
Task.belongsTo(User);


// Conexão com o banco de dados
sequelize
    .authenticate()
    .then(() =>{
        console.log("Conexao com o banco de dados feita!");
        return sequelize.sync({ alter: true }) // Comando para criar as tabelas do banco
    })
    .catch((error) =>{
        console.error("Erro ao conectar com o banco de dados:", error);
    });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));
router(app);


export default app;
