import { NgModule } from '@angular/core';
import {
    addNavMenuItem,
    registerCustomFieldComponent,
    registerDashboardWidget,
    setDashboardWidgetLayout,
} from '@vendure/admin-ui/core';
import { DEFAULT_DASHBOARD_WIDGET_LAYOUT } from '@vendure/admin-ui/dashboard';

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
        registerDashboardWidget('reviews', {
            title: 'Latest reviews',
            supportedWidths: [4, 6, 8, 12],
            loadComponent: () =>
                import('./widgets/reviews-widget/reviews-widget.component').then(
                    m => m.ReviewsWidgetComponent,
                ),
        }),
        registerDashboardWidget('chart', {
            title: 'Some random chart',
            supportedWidths: [6, 8, 12],
            loadComponent: () =>
                import('./widgets/chart-widget/chart-widget.component').then(
                    m => m.ChartWidgetComponent,
                ),
        }),
        setDashboardWidgetLayout()
    ],
    exports: [],
})
export class ReviewsUiExtensionModule {}
