import { inject, injectable } from 'inversify';
import { IListenerConfig } from '../Listeners/IListenerConfig';
import { ILogger } from '../Logger/ILogger';
import { TYPES } from '../Types';
import { IDatabaseConfig } from './databaseConfig/IDatabaseConfig';

@injectable()
export class ApiConfig {

    private logger: ILogger;
    private databaseConfig: IDatabaseConfig;
    private listenersConfig: IListenerConfig;

    constructor(
        @inject(TYPES.Logger) logger: ILogger,
        @inject(TYPES.DatabaseConfig) databaseConfig: IDatabaseConfig,
        @inject(TYPES.ListenersConfig) listenersConfig: IListenerConfig,
    ) {
        this.logger = logger;
        this.databaseConfig = databaseConfig;
        this.listenersConfig = listenersConfig;
    }

    public getListenerConfig(): IListenerConfig {
        return this.listenersConfig;
    }

    public getDatabaseConfig(): IDatabaseConfig {
        return this.databaseConfig;
    }
}
