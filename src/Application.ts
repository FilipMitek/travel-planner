import { ILogger } from './Logger/ILogger';
import { ApiServer } from './ApiServer';
import { HttpListener } from './Listeners/HttpListener';
import { ApiConfig } from './config/ApiConfig';
import { RoutesLoader } from './Routes/RoutesLoader';

export class Application {
    private logger: ILogger;
    private apiConfig: ApiConfig;
    private routesLoader: RoutesLoader;

    constructor(logger: ILogger, apiConfig: ApiConfig, routesLoader: RoutesLoader) {
        this.logger = logger;
        this.apiConfig = apiConfig;
        this.routesLoader = routesLoader;
    }

    public async start(): Promise<void> {
        const httpListener = new HttpListener(this.apiConfig.getListenerConfig());
        const apiServer = new ApiServer(this.logger, httpListener, this.routesLoader );
        const server = await apiServer.init();
        server.listen(httpListener.port, () => {
            this.logger.info(this, 'start', `Server is running on ${httpListener.port} !`);
        });
    }

}
