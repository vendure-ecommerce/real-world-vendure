import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';

import { GET_PRODUCT_NAME } from './product-reviews-resolver.graphql';

@Injectable()
export class ProductReviewsResolver implements Resolve<any> {
    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<GetProductName.Product | null | undefined> {
        return this.dataService
            .query<GetProductName.Query, GetProductName.Variables>(GET_PRODUCT_NAME, {
                id: route.paramMap.get('id') || '',
            })
            .mapSingle(data => data.product);
    }
}
