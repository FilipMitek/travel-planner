import * as express from 'express';
import { IListenerConfig } from './IListenerConfig';

export abstract class AbstractListener {

    protected type: string;
    protected port: number;
    protected enable: boolean;

    protected constructor(listenerConfig: IListenerConfig) {
        this.type = listenerConfig.type;
        this.port = listenerConfig.port;
        this.enable = listenerConfig.enable;
    }

    public abstract createServer(expressApp: express.Express): any;

    public init(listener: AbstractListener): AbstractListener {
        this.type = listener.type;
        this.port = listener.port;
        this.enable = listener.enable;
        return this;
    }
}
