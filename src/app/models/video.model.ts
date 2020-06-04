export class Video {
    id: string;
    channelTitle:string;
    title: string;
    duration: string;
    description: string;
    publishedAt: Date;
    thumbnail: string;
    hover: boolean;
    statistics: Statistics;
    contentDetails: ContentDetails;
    constructor(id: string, channelTitle:string, title: string, description: string, publishedAt: Date, thumbnail: string, statistics: Statistics = undefined, contentDetails: ContentDetails = undefined) {
        this.id = id;
        this.channelTitle = channelTitle;
        this.title = title;
        this.description = description;
        this.publishedAt = publishedAt;
        this.thumbnail = thumbnail;
        this.statistics = statistics;
        this.contentDetails = contentDetails;
    }
}

export class Statistics {
    commentCount: number;
    dislikeCount: number;
    favoriteCount: number;
    likeCount: number;
    viewCount: number

    constructor(commentCount: number, dislikeCount: number, favoriteCount: number, likeCount: number, viewCount: number){
        commentCount = this.commentCount;
        dislikeCount = this.dislikeCount;
        favoriteCount = this.favoriteCount;
        likeCount = this.likeCount;
        viewCount = this.viewCount;
    }
    // 
}

export class ContentDetails {
    duration: string;

    constructor(duration:string){
        this.duration = duration;
    }
}
