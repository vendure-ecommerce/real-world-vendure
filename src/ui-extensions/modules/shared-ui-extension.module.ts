import { NgModule } from '@angular/core';
import { addNavMenuSection } from '@vendure/admin-ui/core';

/**
 * This module adds a new nav menu section linking to the Vue app and React app routes.
 */
@NgModule({
    providers: [
        addNavMenuSection({
            id: 'demo-extensions',
            label: 'Demo Extensions',
            items: [
                {
                    id: 'vue-app',
                    label: 'Vue App',
                    routerLink: ['/extensions/vue-ui'],
                    icon: 'code',
                },
            ],
        }),
    ],
})
export class UiSharedModule {}
