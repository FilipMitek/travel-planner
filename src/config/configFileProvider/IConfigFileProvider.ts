import { IConfigContentModel } from '../models/IConfigContentModel';

export interface IConfigFileProvider {
    getConfigContent(): Promise<IConfigContentModel>;
}
