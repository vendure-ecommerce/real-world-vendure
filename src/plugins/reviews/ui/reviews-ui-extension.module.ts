import { NgModule } from '@angular/core';
import { addNavMenuItem, registerCustomFieldComponent } from '@vendure/admin-ui/core';

import { ReviewCountLinkComponent } from './components/review-count-link/review-count-link.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ReviewsSharedModule } from './reviews-shared.module';

@NgModule({
    imports: [ReviewsSharedModule],
    declarations: [ReviewCountLinkComponent],
    providers: [
        registerCustomFieldComponent('Product', 'reviewCount', ReviewCountLinkComponent),
        registerCustomFieldComponent('Product', 'reviewRating', StarRatingComponent),
        addNavMenuItem(
            {
                id: 'reviews',
                label: 'Product reviews',
                routerLink: ['/extensions/product-reviews'],
                icon: 'star',
            },
            'marketing',
        ),
    ],
    exports: [],
})
export class ReviewsUiExtensionModule {}
