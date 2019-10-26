import { injectable } from 'inversify';
import { IListenerConfig } from '../Listeners/IListenerConfig';

@injectable()
export class ApiConfig {

public getListenerConfig(): IListenerConfig {
    return {
        type: 'http',
        port: 8080,
        enable: true,
    };

}
}
