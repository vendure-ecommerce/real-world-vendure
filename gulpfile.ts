import { src, dest, parallel } from 'gulp';

const UI_EXTENSION_FILES = [
    '**/plugins/**/ui/**/*',
];

/**
 * This Gulp task copies the TypeScript source files from the plugin UI extensions over to the `dist` directory.
 * These UI extension sources are *not* transpiled, because the admin-ui-plugin will dynamically bundle them into
 * the resulting Admin UI application at runtime.
 */
function copyUiExtensionsSource() {
    return src(UI_EXTENSION_FILES, { cwd: 'src' }).pipe(dest('dist'));
}

export const build = parallel(copyUiExtensionsSource);
