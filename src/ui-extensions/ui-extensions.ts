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
            route: 'react-ui',
            ngModuleFileName: 'react-ui-extension.module.ts',
            ngModuleName: 'ReactUiExtensionModule',
        },
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
        // A static asset can be supplied as a string...
        path.join(__dirname, 'vue-app'),
        // Or as an object, in the case that we want to rename the file or directory
        // once copied to the `assets/` dir of the built Admin UI app.
        { path: path.join(__dirname, 'react-app/build'), rename: 'react-app' },
    ],
};
