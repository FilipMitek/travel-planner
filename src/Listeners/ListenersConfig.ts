import {injectable} from 'inversify';
import {IListenerConfig} from './IListenerConfig';

@injectable()
export class ListenersConfig {

    private _port: number;
    private _enable: boolean;
    private _type: string;

    get port() {
        return this._port;
    }

    set port(port: number) {
        this._port = port;
    }

    get enable() {
        return this._enable;
    }

    set enable(enable: boolean) {
        this._enable = enable;
    }

    get type() {
        return this._type;
    }

    set type(type: string) {
        this._type = type;
    }

    public setListenerConfig(listenersConfigFromFile: IListenerConfig[]) {
        const enabledListener = this.getEnabledListener(listenersConfigFromFile);
        this.type = enabledListener.type;
        this.enable = enabledListener.enable;
        this.port = enabledListener.port;
    }

    private getEnabledListener(listenersConfigFromFile: IListenerConfig[]): IListenerConfig {
        return listenersConfigFromFile.find((listener) => listener.enable === true);

    }

}
