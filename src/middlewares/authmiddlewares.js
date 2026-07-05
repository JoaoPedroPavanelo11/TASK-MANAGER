import jwt from 'jsonwebtoken';
import { UserRoleEnum } from './UserRoleEnum.js';
import Task from '../model/Tesk.js';

export const autenticarToken = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1]; // função para extrair o header e depois dividilos em um array e pegar o token que é a segunda posição do array

    if(!token){
        return res.status(401).json({error: "Token de autenticação não fornecido"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET,{
            algorithms: ['HS256']
        });
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

export const verificaProprietarioTarefa = async(req, res, next)=>{
    try{
        const task = await Task.findByPk(req.params.id);

        if(!task){ // Verifica se a tarefa existe
            return res.status(404).json({
                message: "Tarefa nao encontrada!"
            });        
        }

        if(task.UserId !== req.user.id){ // Verifica se o usuario que esta mandando requisição tem o mesmo id do criador da tarefa
            return res.status(403).json({
                message: "Voce nao tem permissao para acessar a tarefa!"
            });
        }

        req.task = task;
        next();
    }catch(error){
        return res.status(500).json({
            message:"Erro ao verificar o proprietario da tarefa!",
            error: error.message
        })
    }
}


