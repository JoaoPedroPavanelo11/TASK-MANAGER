import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginUsuarioController {
    static async LoginUsuario(req, res){
        try{
            const {email, password} = req.body;

            // Verificar o email do usuario
            const usuario = await User.findOne({ where: {email}});
            if(!usuario){
                return res.status(400).json({ message: "Email ou senha invalidos!"});
            }

            // Verificar a senha do usuario
            const senhaValida = await bcrypt.compare(password, usuario.password);
            if(!senhaValida){
                return res.status(400).json({ message: "Email ou senha invalidos!"});
            }

            // Gerar token JWT
            const token = jwt.sign(
                {id: usuario.id, role: usuario.role},
                process.env.JWT_SECRET,
                { expiresIn: "10h"}
            )
            return res.status(200).json({ message: "Login realizado com sucesso!", 
                token});
        }catch(error){
            res.status(500).json({ message: "Erro ao realizar o login!", error: error.message});
        };
    };
};
export default LoginUsuarioController;