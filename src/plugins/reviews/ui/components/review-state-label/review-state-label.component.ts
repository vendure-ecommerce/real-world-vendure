import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ReviewState } from '../../common/ui-types';

@Component({
    selector: 'kb-review-state-label',
    templateUrl: './review-state-label.component.html',
    styleUrls: ['./review-state-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewStateLabelComponent {
    @Input() state: ReviewState;

    getIcon(state: ReviewState) {
        switch (state) {
            case 'new':
                return 'bubble-exclamation';
            case 'approved':
                return 'check-circle';
            case 'rejected':
                return 'times-circle';
        }
    }
}
