import { ILogger } from '../Logger/ILogger';
import { Response, Request,  NextFunction } from 'express';

export abstract class AbstractRoutes {

    protected logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    public handler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        this.action(req, res, next);
    };

    public abstract action(req: Request, res: Response, next: NextFunction): Promise<any>;

}
