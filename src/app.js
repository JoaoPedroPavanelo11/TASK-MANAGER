import express from "express";
import sequelize from "./config/DataBaseConfig.js";

// Conexão com o banco de dados
sequelize
    .authenticate()
    .then(() =>{
        console.log("Conexao com o banco de dados feita!");
    })
    .catch((error) =>{
        console.error("Erro ao conectar com o banco de dados:", error);
    });

const app = express();

app.use(express.json());
export default app;