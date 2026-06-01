import app from "./src/app.js";
import sequelize from "./src/config/DataBaseConfig.js";

const PORT = process.env.PORT;

app.listen(PORT,() =>{
    console.log("Servidor iniciado!");
})