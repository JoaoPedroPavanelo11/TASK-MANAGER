import jwt from 'jsonwebtoken';
import { UserRoleEnum } from './UserRoleEnum.js';

export const autenticarToken = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({error: "Token de autenticação não fornecido"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Armazena as informações do usuário decodificado na requisição
        next();
    }catch{
        res.status(403).json({error: "Token de autenticação inválido"});
    }
};

export const apenasAdmin = (req, res, next)=>{
    if(req.user.role !== UserRoleEnum.ADMIN){
        return res.status(403).json({error: "Acesso negado. Apenas administradores podem acessar esta rota."});
    }
    next();
}
