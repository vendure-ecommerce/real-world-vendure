import { NgModule } from '@angular/core';
import { SharedModule } from '@vendure/admin-ui/core';

import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ReviewStateLabelComponent } from './components/review-state-label/review-state-label.component';

@NgModule({
    imports: [SharedModule],
    declarations: [StarRatingComponent, ReviewStateLabelComponent],
    exports: [StarRatingComponent, ReviewStateLabelComponent, SharedModule],
})
export class ReviewsSharedModule {}
