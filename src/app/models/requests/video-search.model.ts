import { HttpParams } from '@angular/common/http';

export class VideoSearchReq {
    key: string;
    q: string;
    pageToken:string;
    type: string = "video";
    maxResults: number = 15;
    part: string = 'snippet';

    constructor(
        key: string = undefined,
        q: string = undefined,
        pageToken: string = undefined,
        type: string = "video",
        maxResults: number = 15,
        part: string = 'snippet',
    ) {
        this.key = key;
        this.q = q;
        this.pageToken = pageToken;
        this.type = type;
        this.maxResults = maxResults;
        this.part = part;

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