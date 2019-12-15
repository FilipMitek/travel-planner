import { IConfigFileProvider } from './IConfigFileProvider';
import { IConfigContentModel } from '../models/IConfigContentModel';
import { ILogger } from '../../Logger/ILogger';
import { IParser } from '../../Parser/IParser';
import * as fs from 'fs';
import * as path from 'path';

const CONFIG_FILE_PATH = '../travel-planner-config.yml';

export class ConfigFileProvider implements IConfigFileProvider {

    private logger: ILogger;
    private ymlParser: IParser;

    constructor(logger: ILogger, ymlParser: IParser) {
        this.logger = logger;
        this.ymlParser = ymlParser;
    }

    public async getConfigContent(): Promise<IConfigContentModel> {
        try {
            const filePath = path.resolve(__dirname, CONFIG_FILE_PATH);
            const fileContent = await fs.readFileSync(filePath, { encoding: 'utf-8' });
            const parsedConfig = await this.ymlParser.parse(fileContent);
            return {
                name: parsedConfig.name,
                listeners: parsedConfig.listeners,
                database: parsedConfig.database,
            } as IConfigContentModel;
        } catch (err) {
            this.logger.error(this, 'fileContent', err);
        }

    }
}
