import {createConnection} from "typeorm";

createConnection()
	.then(() => {console.log("Connection established 📦");})
	.catch(err => console.log(`Error ocurred: ${err}`));