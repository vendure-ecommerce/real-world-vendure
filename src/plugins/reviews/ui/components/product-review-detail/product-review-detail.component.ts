import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
    DataService,
    NotificationService,
    SharedModule,
    TypedBaseDetailComponent,
} from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { ReviewState } from '../../common/ui-types';
import { UpdateProductReviewInput } from '../../generated-types';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ReviewStateLabelComponent } from '../review-state-label/review-state-label.component';
import { APPROVE_REVIEW, REJECT_REVIEW, UPDATE_REVIEW } from './product-review-detail.graphql';
import { GetReviewDetailQuery } from '../../gql/graphql';
import { GET_REVIEW_DETAIL } from '../../routes';

@Component({
    selector: 'product-review-detail',
    templateUrl: './product-review-detail.component.html',
    styleUrls: ['./product-review-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [SharedModule, StarRatingComponent, ReviewStateLabelComponent],
})
export class ProductReviewDetailComponent
    extends TypedBaseDetailComponent<typeof GET_REVIEW_DETAIL, 'productReview'>
    implements OnInit, OnDestroy
{
    detailForm = this.formBuilder.group({
        summary: ['', Validators.required],
        body: '',
        rating: [0, Validators.required],
        authorName: ['', Validators.required],
        authorLocation: '',
        state: '',
        response: '',
    });
    reviewState$: Observable<ReviewState>;

    constructor(
        private formBuilder: FormBuilder,
        protected dataService: DataService,
        private changeDetector: ChangeDetectorRef,
        private notificationService: NotificationService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.init();
        this.reviewState$ = this.entity$.pipe(map(review => review.state as ReviewState));
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    approve() {
        this.saveChanges()
            .pipe(switchMap(() => this.dataService.mutate(APPROVE_REVIEW, { id: this.id })))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('Review was approved');
                },
                () => {
                    this.notificationService.error('An error occurred when attempting to approve the review');
                },
            );
    }

    reject() {
        this.saveChanges()
            .pipe(switchMap(() => this.dataService.mutate(REJECT_REVIEW, { id: this.id })))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('Review was rejected');
                },
                () => {
                    this.notificationService.error('An error occurred when attempting to reject the review');
                },
            );
    }

    save() {
        this.saveChanges()
            .pipe(filter(result => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-update-success', {
                        entity: 'ProductReview',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'ProductReview',
                    });
                },
            );
    }

    private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const { summary, body, response } = this.detailForm.value;
            const input: UpdateProductReviewInput = {
                id: this.id,
                summary: summary ?? undefined,
                body: body ?? undefined,
                response: response ?? undefined,
            };
            return this.dataService.mutate(UPDATE_REVIEW, { input }).pipe(map(() => true));
        } else {
            return of(false);
        }
    }

    protected setFormValues(entity: GetReviewDetailQuery['productReview']): void {
        this.detailForm.patchValue({
            summary: entity?.summary,
            body: entity?.body,
            rating: entity?.rating,
            authorName: entity?.authorName,
            authorLocation: entity?.authorLocation,
            state: entity?.state,
            response: entity?.response,
        });
    }
}
