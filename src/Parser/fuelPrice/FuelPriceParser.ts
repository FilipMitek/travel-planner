import { XMLParser } from '../XMLParser';
import { IFuelInfo } from './IFuelInfo';
import { ILogger } from '../../Logger/ILogger';
import { IFuelPriceParser } from './IFuelPriceParser';

export class FuelPriceParser extends XMLParser implements IFuelPriceParser {

    protected logger: ILogger;

    constructor(logger: ILogger) {
        super(logger);
    }

    public async getFuelPrice(objectToParse: any): Promise<IFuelInfo> {
        const parsed = await this.parse(objectToParse);
        return this.parseFuelPrices(parsed);
    }

    private parseFuelPrices(pricesObject: string): IFuelInfo {
        const fuelTypes = pricesObject['gpp:data']['gpp:element'];
        return fuelTypes.map((element) => {
            return {
                countryName: element['gpp:country'][0]._,
                countryCode: element['gpp:country'][0].$.code,
                lastUpdate: element['gpp:date'][0],
                currency: element['gpp:currency'][0],
                fuelType: Object.keys(element)[3].replace('gpp:', ''),
                fuelPrice: element[Object.keys(element)[3]][0],
            };
        });
    }
}
