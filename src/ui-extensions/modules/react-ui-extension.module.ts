import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { hostExternalFrame } from '@vendure/admin-ui/core';

/**
 * This module does 1 thing: it declares an external frame to be used at this route,
 * with the url of that frame set to the React app which will be copied over to the
 * assets dir, since it is defined in the `staticAssets` array of the AdminUiExtension.
 */
@NgModule({
    imports: [
        RouterModule.forChild([
            hostExternalFrame({
                path: '',
                breadcrumbLabel: 'React App',

                extensionUrl: './assets/react-app/index.html',

                /**
                 * During development you can point to the live-reloading dev server
                 */
                // extensionUrl: 'http://localhost:3080/admin/assets/react-app',

                openInNewTab: false,
            }),
        ]),
    ],
})
export class ReactUiExtensionModule {}
