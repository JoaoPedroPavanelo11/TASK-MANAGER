import Task from "../model/Tesk.js";

class ModificarTesk{
    static async modificarTesk(req, res){
        try{
            const { titulo, descricao, status } = req.body;

            const task = await Task.findByPk(req.params.id); // Encontrar a tarefa pelo ID
            if(!task){
                return res.status(404).json({ message: "Tarefa nao encontrada!"});
            }

            await task.update({ titulo, descricao, status }) // Atualizar os campos da tarefa
            res.status(200).json({ message: "Tarefa modificada com sucesso!", task });
        }catch(error){
            res.status(500).json({ message: "Erro ao modificar a tarefa!", error: error.message})
        }
    }
}
export default ModificarTesk;