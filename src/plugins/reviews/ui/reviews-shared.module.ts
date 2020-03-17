import { NgModule } from '@angular/core';
import { SharedModule } from '@vendure/admin-ui/core';

import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
    imports: [SharedModule, SharedModule],
    declarations: [StarRatingComponent],
    exports: [StarRatingComponent, SharedModule],
})
export class ReviewsSharedModule {}
