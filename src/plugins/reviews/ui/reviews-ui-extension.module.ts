import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CustomFieldComponentService, NavBuilderService } from '@vendure/admin-ui/src';

import { ReviewCountLinkComponent } from './components/review-count-link/review-count-link.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ReviewsSharedModule } from './reviews-shared.module';

@NgModule({
    imports: [ReviewsSharedModule],
    declarations: [ReviewCountLinkComponent],
    entryComponents: [ReviewCountLinkComponent],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: defineCustomFieldControls,
            deps: [CustomFieldComponentService],
        },
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: addNavItems,
            deps: [NavBuilderService],
        },
    ],
    exports: [],
})
export class ReviewsUiExtensionModule {}

export function defineCustomFieldControls(customFieldComponentService: CustomFieldComponentService) {
    return () => {
        customFieldComponentService.registerCustomFieldComponent(
            'Product',
            'reviewCount',
            ReviewCountLinkComponent,
        );
        customFieldComponentService.registerCustomFieldComponent(
            'Product',
            'reviewRating',
            StarRatingComponent,
        );
    };
}

export function addNavItems(navBuilderService: NavBuilderService) {
    return () => {
        navBuilderService.addNavMenuItem(
            {
                id: 'reviews',
                label: 'Product reviews',
                routerLink: ['/extensions/product-reviews'],
                icon: 'star',
            },
            'marketing',
        );
    };
}
