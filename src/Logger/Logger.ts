import { ILogger } from './ILogger';
import * as colors from 'colors';
import { injectable } from 'inversify';

@injectable()
export class Logger implements ILogger {

    public error(className: string | object, methodName: string, error?: Error): void {
        console.log(colors.red(
            `${new Date().toISOString()} [${this.getClassName(className)}/${methodName}]: ${error.message}`));
    }

    public info(className: string | object, methodName: string, message: string): void {
        console.log(colors.green(
            `${new Date().toISOString()} [${this.getClassName(className)}/${methodName}]: ${message}`));
    }

    public warn(className: string | object, methodName: string, message: string): void {
        console.log(colors.yellow(
            `${new Date().toISOString()} [${this.getClassName(className)}/${methodName}]: ${message}`));
    }
    private getClassName(className: string | object): string {
        if (typeof className === 'string') return className;
        if (typeof className === 'object') return className.constructor.name;
        return '';
    }

}
