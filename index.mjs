import {app} from "./app/app.mjs";
import { config } from "./config.mjs";

const port = config.port

app.listen(port, () =>{
    console.log(`Server running on ${port}`)
})