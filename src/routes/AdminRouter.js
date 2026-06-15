import express from "express";
import AdminController from "../controller/AdminController.js";
import ModificarTesk from "../controller/ModificarTesk.js";
import { autenticarToken } from "../middlewares/authmiddlewares.js";
import { apenasAdmin } from "../middlewares/authmiddlewares.js";

const routes = express.Router();

routes.get("/usuarios", autenticarToken, apenasAdmin, AdminController.visualizarUsuarios);
routes.get("/tarefas", autenticarToken, apenasAdmin, AdminController.visualizarTarefasUsuario);
routes.patch("/tarefas/:id", autenticarToken, apenasAdmin, ModificarTesk.modificarTesk);
routes.delete("/usuarios/:id", autenticarToken, apenasAdmin, AdminController.deletarUsuario);
routes.put("/usuarios/:id/role", autenticarToken, apenasAdmin, AdminController.alterarRoleUsuario);

export default routes;