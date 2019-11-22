import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService } from '@vendure/admin-ui/src';

import { GetAllReviews, SortOrder } from '../../generated-types';
import { GET_REVIEWS_FOR_PRODUCT } from '../product-reviews-list/product-reviews-list.graphql';

import { GET_ALL_REVIEWS } from './all-product-reviews-list.graphql';

@Component({
    selector: 'kb-all-product-reviews-list',
    templateUrl: './all-product-reviews-list.component.html',
    styleUrls: ['./all-product-reviews-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductReviewsListComponent extends BaseListComponent<
    GetAllReviews.Query,
    GetAllReviews.Items,
    GetAllReviews.Variables
> {
    filteredState: string | null = 'new';

    constructor(private dataService: DataService, router: Router, route: ActivatedRoute) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => {
                return this.dataService.query<GetAllReviews.Query>(GET_ALL_REVIEWS, args);
            },
            // tslint:disable-next-line:no-non-null-assertion
            data => data.productReviews,
            (skip, take) => {
                return {
                    // tslint:disable-next-line:no-non-null-assertion
                    productId: route.snapshot.paramMap.get('id')!,
                    options: {
                        skip,
                        take,
                        sort: {
                            createdAt: SortOrder.Desc,
                        },
                        ...(this.filteredState != null
                            ? {
                                  filter: {
                                      state: {
                                          eq: this.filteredState,
                                      },
                                  },
                              }
                            : {}),
                    },
                };
            },
        );
    }
}
