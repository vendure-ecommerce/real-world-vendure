import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomFieldConfig, CustomFieldControl } from '@vendure/admin-ui/src';

type StarType = 'empty' | 'full' | 'half';

@Component({
    selector: 'kb-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent implements CustomFieldControl {
    @Input() rating: number | null;
    @Input() showLabel = true;

    customFieldConfig: CustomFieldConfig;
    formControl: FormControl;

    get starRating(): number {
        return this.formControl ? this.formControl.value : this.rating;
    }

    get stars(): StarType[] {
        const rating = this.starRating;
        return Array.from({ length: 5 }).map((_, i) => {
            const pos = i + 1;
            const filled = rating >= pos;
            if (filled) {
                return 'full';
            }
            if (Math.ceil(rating) < pos) {
                return 'empty';
            }
            return 'half';
        });
    }
}
