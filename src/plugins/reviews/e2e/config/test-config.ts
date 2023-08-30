import { mergeConfig } from '@vendure/core';
import { testConfig as defaultTestConfig } from '@vendure/testing';
import path from 'path';

import { fileURLToPath } from 'url';
import fs from 'fs-extra';

/**
 * We use a relatively long timeout on the initial beforeAll() function of the
 * e2e tests because on the first run (and always in CI) the sqlite databases
 * need to be generated, which can take a while.
 */
export const TEST_SETUP_TIMEOUT_MS = process.env.E2E_DEBUG ? 1800 * 1000 : 120000;

/**
 * For local debugging of the e2e tests, we set a very long timeout value otherwise tests will
 * automatically fail for going over the 5 second default timeout.
 */
if (process.env.E2E_DEBUG) {
    // tslint:disable-next-line:no-console
    console.log('E2E_DEBUG', process.env.E2E_DEBUG, ' - setting long timeout');
    // jest.setTimeout(1800 * 1000);
}

export const testConfig = (port: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const portsFile = fileURLToPath(new URL('ports.json', import.meta.url));
    fs.ensureFileSync(portsFile);
    let usedPorts: number[];
    try {
        usedPorts = fs.readJSONSync(portsFile) ?? [3010];
    } catch (e: any) {
        usedPorts = [3010];
    }
    const nextPort = Math.max(...usedPorts) + 1;
    usedPorts.push(nextPort);
    if (100 < usedPorts.length) {
        // reset the used ports after it gets 100 entries long
        usedPorts = [3010];
    }
    fs.writeJSONSync(portsFile, usedPorts);
    return mergeConfig(defaultTestConfig, {
        apiOptions: {
            port,
        },
        importExportOptions: {
            importAssetsDir: path.join(__dirname, '..', 'fixtures/assets'),
        },
        // dbConnectionOptions: {
        //     type: 'postgres',
        //     logging: true,
        //     database: process.env.TEST_DB_NAME || 'test-real-world-vendure-db',
        //     host: process.env.DB_HOST,
        //     port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
        //     username: process.env.DB_USERNAME,
        //     password: process.env.DB_PASSWORD,
        // },
    });
};
