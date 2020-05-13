import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomFieldConfigType, CustomFieldControl } from '@vendure/admin-ui/core';

@Component({
    selector: 'kb-review-count-link',
    template: `
        {{ formControl.value }}
        <a [routerLink]="['/extensions/product-reviews/product', productId]">View product reviews</a>
    `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCountLinkComponent implements CustomFieldControl {
    customFieldConfig: CustomFieldConfigType;
    formControl: FormControl;

    get productId(): string | null {
        return this.route.snapshot.paramMap.get('id');
    }

    constructor(private route: ActivatedRoute) {}
}
