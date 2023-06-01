import databaseConfiguration from './database.configuration';
import encryptionConfiguration from './encryption.configuration';
import serverConfiguration from './server.configuration';
import swaggerConfiguration from './swagger.configuration';

export const appConfigs = [serverConfiguration, databaseConfiguration, swaggerConfiguration, encryptionConfiguration];
