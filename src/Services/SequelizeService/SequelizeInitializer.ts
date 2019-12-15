import { ILogger } from '../../Logger/ILogger';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../Types';
import { ISequelizeInitializer } from './ISequelizeInitializer';
import { Sequelize } from 'sequelize';
import { ApiConfig } from '../../config/ApiConfig';

@injectable()
export class SequelizeInitializer implements ISequelizeInitializer {

    public public;

    private logger: ILogger;
    private apiConfig: ApiConfig;

    constructor(
        @inject(TYPES.Logger) logger: ILogger,
        @inject(TYPES.ApiConfig) apiConfig: ApiConfig,
    ) {
        this.logger = logger;
        this.apiConfig = apiConfig;
    }

    public initSequelizer(): Promise<void> {
        const databaseConfig = this.apiConfig.getDatabaseConfig();
        const sequelize = new Sequelize(databaseConfig.database, databaseConfig.userName, databaseConfig.password,
            {
            dialect: 'postgres',
        });
        console.log('poszlo')
        sequelize.sync();

        return Promise.resolve();

    }
}
