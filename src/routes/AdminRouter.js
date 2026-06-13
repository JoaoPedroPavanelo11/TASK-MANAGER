import express from "express";
import AdminController from "../controller/AdminController.js";
import ModificarTesk from "../controller/ModificarTesk.js";
import { autenticarToken } from "../middlewares/authmiddlewares.js";

const routes = express.Router();

routes.get("/usuarios", AdminController.visualizarUsuarios);
routes.get("/tarefas", autenticarToken, AdminController.visualizarTarefasUsuario);
routes.patch("/tarefas/:id", autenticarToken, ModificarTesk.modificarTesk);
routes.delete("/usuarios/:id", autenticarToken, AdminController.deletarUsuario);
routes.put("/usuarios/:id/role", autenticarToken, AdminController.alterarRoleUsuario);

export default routes;