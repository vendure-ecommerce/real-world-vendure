import { addNavMenuSection } from '@vendure/admin-ui/core';

export default [
    // This adds a new nav menu section linking to the Vue app route.
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
];
