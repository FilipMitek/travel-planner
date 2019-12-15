import { injectable } from 'inversify';

@injectable()
export class DatabaseConfig {

    private _database: string;
    private _password: string;
    private _userName: string;

    get database() {
        return this._database;
    }

    set database(database: string) {
        this._database = database;
    }

    get password() {
        return this._password;
    }

    set password(password: string) {
        this._password = password;
    }

    get userName() {
        return this._userName;
    }

    set userName(userName: string) {
        this._userName = userName;
    }

    public setDatabaseConfig(databaseConfigFromFile) {
        this.password = databaseConfigFromFile.password;
        this.userName = databaseConfigFromFile.userName;
        this.database = databaseConfigFromFile.database;
    }

}
