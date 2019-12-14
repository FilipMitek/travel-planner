export const TYPES = {
    Logger: Symbol.for('Logger'),
    ApiConfig: Symbol.for('ApiConfig'),
    RoutesLoader: Symbol.for('RoutesLoader'),
    FuelPriceParser: Symbol.for('FuelPriceParser'),
};

export const MIDDLEWARE_TYPES = {
    AuthMiddleware: Symbol.for('AuthMiddleware'),
};
