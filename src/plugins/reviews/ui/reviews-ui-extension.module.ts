import { NgModule } from '@angular/core';
import {
    addNavMenuItem,
    registerDashboardWidget,
    registerFormInputComponent,
    setDashboardWidgetLayout,
} from '@vendure/admin-ui/core';

import { ReviewCountLinkComponent } from './components/review-count-link/review-count-link.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ReviewsSharedModule } from './reviews-shared.module';
import { RelationReviewInputComponent } from './components/featured-review-selector/featured-review-selector.component';

@NgModule({
    imports: [ReviewsSharedModule],
    declarations: [ReviewCountLinkComponent, RelationReviewInputComponent],
    providers: [
        registerFormInputComponent('review-count-link', ReviewCountLinkComponent),
        registerFormInputComponent('star-rating-form-input', StarRatingComponent),
        registerFormInputComponent('review-selector-form-input', RelationReviewInputComponent),
        addNavMenuItem(
            {
                id: 'reviews',
                label: 'Product reviews',
                routerLink: ['/extensions/product-reviews'],
                icon: 'star',
            },
            'marketing',
        ),
        registerDashboardWidget('reviews', {
            title: 'Latest reviews',
            supportedWidths: [4, 6, 8, 12],
            loadComponent: () =>
                import('./widgets/reviews-widget/reviews-widget.component').then(
                    m => m.ReviewsWidgetComponent,
                ),
        }),
        setDashboardWidgetLayout([
            { id: 'welcome', width: 12 },
            { id: 'orderSummary', width: 6 },
            { id: 'reviews', width: 6 },
            { id: 'latestOrders', width: 12 },
        ]),
    ],
    exports: [],
})
export class ReviewsUiExtensionModule {}
