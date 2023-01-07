import express, {Application, Request , Response} from 'express';
import config from './envConfig'
const app:Application = express();


app.get('/', (request:Request, response:Response):void=>{
    response.json({
        message:"Hello From the Server"
    })
})

app.listen(config.server_port, ():void=>{
    console.log(`Server is started at http://localhost:${config.server_port}`)
});

