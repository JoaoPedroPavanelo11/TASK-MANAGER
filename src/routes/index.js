import express from "express";
import adminRouter from "./AdminRouter.js";
import CadastroUsuarioController from "../controller/CadastroUsuarioController.js";
import LoginUsuarioController from "../controller/LoginUsuarioController.js";

const router = (app) =>{
    app.get('/', (req, res) =>{
        res.send("Bem-vindo a API de Tarefas!");
    })
    app.use('/admin', adminRouter);
    app.post('/register', CadastroUsuarioController.cadastrarUsuario);
    app.post('/login', LoginUsuarioController.LoginUsuario);
}
export default router;
