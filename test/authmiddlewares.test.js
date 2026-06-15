import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { autenticarToken, apenasAdmin } from "../src/middlewares/authmiddlewares.js";
import { UserRoleEnum } from "../src/middlewares/UserRoleEnum.js";
import { createMockResponse } from "./helpers.js";

test("autenticarToken retorna 401 quando o token nao foi enviado", () => {
    const req = { headers: {} };
    const res = createMockResponse();
    let nextCalled = false;

    autenticarToken(req, res, () => {
        nextCalled = true;
    });

    assert.equal(res.statusCode, 401);
    assert.equal(res.body.error, "Token de autenticação não fornecido");
    assert.equal(nextCalled, false);
});

test("autenticarToken popula req.user quando o token e valido", () => {
    process.env.JWT_SECRET = "test-secret";
    const token = jwt.sign({ id: "user-1", role: UserRoleEnum.USER }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = createMockResponse();
    let nextCalled = false;

    autenticarToken(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.equal(req.user.id, "user-1");
    assert.equal(req.user.role, UserRoleEnum.USER);
});

test("apenasAdmin bloqueia usuario comum", () => {
    const req = { user: { role: UserRoleEnum.USER } };
    const res = createMockResponse();
    let nextCalled = false;

    apenasAdmin(req, res, () => {
        nextCalled = true;
    });

    assert.equal(res.statusCode, 403);
    assert.equal(nextCalled, false);
});
