import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomFieldConfig, CustomFieldControl } from '@vendure/admin-ui/src';

@Component({
    selector: 'kb-review-count-link',
    template: `
        {{ formControl.value }}
        <a [routerLink]="['/extensions/product-reviews-list', productId]">View product reviews</a>
    `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCountLinkComponent implements CustomFieldControl {
    customFieldConfig: CustomFieldConfig;
    formControl: FormControl;

    get productId(): string | null {
        return this.route.snapshot.paramMap.get('id');
    }

    constructor(private route: ActivatedRoute) {}
}
