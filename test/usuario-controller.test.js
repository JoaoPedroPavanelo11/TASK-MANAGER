import test, { mock } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcrypt";
import User from "../src/model/User.js";
import CadastroUsuarioController from "../src/controller/CadastroUsuarioController.js";
import LoginUsuarioController from "../src/controller/LoginUsuarioController.js";
import { createMockResponse } from "./helpers.js";
import Task from "../src/model/Tesk.js";
import { verificaProprietarioTarefa } from "../src/middlewares/authmiddlewares.js";

test("cadastrarUsuario cria usuario sem retornar a senha", async () => {
    const novoUsuario = {
        id: "user-1",
        name: "Joao",
        email: "joao@email.com",
        role: "USER"
    };

    mock.method(User, "findOne", async () => null);
    mock.method(User, "create", async (payload) => {
        assert.equal(payload.name, "Joao");
        assert.equal(payload.email, "joao@email.com");
        assert.notEqual(payload.password, "123456");
        return novoUsuario;
    });

    const req = { body: { name: "Joao", email: "joao@email.com", password: "123456" } };
    const res = createMockResponse();

    await CadastroUsuarioController.cadastrarUsuario(req, res);

    assert.equal(res.statusCode, 201);
    assert.equal(res.body.usuario.email, "joao@email.com");
    assert.equal(res.body.usuario.password, undefined);
});

test("cadastrarUsuario remove espacos do nome e normaliza email antes de salvar", async () => {
    const novoUsuario = {
        id: "user-1",
        name: "Joao",
        email: "joao@email.com",
        role: "USER"
    };

    mock.method(User, "findOne", async (query) => {
        assert.deepEqual(query, { where: { email: "joao@email.com" } });
        return null;
    });
    mock.method(User, "create", async (payload) => {
        assert.equal(payload.name, "Joao");
        assert.equal(payload.email, "joao@email.com");
        return novoUsuario;
    });

    const req = { body: { name: "  Joao  ", email: "  JOAO@EMAIL.COM  ", password: "123456" } };
    const res = createMockResponse();

    await CadastroUsuarioController.cadastrarUsuario(req, res);

    assert.equal(res.statusCode, 201);
    assert.equal(res.body.usuario.name, "Joao");
    assert.equal(res.body.usuario.email, "joao@email.com");
});

test("cadastrarUsuario retorna 400 quando nome esta vazio", async () => {
    const findOneMock = mock.method(User, "findOne", async () => null);
    const createMock = mock.method(User, "create", async () => ({}));

    const req = { body: { name: "   ", email: "joao@email.com", password: "123456" } };
    const res = createMockResponse();

    await CadastroUsuarioController.cadastrarUsuario(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, "Nome invalido!");
    assert.equal(findOneMock.mock.callCount(), 0);
    assert.equal(createMock.mock.callCount(), 0);
});

test("cadastrarUsuario retorna 400 quando email e invalido", async () => {
    const findOneMock = mock.method(User, "findOne", async () => null);
    const createMock = mock.method(User, "create", async () => ({}));

    const req = { body: { name: "Joao", email: "email-invalido", password: "123456" } };
    const res = createMockResponse();

    await CadastroUsuarioController.cadastrarUsuario(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, "Email invalido!");
    assert.equal(findOneMock.mock.callCount(), 0);
    assert.equal(createMock.mock.callCount(), 0);
});

test("cadastrarUsuario retorna 400 quando email ja existe", async () => {
    mock.method(User, "findOne", async () => ({ id: "user-1" }));

    const req = { body: { name: "Joao", email: "joao@email.com", password: "123456" } };
    const res = createMockResponse();

    await CadastroUsuarioController.cadastrarUsuario(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, "Email já cadastrado!");
});

test("LoginUsuario retorna token para credenciais validas", async () => {
    process.env.JWT_SECRET = "test-secret";
    const passwordHash = await bcrypt.hash("123456", 4);

    mock.method(User, "findOne", async () => ({
        id: "user-1",
        role: "USER",
        password: passwordHash
    }));

    const req = { body: { email: "joao@email.com", password: "123456" } };
    const res = createMockResponse();

    await LoginUsuarioController.LoginUsuario(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(typeof res.body.token, "string");
});

test("cadastrarUsuario retorna 400 quando a senha nao foi enviada", async () => {
    const req = {
        body: {
            name: "Joao",
            email: "joao@gmail.com"
        }
    };

    const res = createMockResponse();

    await CadastroUsuarioController.cadastrarUsuario(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, "Senha invalida!");
});

test("Caso a senha nao é enviada o controller nao chama o banco", async () => {
    const findOneMock = mock.method(User, "findOne", async () => null); // confere todos usuarios
    const createMock = mock.method(User, "create", async () => ({})); // confere a criação de usuario

    const req = {
        body: {
            name: "Joao",
            email: "joao@gmail.com"
        }
    }

    const res = createMockResponse();

    await CadastroUsuarioController.cadastrarUsuario(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, "Senha invalida!");
    assert.equal(findOneMock.mock.callCount(), 0); // chama o metodo para conferir novamente
    assert.equal(createMock.mock.callCount(), 0);
});

test("Quando a tarefa nao existe, deve retornar 404", async ()=>{
    mock.method(Task, "findByPk", async()=> null);

    const req ={
        params: {
            id: "task-1"
        },
        user: {
            id: "user-1"
        }
    }

    const res = createMockResponse();

    let nextCalled = false;
    const next = () => {
        nextCalled = true;
    }

    await verificaProprietarioTarefa(req, res, next);

    assert.equal(res.statusCode, 404);
    assert.equal(res.body.message, "Tarefa nao encontrada!");
    assert.equal(nextCalled, false);
}) 