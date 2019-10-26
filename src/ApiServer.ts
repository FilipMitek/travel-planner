import { ILogger } from './Logger/ILogger';
import * as express from 'express';
import { Server } from 'http';
import * as bodyParser from 'body-parser';
import { AbstractListener } from './Listeners/AbstractListener';

export class ApiServer {
    private logger: ILogger;
    private listener: AbstractListener;

    constructor(logger: ILogger, listener: AbstractListener) {
        this.logger = logger;
        this.listener = listener;
    }

    public init(): Server {
        return this.listener.createServer(this.initExpress());
    }

    private initExpress(): express.Express {
        this.logger.info(this, 'initExpress', 'Express was initialized;');
        const expressApp = express();
        expressApp.use(bodyParser.urlencoded({ extended: false }));
        expressApp.use(bodyParser.json());
        const routerTest = express.Router();
        routerTest.get('/prices', this.bodzioMiddleware());
        expressApp.use('/fuel', routerTest);
        expressApp.get('/showMain', this.testMiddleware());
        return expressApp;
    }

    private testMiddleware() {
        return(req: express.Request, res: express.Response) => {
            res.send(JSON.stringify({
                PierwszyObiekt: 'Test',
                PierwszaNazwa: 'Test1',
            }));
            this.logger.info(this, 'initExpress', 'Zainicijalizowano sciezke /elo');
        };
    }
    private bodzioMiddleware() {
        return(req: express.Request, res: express.Response) => {
            res.send('Paliwku to jest 2zł/l');
            this.logger.info(this, 'initExpress', 'Bodzio rusyzł');
        };
    }
}
