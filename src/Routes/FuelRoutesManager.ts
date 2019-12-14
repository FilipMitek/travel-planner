import { ILogger } from '../Logger/ILogger';
import axios from 'axios';
import { AbstractRoutes } from './AbstractRoutes';
import { Request, Response, NextFunction,  Router } from 'express';
import { IFuelPriceParser } from '../Parser/fuelPrice/IFuelPriceParser';
import { GetFuelPrice } from './FuelRoutes/GetFuelPrice';

const FUEL_PRICE_URL = 'https://www.globalpetrolprices.com/api_gpp.php?cnt=PL&ind=gp,dp,lp&prd=latest&uid=1537&uidc=0b99a32a7a2a7e11eb161c564accc6ec';

export class FuelRoutesManager extends AbstractRoutes {

    protected logger: ILogger;
    private fuelPriceParser: IFuelPriceParser;
    private getFuelPrice: GetFuelPrice;

    constructor( logger: ILogger, fuelPriceParser: IFuelPriceParser ) {
        super(logger);
        this.fuelPriceParser = fuelPriceParser;
    }

    public async registerFuelRoutes(): Promise<Router> {
        const router = Router();
        router.get('/price', this.handler);
        return router;
    }

    public async action(req: Request, res: Response, next: NextFunction) {
     try {
        const fuelPrices = await axios.get(FUEL_PRICE_URL);
        const parsedData = await this.fuelPriceParser.getFuelPrice(fuelPrices.data);
        res.send(parsedData);
        return Promise.resolve();
     } catch (err) {
        this.logger.error(this, 'getPriceRoute', err);
        res.send(err)
        return Promise.reject(err);
       }
    }
}
