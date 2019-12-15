import { IListenerConfig } from '../../Listeners/IListenerConfig';
import { IDatabaseConfig } from '../databaseConfig/IDatabaseConfig';

export interface IConfigContentModel {
    name: string;
    listeners: IListenerConfig[];
    database: IDatabaseConfig;
}
