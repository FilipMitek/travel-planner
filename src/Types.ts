export const TYPES = {
    Logger: Symbol.for('Logger'),
    ApiConfig: Symbol.for('ApiConfig'),
    DatabaseConfig: Symbol.for('DatabaseConfig'),
    ListenersConfig: Symbol.for('ListenersConfig'),
    RoutesLoader: Symbol.for('RoutesLoader'),
    FuelPriceParser: Symbol.for('FuelPriceParser'),
    YMLParser: Symbol.for('YMLParser'),
};

export const MIDDLEWARE_TYPES = {
    AuthMiddleware: Symbol.for('AuthMiddleware'),
};
