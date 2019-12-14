import { inject, injectable } from 'inversify';
import { MIDDLEWARE_TYPES, TYPES } from '../Types';
import { ILogger } from '../Logger/ILogger';
import { ApiConfig } from '../config/ApiConfig';
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';
import { Express, Router } from 'express';
import { FuelRoutesManager } from './FuelRoutesManager';
import { IFuelPriceParser } from '../Parser/fuelPrice/IFuelPriceParser';

@injectable()
export class RoutesLoader {

    protected logger: ILogger;
    protected apiConfig: ApiConfig;
    protected authMiddleware: AuthMiddleware;
    protected fuelRoutes: FuelRoutesManager;

    constructor(
        @inject(TYPES.Logger) logger: ILogger,
        @inject(TYPES.ApiConfig) apiConfig: ApiConfig,
        @inject(TYPES.FuelPriceParser) fuelPriceParser: IFuelPriceParser,
        @inject(MIDDLEWARE_TYPES.AuthMiddleware) authMiddleware: AuthMiddleware,
    ) {
        this.logger = logger;
        this.apiConfig = apiConfig;
        this.authMiddleware = new AuthMiddleware(this.logger);
        this.fuelRoutes = new FuelRoutesManager(this.logger, fuelPriceParser);
    }

   public async load(express: Express) {
       express.use(this.authMiddleware.getMiddleware());
       express.use('/fuel', await this.loadFuelRoutes() );
   }

   private async loadFuelRoutes(): Promise<Router> {
       const fuelRouter = await this.fuelRoutes.registerFuelRoutes();
       return Promise.resolve(fuelRouter);

   }

}
