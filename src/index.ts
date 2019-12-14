import { baseContainerSetup, initContainer } from './Bootstrap';
import { Container } from 'inversify';
import { Application } from './Application';
import { ILogger } from './Logger/ILogger';
import { TYPES } from './Types';
import { ApiConfig } from './config/ApiConfig';
import { RoutesLoader } from './Routes/RoutesLoader';

(async () => {
    const myContainer: Container = initContainer();
    await baseContainerSetup(myContainer);
    const app = new Application(
        myContainer.get<ILogger>(TYPES.Logger),
        myContainer.get<ApiConfig>(TYPES.ApiConfig),
        myContainer.get<RoutesLoader>(TYPES.RoutesLoader),
    );
    await app.start();
})();
