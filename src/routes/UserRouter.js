import express from "express";
import CadastroUsuarioController from "../controller/CadastroUsuarioController.js";
import LoginUsuarioController from "../controller/LoginUsuarioController.js";

const routes = express.Router();

routes.post('/register', CadastroUsuarioController.cadastrarUsuario);
routes.post('/login', LoginUsuarioController.LoginUsuario);


export default routes;