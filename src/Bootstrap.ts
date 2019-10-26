import 'reflect-metadata';
import { Container } from 'inversify';
import { Logger } from './Logger/Logger';
import { TYPES } from './Types';
import { ILogger } from './Logger/ILogger';
import { ApiConfig } from './config/ApiConfig';

export function initContainer(): Container {
    return new Container();
}

export async function baseContainerSetup(container: Container) {
    container.bind<ILogger>(TYPES.Logger).to(Logger).inSingletonScope();
    container.bind<ApiConfig>(TYPES.ApiConfig).to(ApiConfig).inSingletonScope();

}
