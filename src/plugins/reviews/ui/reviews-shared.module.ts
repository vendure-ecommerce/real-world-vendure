import { NgModule } from '@angular/core';
import { SharedModule } from '@vendure/admin-ui/src';

import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
    imports: [SharedModule, SharedModule],
    declarations: [StarRatingComponent],
    entryComponents: [StarRatingComponent],
    exports: [StarRatingComponent, SharedModule],
})
export class ReviewsSharedModule {}
