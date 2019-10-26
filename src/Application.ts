import { ILogger } from './Logger/ILogger';
import { ApiServer } from './ApiServer';
import { HttpListener } from './Listeners/HttpListener';
import { ApiConfig } from './config/ApiConfig';

export class Application {
    private logger: ILogger;
    private apiConfig: ApiConfig;

    constructor(logger: ILogger, apiConfig: ApiConfig) {
        this.logger = logger;
        this.apiConfig = apiConfig;

    }

    public async start(): Promise<void> {
        const httpListener = new HttpListener(this.apiConfig.getListenerConfig());
        const apiServer = new ApiServer(this.logger, httpListener);
        const server = apiServer.init();
        server.listen(httpListener.port, () => {
            this.logger.info(this, 'start', `Server is running on ${httpListener.port} !`);
        });
    }

}
