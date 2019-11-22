import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from '@vendure/admin-ui/src';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, take, tap } from 'rxjs/operators';

import { GetReview } from '../../generated-types';

import { GET_REVIEW } from './review-detail-resolver.graphql';

@Injectable()
export class ReviewDetailResolver implements Resolve<any> {

    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<GetReview.ProductReview | null>> {
        const stream = this.dataService.query<GetReview.Query, GetReview.Variables>(GET_REVIEW, {
            id: route.paramMap.get('id') || '',
        }).mapStream(data => data.productReview).pipe(
            shareReplay(1),
        );

        return stream.pipe(
            take(1),
            map(() => stream),
        );
    }

}
