import 'reflect-metadata';
import { Container } from 'inversify';
import { Logger } from './Logger/Logger';
import { MIDDLEWARE_TYPES, TYPES } from './Types';
import { ILogger } from './Logger/ILogger';
import { ApiConfig } from './config/ApiConfig';
import { RoutesLoader } from './Routes/RoutesLoader';
import { AuthMiddleware } from './Middlewares/AuthMiddleware';
import { FuelPriceParser } from './Parser/fuelPrice/FuelPriceParser';
import { IFuelPriceParser } from './Parser/fuelPrice/IFuelPriceParser';

export function initContainer(): Container {
    return new Container();
}

export async function baseContainerSetup(container: Container) {
    container.bind<ILogger>(TYPES.Logger).to(Logger).inSingletonScope();
    container.bind<ApiConfig>(TYPES.ApiConfig).to(ApiConfig).inSingletonScope();
    container.bind<RoutesLoader>(TYPES.RoutesLoader).to(RoutesLoader).inSingletonScope();
    container.bind<IFuelPriceParser>(TYPES.FuelPriceParser).to(FuelPriceParser);
    initMiddlewareContainerSetup(container);
}

function initMiddlewareContainerSetup(container: Container) {
    container.bind<AuthMiddleware>(MIDDLEWARE_TYPES.AuthMiddleware).to(AuthMiddleware);

}
