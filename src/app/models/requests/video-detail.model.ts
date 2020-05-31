import { HttpParams } from '@angular/common/http';

export class VideoDetailReq {
    key: string;
    part: string = 'statistics,snippet';
    id: Array<string> = [];

    constructor(key: string = undefined, part: string = "statistics, snippet", id: Array<string> = []) {
        this.key = key;
        this.part = part;
        this.id = id;
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