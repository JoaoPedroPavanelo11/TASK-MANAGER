import test, { mock } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcrypt";
import User from "../src/model/User.js";
import CadastroUsuarioController from "../src/controller/CadastroUsuarioController.js";
import LoginUsuarioController from "../src/controller/LoginUsuarioController.js";
import { createMockResponse } from "./helpers.js";

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
