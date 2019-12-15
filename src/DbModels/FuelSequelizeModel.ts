import { ILogger } from '../Logger/ILogger';

export class FuelSequelizeModel {
    private logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

}
