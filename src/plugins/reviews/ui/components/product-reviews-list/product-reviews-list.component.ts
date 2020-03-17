import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import {
    GetReviewForProduct,
    GetReviewsHistogram,
    ProductReviewHistogramItem,
    SortOrder,
} from '../../generated-types';

import { GET_PRODUCT_PREVIEW_AND_HISTOGRAM, GET_REVIEWS_FOR_PRODUCT } from './product-reviews-list.graphql';

@Component({
    selector: 'kb-product-reviews-list',
    templateUrl: './product-reviews-list.component.html',
    styleUrls: ['./product-reviews-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReviewsListComponent
    extends BaseListComponent<
        GetReviewForProduct.Query,
        GetReviewForProduct.Items,
        GetReviewForProduct.Variables
    >
    implements OnInit {
    histogramBinData$: Observable<ProductReviewHistogramItem[]>;
    product$: Observable<GetReviewsHistogram.Product | null>;
    private filteredRating: number | null;

    constructor(private dataService: DataService, router: Router, route: ActivatedRoute) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => {
                return this.dataService.query(GET_REVIEWS_FOR_PRODUCT, args);
            },
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            data => data.product!.reviews,
            (skip, take) => {
                return {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    productId: route.snapshot.paramMap.get('id')!,
                    options: {
                        skip,
                        take,
                        sort: {
                            createdAt: SortOrder.Desc,
                        },
                        ...(this.filteredRating != null
                            ? {
                                  filter: {
                                      rating: {
                                          eq: this.filteredRating,
                                      },
                                  },
                              }
                            : {}),
                    },
                };
            },
        );
    }

    ngOnInit() {
        super.ngOnInit();
        const productWithHistogram$ = this.dataService
            .query<GetReviewsHistogram.Query, GetReviewsHistogram.Variables>(
                GET_PRODUCT_PREVIEW_AND_HISTOGRAM,
                {
                    id: this.route.snapshot.paramMap.get('id') || '',
                },
            )
            .single$.pipe(shareReplay(1));
        this.histogramBinData$ = productWithHistogram$.pipe(
            map(data => (data.product ? data.product.reviewsHistogram : [])),
        );
        this.product$ = productWithHistogram$.pipe(map(data => data.product));
    }

    applyRatingFilters(filteredBin: number) {
        this.filteredRating = filteredBin;
        this.refresh();
    }
}
