import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomFieldControl, DataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { GET_REVIEWS_FOR_PRODUCT } from '../product-reviews-list/product-reviews-list.graphql';
import { GetReviewForProduct, ProductReviewFragment } from '../../generated-types';

@Component({
    selector: 'kb-relation-review-input',
    template: `
        <div *ngIf="formControl.value as review">
            <vdr-chip>{{ review.rating }} / 5</vdr-chip>
            {{ review.summary }}
            <a [routerLink]="['/extensions', 'product-reviews', review.id]">
                <clr-icon shape="link"></clr-icon>
            </a>
        </div>
        <select appendTo="body" [formControl]="formControl">
            <option [ngValue]="null">Select a review...</option>
            <option *ngFor="let item of reviews$ | async" [ngValue]="item">
                <b>{{ item.summary }}</b>
                {{ item.rating }} / 5
            </option>
        </select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelationReviewInputComponent implements OnInit, CustomFieldControl {
    @Input() readonly: boolean;
    @Input() formControl: FormControl;
    @Input() config: any;

    reviews$: Observable<ProductReviewFragment[]>;

    constructor(private dataService: DataService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.reviews$ = this.route.data.pipe(
            switchMap(data => data.entity),
            switchMap((product: any) => {
                return this.dataService
                    .query<GetReviewForProduct.Query, GetReviewForProduct.Variables>(
                        GET_REVIEWS_FOR_PRODUCT,
                        {
                            productId: product.id,
                        },
                    )
                    .mapSingle(({ product }) => product?.reviews.items ?? []);
            }),
        );
    }
}
