import { inject, injectable } from 'inversify';
import { TYPES } from '../Types';
import { ILogger } from '../Logger/ILogger';
import { ApiConfig } from '../config/ApiConfig';

@injectable()
export class RoutesLoader {

    private logger: ILogger;
    private apiConfig: ApiConfig;

    constructor(
        @inject(TYPES.Logger) logger: ILogger,
        @inject(TYPES.ApiConfig) apiConfig: ApiConfig,
    ) {
        this.logger = logger;
        this.apiConfig = apiConfig;
    }

}
