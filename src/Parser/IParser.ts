export interface IParser {
    parse(objectToParse: any): Promise<any>;
}
