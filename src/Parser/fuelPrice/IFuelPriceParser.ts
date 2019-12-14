import { IFuelInfo } from './IFuelInfo';

export interface IFuelPriceParser {
    getFuelPrice(objectToParse: any): Promise<IFuelInfo>;
}
