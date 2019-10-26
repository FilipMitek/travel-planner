export interface ILogger {
    info(className: string | object, methodName: string , message: string): void;
    warn(className: string | object, methodName: string, message ): void;
    error(className: string | object, methodName: string, error?: Error ): void;
}
