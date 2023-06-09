import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { DataService, ItemOf, SharedModule } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { ReviewsSharedModule } from '../../reviews-shared.module';
import { GetReviewsForWidgetDocument, GetReviewsForWidgetQuery } from '../../generated-types';

const GET_REVIEWS_FOR_WIDGET = gql`
    query GetReviewsForWidget($options: ProductReviewListOptions) {
        productReviews(options: $options) {
            items {
                id
                authorName
                summary
                rating
                state
                createdAt
                product {
                    id
                    name
                }
            }
            totalItems
        }
    }
`;

@Component({
    selector: 'vdr-reviews-widget',
    templateUrl: './reviews-widget.component.html',
    styleUrls: ['./reviews-widget.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsWidgetComponent implements OnInit {
    pendingReviews$: Observable<ItemOf<GetReviewsForWidgetQuery, 'productReviews'>[]>;
    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.pendingReviews$ = this.dataService
            .query(GetReviewsForWidgetDocument, {
                options: {
                    filter: {
                        state: {
                            eq: 'new',
                        },
                    },
                    take: 10,
                },
            })
            .mapStream(data => data.productReviews.items);
    }
}

@NgModule({
    imports: [SharedModule, ReviewsSharedModule],
    declarations: [ReviewsWidgetComponent],
})
export class ReviewsWidgetModule {}
