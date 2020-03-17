import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AllProductReviewsListComponent } from './components/all-product-reviews-list/all-product-reviews-list.component';
import { ProductReviewDetailComponent } from './components/product-review-detail/product-review-detail.component';
import { ProductReviewsListComponent } from './components/product-reviews-list/product-reviews-list.component';
import { ReviewHistogramComponent } from './components/review-histogram/review-histogram.component';
import { ReviewStateLabelComponent } from './components/review-state-label/review-state-label.component';
import { GetProductName, GetReview } from './generated-types';
import { ProductReviewsResolver } from './providers/routing/product-reviews-resolver';
import { ReviewDetailResolver } from './providers/routing/review-detail-resolver';
import { ReviewsSharedModule } from './reviews-shared.module';

@NgModule({
    imports: [
        ReviewsSharedModule,
        RouterModule.forChild([
            {
                path: 'product/:id',
                component: ProductReviewsListComponent,
                resolve: { data: ProductReviewsResolver },
                data: { breadcrumb: productReviewsBreadcrumb },
            },
            {
                path: '',
                pathMatch: 'full',
                component: AllProductReviewsListComponent,
                data: {
                    breadcrumb: [
                        {
                            label: 'Product reviews',
                            link: ['/extensions', 'product-reviews'],
                        },
                    ],
                },
            },
            {
                path: ':id',
                component: ProductReviewDetailComponent,
                resolve: { entity: ReviewDetailResolver },
                data: { breadcrumb: reviewDetailBreadcrumb },
            },
        ]),
    ],
    declarations: [
        ProductReviewsListComponent,
        ProductReviewDetailComponent,
        ReviewHistogramComponent,
        AllProductReviewsListComponent,
        ReviewStateLabelComponent,
    ],
    providers: [ProductReviewsResolver, ReviewDetailResolver],
})
export class ReviewsUiLazyModule {}

export function productReviewsBreadcrumb(resolved: { data: GetProductName.Product }, params: any) {
    return [
        {
            label: 'breadcrumb.products',
            link: ['/catalog', 'products'],
        },
        {
            label: `${resolved.data.name}`,
            link: ['/catalog', 'products', params.id],
        },
        {
            label: 'Reviews',
            link: [''],
        },
    ];
}

export function reviewDetailBreadcrumb(resolved: { entity: Observable<GetReview.ProductReview> }) {
    return resolved.entity.pipe(
        map(entity => [
            {
                label: 'Product reviews',
                link: ['/extensions', 'product-reviews'],
            },
            {
                label: `${entity.id}`,
                link: [],
            },
        ]),
    );
}
