import { ILogger } from '../../Logger/ILogger';

export class DbInitializer {

    private logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

}
