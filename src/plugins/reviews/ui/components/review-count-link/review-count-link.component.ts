import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomFieldConfigType, CustomFieldControl } from '@vendure/admin-ui/core';

@Component({
    selector: 'review-count-link',
    template: ` {{ formControl.value }} `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCountLinkComponent implements CustomFieldControl {
    readonly: boolean;
    config: CustomFieldConfigType;
    formControl: FormControl;
}
