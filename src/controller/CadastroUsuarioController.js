import bcrypt from "bcrypt";
import User from "../model/User.js";

class CadastroUsuarioController {
    static async cadastrarUsuario(req, res) {
        try {
            const { name, email, password } = req.body;
            const nomeTratado = typeof name === "string" ? name.trim() : "";
            const emailTratado = typeof email === "string" ? email.trim().toLowerCase() : "";
            const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nomeTratado) {
                return res.status(400).json({ message: "Nome invalido!" });
            }

            if (!emailValido.test(emailTratado)) {
                return res.status(400).json({ message: "Email invalido!" });
            }

            if (!password) {
                return res.status(400).json({ message: "Senha invalida!" });
            }

            // Verificação de email
            const usuarioExistente = await User.findOne({ where: { email: emailTratado } });
            if (usuarioExistente) {
                return res.status(400).json({ message: "Email já cadastrado!" });
            }

            // Hash da senha
            const senhaHash = await bcrypt.hash(password, 10);

            // Criar Usuario
            const novoUsuario = await User.create({
                name: nomeTratado,
                email: emailTratado,
                password: senhaHash
            });


            return res.status(201).json({
                message: "Usuario cadastrado com sucesso!",
                usuario: {
                    id: novoUsuario.id,
                    name: novoUsuario.name,
                    email: novoUsuario.email,
                    role: novoUsuario.role
                }
            });

        } catch (error) {
            res.status(500).json({ message: "Erro ao cadastrar usuario!", error: error.message })
        };
    };
};
export default CadastroUsuarioController;
