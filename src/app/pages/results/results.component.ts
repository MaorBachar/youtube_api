import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination.model';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Video } from 'src/app/models/video.model';
import { Subscription } from 'rxjs';
import {
  listAnimation
} from '../../utils/animations';
import { VideoSearchReq } from 'src/app/models/requests/video-search.model';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [
    listAnimation,
  ],

})
export class ResultsComponent implements OnInit {
  private searchSubscription: Subscription;
  private watchLaterSubscription: Subscription;
  private pagination: Pagination = new Pagination();
  public videos: Video[];
  public watchLaterListDic: object;
  public loading: boolean = false;

  constructor(private youtubeService: YoutubeService) {
  }

  ngOnInit(): void {
    this.searchSubscription = this.youtubeService.getSearchValue().subscribe((val: string) => {
      if (val) {
        this.pagination.q = val;
        this.videos = [];
        this.getSearchedVideos();
      }
    });

    this.watchLaterSubscription = this.youtubeService.getWatchLater().subscribe((list: object) => {
      if (list) {
          this.watchLaterListDic = list;
      }
    })


  }

  private getSearchedVideos(pageToken: string = undefined): void {
    const query: VideoSearchReq = this.buildQuery(this.pagination, pageToken);
    if(!pageToken){
      this.loading = true;
    }
    this.youtubeService.getSearchedVideos(query).subscribe(res => {
      if (res.items) {
        const items = res.items.map(item => new Video(
          item.id.videoId,
          item.snippet.title,
          item.snippet.description,
          new Date(item.snippet.publishedAt),
          item.snippet.thumbnails.medium.url,
        ));
        this.pagination.nextPageToken = res.nextPageToken;
        this.videos.push(...items);
        this.loading = false;
      }
    })
  }

  private buildQuery(pagination: Pagination, pageToken: string): VideoSearchReq {
    const query: VideoSearchReq = Object.assign(new VideoSearchReq(), pagination);
    if (pageToken) {
      query.pageToken = pageToken;
    }
    return query;
  }

  public onScroll(): void {
    this.getSearchedVideos(this.pagination.nextPageToken);
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.watchLaterSubscription.unsubscribe();
  }



}
