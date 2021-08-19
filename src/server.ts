import { sum } from "@modules/testing";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  
  
	res.send("It's ok!");
});

app.listen(3333, () => {
	console.log("Server Working 🔥");
});

sum(1,1)