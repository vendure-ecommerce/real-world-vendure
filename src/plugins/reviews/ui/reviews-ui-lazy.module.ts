import { inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AllProductReviewsListComponent } from './components/all-product-reviews-list/all-product-reviews-list.component';
import { ProductReviewDetailComponent } from './components/product-review-detail/product-review-detail.component';
import { ProductReviewsListComponent } from './components/product-reviews-list/product-reviews-list.component';
import { ReviewHistogramComponent } from './components/review-histogram/review-histogram.component';
import { ReviewsSharedModule } from './reviews-shared.module';
import { GetReviewDetailDocument, GetReviewDetailQuery } from './generated-types';

@NgModule({
    imports: [
        ReviewsSharedModule,
        RouterModule.forChild([
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
                resolve: {
                    detail: route => {
                        return inject(DataService)
                            .query(GetReviewDetailDocument, { id: route.paramMap.get('id') })
                            .mapStream(data => ({ entity: of(data.productReview) }));
                    },
                },
                data: { breadcrumb: reviewDetailBreadcrumb },
            },
        ]),
    ],
    declarations: [
        ProductReviewsListComponent,
        ProductReviewDetailComponent,
        ReviewHistogramComponent,
        AllProductReviewsListComponent,
    ],
})
export class ReviewsUiLazyModule {}

export function reviewDetailBreadcrumb(resolved: {
    detail: { entity: Observable<GetReviewDetailQuery['productReview']> };
}) {
    return resolved.detail.entity.pipe(
        map(entity => [
            {
                label: 'Product reviews',
                link: ['/extensions', 'product-reviews'],
            },
            {
                label: `#${entity?.id} (${entity?.product.name})`,
                link: [],
            },
        ]),
    );
}
