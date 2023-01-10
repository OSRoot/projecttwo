import express, { Application, Request, Response } from 'express';
import config from './envConfig';
export const app: Application = express();
import routes from './routes';
import ErrorHandle from './middlewares/errorHandler';
import morgan from 'morgan';
import helmet from "helmet";
// import bodyParser from 'body-parser';
app.use(express.json())
app.use(morgan("common"))
app.use(helmet())
// app.use(bodyParser.json())

app.get('/', (_request: Request, response: Response): void => {
    response.json({
        message: "Hello From the Server"
    })
})


app.use('/api', routes)



// #######################################################################
// ###   Global Error For Wrong Routes               #####################
// ###   It Should be at the end of the code         #####################
// ###   global Error handling for wrong routes      #####################
//                 ERROR MIDDLEWARE                  #####################
// #######################################################################
app.use(ErrorHandle);
app.use((_req: Request, res: Response): void => {
    // 404 status code (no found)
    res.status(404).json({
        INFO: "You seem to be Lost, Read my project documentation 😊"
    })
})

// ########################################################################
// ######### START THE SERVER (START LISTENING)                  ##########
// ######################################################################## 
app.listen(config.server_port, (): void => {
    console.log(`Server is started at http://localhost:${config.server_port}`)
});

