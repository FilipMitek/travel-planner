import { inject, injectable } from 'inversify';
import { TYPES } from '../Types';
import { ILogger } from '../Logger/ILogger';
import { Request, Response, NextFunction } from 'express';

@injectable()
export class AuthMiddleware {

    private logger: ILogger;

    constructor(
        @inject(TYPES.Logger) logger: ILogger,
    ) {
        this.logger = logger;
    }

    public getMiddleware(): (req: Request, res: Response, next: NextFunction) =>  void {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const authHeaderKey = 'Authentication';
            const authHeader = req.header(authHeaderKey);
            if (authHeader !== 'auth-key-123') {
                res.send(`Auth key ${req.header(authHeaderKey)} is invalid.`);
                this.logger.info(this, 'getMiddleware', `Can not authenticate user. Authentication key: "${req.header(authHeaderKey)}" is invalid.`);
                return Promise.resolve();
            }
            try {
                this.logger.info(this, 'getMiddleware', 'Authentication successfully.');
                next();
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(`An error occurred during user authorization.${err}`);
            }

        };
    }
}
