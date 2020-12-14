import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { DataService, SharedModule } from '@vendure/admin-ui/core';
import { GetAllReviews } from '../../generated-types';
import { Observable } from 'rxjs';
import { GET_ALL_REVIEWS } from '../../components/all-product-reviews-list/all-product-reviews-list.graphql';
import { ReviewsSharedModule } from '../../reviews-shared.module';

@Component({
    selector: 'vdr-reviews-widget',
    templateUrl: './reviews-widget.component.html',
    styleUrls: ['./reviews-widget.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsWidgetComponent implements OnInit {
    pendingReviews$: Observable<GetAllReviews.Items[]>;
    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.pendingReviews$ = this.dataService
            .query<GetAllReviews.Query, GetAllReviews.Variables>(GET_ALL_REVIEWS, {
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
