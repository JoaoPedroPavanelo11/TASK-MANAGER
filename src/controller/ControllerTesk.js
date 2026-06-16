import Tesk from "../model/Tesk.js";

class controladorDeTesk {
    static async criarTesk(req, res) {
        try {
            const { titulo, descricao, status, dataTask } = req.body;

            if (!titulo) {
                return res.status(400).json({
                    message: "Titulo invalido!"
                });
            }
            if (!descricao) {
                return res.status(400).json({
                    message: "Descricao invalido!"
                });
            }
            // Metodo que cria a task
            const novaTesk = await Tesk.create({
                titulo,
                descricao,
                status,
                dataTask,
                UserId: req.user.id
            });
            return res.status(201).json({
                message: "Tarefa criada com sucesso!"
            })
        }catch(error){
            return res.status(500).json({
                error: error.message
            })
        }
    }

    // Metodo para excluir tesk
    static async excluirTesk(req, res){
        try{
            const tesk = await Tesk.findByPk(req.params.id);
            if(!tesk){
                return res.status(404).json({
                    message: "Tarefa nao encontrada!"
                })
            }
            if(tesk.UserId !== req.user.id){ // Verifica se a tarefa é do usuario que quer excluir
                return res.status(403).json({
                    message: "Voce nao tem permissao para excluir essa tarefa!"
                });
            }
            
            await tesk.destroy();

            return res.status(200).json({
                message: "Tarefa excluida com sucesso!"
            });
        }catch(error){
            return res.status(500).json({
                error: error.message
            });
        };
    }
}
export default controladorDeTesk;