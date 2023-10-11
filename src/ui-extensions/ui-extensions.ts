import path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';

/**
 * This demonstrates how to configure a UI extension hosting an application built on
 * other web technologies than Angular. In this case, Vue and React.
 */
export const nonAngularUiExtensions: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'modules'),
    ngModules: [
        {
            type: 'lazy',
            route: 'vue-ui',
            ngModuleFileName: 'vue-ui-extension.module.ts',
            ngModuleName: 'VueUiExtensionModule',
        },
        {
            type: 'shared',
            ngModuleFileName: 'shared-ui-extension.module.ts',
            ngModuleName: 'UiSharedModule',
        },
    ],
    staticAssets: [
        // Here we are copying the static files of the Vue app to the `assets/` directory
        // of the compiled Admin UI app.
        path.join(__dirname, 'vue-app'),
    ],
};
