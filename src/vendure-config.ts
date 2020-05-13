import { DefaultSearchPlugin, examplePaymentHandler, VendureConfig } from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';

import fs from 'fs';
import { BraintreePlugin } from './plugins/braintree/braintree-plugin';
import { ReviewsPlugin } from './plugins/reviews/reviews-plugin';
import { customAdminUi } from './compile-admin-ui';

const IS_PROD = path.basename(__dirname) === 'dist';

export const config: VendureConfig = {
    apiOptions: {
        port: 3000,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        adminApiPlayground: {
            settings: { 'request.credentials': 'include' },
        },
        adminApiDebug: true,
        shopApiPlayground: {
            settings: { 'request.credentials': 'include' },
        },
        shopApiDebug: true,
    },
    authOptions: {
        sessionSecret: 'jysakgzhw6',
    },
    dbConnectionOptions: {
        type: 'sqlite',
        synchronize: false,
        logging: false,
        database: path.join(__dirname, '../vendure.sqlite'),
        migrations: [getMigrationsPath()],
    },
    paymentOptions: {
        paymentMethodHandlers: [examplePaymentHandler],
    },
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            port: 3001,
        }),
        DefaultSearchPlugin,
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            mailboxPort: 3003,
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change',
            },
        }),
        AdminUiPlugin.init({
            port: 3002,
            app: customAdminUi({ recompile: !IS_PROD, devMode: !IS_PROD }),
        }),
        BraintreePlugin,
        ReviewsPlugin,
    ],
};

function getMigrationsPath() {
    const devMigrationsPath = path.join(__dirname, '../migrations');
    const distMigrationsPath = path.join(__dirname, 'migrations');

    return fs.existsSync(distMigrationsPath)
        ? path.join(distMigrationsPath, '*.js')
        : path.join(devMigrationsPath, '*.ts');
}
