import { Server, createServer } from 'http';
import { AbstractListener } from './AbstractListener';
import * as express from 'express';
import { IListenerConfig } from './IListenerConfig';

export class HttpListener extends AbstractListener {

    public type: string;
    public port: number;
    public enable: boolean;

    constructor(listenerConfig: IListenerConfig) {
        super(listenerConfig);
    }

    public createServer(expressApp: express.Express): Server {
        return createServer(expressApp);
    }
}
