import express from "express";
import AdminController from "../controller/AdminController.js";
import ModificarTesk from "../controller/ModificarTesk.js";

const routes = express.Router();

routes.get("/usuarios", AdminController.visualizarUsuarios);
routes.get("/tarefas", AdminController.visualizarTarefasUsuario);
routes.patch("/tarefas/:id", ModificarTesk.modificarTesk);
routes.delete("/usuarios/:id", AdminController.deletarUsuario);
routes.put("/usuarios/:id/role", AdminController.alterarRoleUsuario);

export default routes;