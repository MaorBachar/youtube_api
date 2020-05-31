import { HttpParams } from '@angular/common/http';

export class Pagination {
    q: string;
    pageToken:string;
    nextPageToken: string;
    prevPageToken: string;

    constructor(
        q: string = undefined,
        prevPageToken: string = undefined,
        nextPageToken: string = undefined,
    ) {
        this.q = q;
        this.prevPageToken = prevPageToken;
        this.nextPageToken = nextPageToken;

    }

    public toHttpParams(): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(this).forEach(key => {
            if (this[key]) {
                params = params.append(key, this[key]);
            }
        })
        return params;
    }
}