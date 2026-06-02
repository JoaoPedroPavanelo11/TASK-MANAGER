import express from "express";
import adminRouter from "./AdminRouter.js";
import UserRouter from "./UserRouter.js";


const router = (app) =>{
    app.get('/', (req, res) =>{
        res.send("Bem-vindo a API de Tarefas!");
    })
    app.use('/admin', adminRouter);
    app.use('/usuario', UserRouter);
}
export default router;
