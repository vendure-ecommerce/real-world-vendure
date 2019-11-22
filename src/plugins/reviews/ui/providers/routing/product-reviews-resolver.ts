import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from '@vendure/admin-ui/src';
import { Observable } from 'rxjs';

import { GetProductName } from '../../generated-types';

import { GET_PRODUCT_NAME } from './product-reviews-resolver.graphql';

@Injectable()
export class ProductReviewsResolver implements Resolve<any> {

    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetProductName.Product | null> {
        const take = +(route.queryParamMap.get('take') || 10);
        const skip = +(route.queryParamMap.get('skip') || 10);

        return this.dataService.query<GetProductName.Query, GetProductName.Variables>(GET_PRODUCT_NAME, {
            id: route.paramMap.get('id') || '',
        }).mapSingle(data => data.product);
    }

}
