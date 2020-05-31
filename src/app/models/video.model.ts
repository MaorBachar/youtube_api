export class Video {
    id: string;
    title: string;
    description: string;
    publishedAt: Date;
    thumbnail: string;
    hover: boolean;
    statistics: Statistics;
    constructor(id: string, title: string, description: string, publishedAt: Date, thumbnail: string, statistics: Statistics = undefined) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.publishedAt = publishedAt;
        this.thumbnail = thumbnail;
        this.statistics = statistics
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