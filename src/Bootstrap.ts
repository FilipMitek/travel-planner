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
import { DatabaseConfig } from './config/databaseConfig/DatabaseConfig';
import { ConfigFileProvider } from './config/configFileProvider/ConfigFileProvider';
import { IParser } from './Parser/IParser';
import { YMLParser } from './Parser/YMLParser';
import { ListenersConfig } from './Listeners/ListenersConfig';

export function initContainer(): Container {
    return new Container();
}

export async function baseContainerSetup(container: Container) {
    container.bind<ILogger>(TYPES.Logger).to(Logger).inSingletonScope();
    container.bind<ApiConfig>(TYPES.ApiConfig).to(ApiConfig).inSingletonScope();
    container.bind<RoutesLoader>(TYPES.RoutesLoader).to(RoutesLoader).inSingletonScope();
    container.bind<IFuelPriceParser>(TYPES.FuelPriceParser).to(FuelPriceParser);
    container.bind<DatabaseConfig>(TYPES.DatabaseConfig).to(DatabaseConfig).inSingletonScope();
    container.bind<ListenersConfig>(TYPES.ListenersConfig).to(ListenersConfig).inSingletonScope();
    container.bind<YMLParser>(TYPES.YMLParser).to(YMLParser);
    initMiddlewareContainerSetup(container);
    await prepareServiceConfiguration(container);
}

function initMiddlewareContainerSetup(container: Container) {
    container.bind<AuthMiddleware>(MIDDLEWARE_TYPES.AuthMiddleware).to(AuthMiddleware);
}

export async function prepareServiceConfiguration(container: Container) {
    const configFileProvider = new ConfigFileProvider(
        container.get<ILogger>(TYPES.Logger),
        container.get<IParser>(TYPES.YMLParser),
    );
    const configContent = await configFileProvider.getConfigContent();
    const databaseConfig = container.get<DatabaseConfig>(TYPES.DatabaseConfig);
    const listenersConfig = container.get<ListenersConfig>(TYPES.ListenersConfig);
    databaseConfig.setDatabaseConfig(configContent.database);
    listenersConfig.setListenerConfig(configContent.listeners);
    console.log(listenersConfig)
}
