import mongoose from "mongoose";

// mantém o comportamento atual do Mongoose 6 e evita o aviso de depreciação
mongoose.set("strictQuery", true);
mongoose.connect(process.env.STRING_CONEXAO_DB);

const db = mongoose.connection;

export default db;
