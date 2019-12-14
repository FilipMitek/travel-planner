import { ILogger } from './Logger/ILogger';
import * as express from 'express';
import { Server } from 'http';
import * as bodyParser from 'body-parser';
import { AbstractListener } from './Listeners/AbstractListener';
import { RoutesLoader } from './Routes/RoutesLoader';

export class ApiServer {

    private readonly expressApp: express.Express;
    private logger: ILogger;
    private listener: AbstractListener;
    private routesLoader: RoutesLoader;

    constructor(logger: ILogger, listener: AbstractListener, routesLoader) {
        this.logger = logger;
        this.listener = listener;
        this.routesLoader = routesLoader;
        this.expressApp = express();
    }

    public async init(): Promise<Server> {
        this.initExpress();
        await this.initRoutes();
        return this.listener.createServer(this.expressApp);
    }

    private initExpress(): void {
        this.logger.info(this, 'initExpress', 'Express was initialized;');
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    private async initRoutes(): Promise<void> {
        await this.routesLoader.load(this.expressApp);
    }

}
