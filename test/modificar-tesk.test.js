import test, { mock } from "node:test";
import assert from "node:assert/strict";
import Task from "../src/model/Tesk.js";
import ModificarTesk from "../src/controller/ModificarTesk.js";
import { createMockResponse } from "./helpers.js";

test("modificarTesk atualiza uma tarefa existente", async () => {
    const task = {
        id: "task-1",
        titulo: "Antigo",
        descricao: "Descricao antiga",
        status: "PENDENTE",
        async update(payload) {
            Object.assign(this, payload);
            return this;
        }
    };

    mock.method(Task, "findByPk", async () => task);

    const req = {
        params: { id: "task-1" },
        body: {
            titulo: "Novo",
            descricao: "Descricao nova",
            status: "CONCLUIDA"
        }
    };
    const res = createMockResponse();

    await ModificarTesk.modificarTesk(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.task.titulo, "Novo");
    assert.equal(res.body.task.status, "CONCLUIDA");
});

test("modificarTesk retorna 404 quando a tarefa nao existe", async () => {
    mock.method(Task, "findByPk", async () => null);

    const req = { params: { id: "task-inexistente" }, body: {} };
    const res = createMockResponse();

    await ModificarTesk.modificarTesk(req, res);

    assert.equal(res.statusCode, 404);
    assert.equal(res.body.message, "Tarefa nao encontrada!");
});
