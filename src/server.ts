import express from "express";
import  "reflect-metadata";

import DatabaseConnection from "./database/connect";
import router from "./routes/routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => {
	console.log("Server Working 🔥");
});

export const database = new DatabaseConnection("usersRepo").connect();
new DatabaseConnection("usersTest").connect();
export default app;