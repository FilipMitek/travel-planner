import { ILogger } from '../Logger/ILogger';
import { IParser } from './IParser';
import { inject, injectable } from 'inversify';
import { TYPES } from '../Types';
import * as xml2js from 'xml2js';

@injectable()
export class XMLParser implements IParser {

    protected logger: ILogger;
    protected parser: xml2js.Parser;

    constructor(
        @inject(TYPES.Logger) logger: ILogger) {
        this.logger = logger;
        this.parser = new xml2js.Parser();
    }

     public async parse(objectToParse: any): Promise<any> {
        try {
            const parsed = await this.parser.parseStringPromise(objectToParse);
            return Promise.resolve(parsed);
        } catch (err) {
            this.logger.error(this, 'parse', err);
            return Promise.resolve(err);
        }
    }

}
