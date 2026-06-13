import User from "../model/User.js";
import Tesk from "../model/Tesk.js";
import { UserRoleEnum } from "../middlewares/UserRoleEnum.js";

class AdminController{

    // Visualizar todos os usuarios
    static async visualizarUsuarios(req, res){
        try{
            const usuarios = await User.findAll({
                attributes: {exclude: ["password"]} // Nao ira mostrar as senhas dos usuarios
            });
            res.status(200).json({ usuarios});
        }catch(error){
            res.status(500).json({error: error.message});
        };
    };

    // Visualizar as tarefas de um usuario
    static async visualizarTarefasUsuario(req, res){
        try{
            const filtroTarefas = req.user.role === UserRoleEnum.ADMIN
                ? {}
                : { where: { UserId: req.user.id } };

            const tasks = await Tesk.findAll({
                ...filtroTarefas,
                include: {
                    model: User,
                    attributes: ["id", "name", "email"] // Ira mostrar os dados do criador da tarefa
                }
            })
            res.status(200).json({ tasks});
        }catch(error){
            res.status(500).json({error: error.message});
        };
    };

    // Deletar um Usuario
    static async deletarUsuario(req, res){
        try{
            const usuario = await User.findByPk(req.params.id);
            if(!usuario){
                return res.status(404).json({message: "Usuario nao encontrado!"});
            }
            await usuario.destroy();
            res.status(200).json({message: "Usuario deletado com sucesso!"});
        }catch(error){
            res.status(500).json({error: error.message});
        };
    };

    // Alterar role de um usuario
    static async alterarRoleUsuario(req, res){
        try{
            const { role } = req.body;
            const usuario = await User.findByPk(req.params.id);

            if(!usuario){
                return res.status(404).json({message: "Usuario nao encontrado!"});
            }
            await usuario.update({ role });
            res.status(200).json({ message: "Role do usuario atualizado com sucesso!",
                usuario: {
                    id: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                    role: usuario.role
                }
            });
        }catch(error){
            res.status(500).json({error: error.message});
        };
    };
};
export default AdminController;
