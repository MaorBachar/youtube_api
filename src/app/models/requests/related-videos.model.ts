import { HttpParams } from '@angular/common/http';

export class RelatedVideoReq {
    key: string;
    relatedToVideoId: string;
    type: string = "video";
    part: string = 'snippet';

    constructor(
        key: string = undefined,
        relatedToVideoId: string = undefined,
        type: string = "video",
        part: string = 'snippet',
    ) {
        this.key = key;
        this.relatedToVideoId = relatedToVideoId;
        this.type = type;
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