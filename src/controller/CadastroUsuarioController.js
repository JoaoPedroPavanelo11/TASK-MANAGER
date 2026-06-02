import bcrypt from "bcrypt";
import User from "../model/User.js";

class CadastroUsuarioController {
    static async cadastrarUsuario(req, res){
        try{
            const {name, email, password}= req.body;

            // Verificação de email
            const usuarioExistente = await User.findOne({ where: { email}});
            if(usuarioExistente){
                return res.status(400).json({ message: "Email já cadastrado!"});
            }

            // Hash da senha
            const senhaHash = await bcrypt.hash(password, 10);

            // Criar Usuario
            const novoUsuario = await User.create({
                name,
                email,
                password: senhaHash
            });
            return res.status(201).json({ message: "Usuario cadastrado com sucesso!",
                usuario: {
                    id: novoUsuario.id,
                    name: novoUsuario.name,
                    email: novoUsuario.email,
                    role: novoUsuario.role
                }
            });

        }catch(error){
            res.status(500).json({ message: "Erro ao cadastrar usuario!", error: error.message})
        };
    };
};
export default CadastroUsuarioController;
