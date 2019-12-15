import { inject, injectable } from 'inversify';
import { ILogger } from '../Logger/ILogger';
import { IParser } from './IParser';
import { TYPES } from '../Types';
import * as yaml from 'yaml';

@injectable()
export class YMLParser implements IParser {

    protected logger: ILogger;

    constructor(
        @inject(TYPES.Logger) logger: ILogger,
    ) {
        this.logger = logger;
    }

    public async parse(objectToParse: any): Promise<any> {
        try {
            const parsed = await yaml.parse(objectToParse);
            return Promise.resolve(parsed);
        } catch (err) {
            this.logger.error(this, 'parse', err);
            return Promise.resolve(err);
        }
    }

}
