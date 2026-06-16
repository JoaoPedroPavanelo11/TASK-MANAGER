import express from 'express';
import controladorDeTesk from '../controller/ControllerTesk.js';
import ModificarTesk from '../controller/ModificarTesk.js';
import { verificaProprietarioTarefa } from '../middlewares/authmiddlewares.js';
import { autenticarToken } from '../middlewares/authmiddlewares.js';

const routes = express.Router();

routes.post('/', autenticarToken, controladorDeTesk.criarTesk); // cria tarefa
routes.delete('/:id', autenticarToken, verificaProprietarioTarefa, controladorDeTesk.excluirTesk); // deleta tarefa
routes.patch('/atualiza/:id', autenticarToken, verificaProprietarioTarefa, ModificarTesk.modificarTesk); // atualiza tarefa



export default routes;