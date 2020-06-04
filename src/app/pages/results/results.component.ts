import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination.model';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Video } from 'src/app/models/video.model';
import { Subscription } from 'rxjs';
import { VideoSearchReq } from 'src/app/models/requests/video-search.model';
import { VideoDetailReq } from 'src/app/models/requests/video-detail.model';

import * as _ from 'lodash';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],


})
export class ResultsComponent implements OnInit {
  private searchSubscription: Subscription;
  private watchLaterSubscription: Subscription;
  private pagination: Pagination = new Pagination();
  public videos: Video[];
  public statisticsDic = {};
  public watchListSet: Set<string>;
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

    this.watchLaterSubscription = this.youtubeService.getWatchLater().subscribe((list: Set<string>) => {
      if (list) {
        this.watchListSet = list;
      }
    })


  }

  /*fetching videos by search string,
  * @param pageToken - id of next page data;
  */
  private getSearchedVideos(pageToken: string = undefined): void {
    const query: VideoSearchReq = this.buildQuery(this.pagination, pageToken);
    if (!pageToken) {
      this.loading = true;
    }
    this.youtubeService.getSearchedVideos(query).subscribe(res => {
      if (res.items) {
        const items = res.items.map(item => new Video(
          item.id.videoId,
          item.channelTitle,
          item.snippet.title,
          item.snippet.description,
          new Date(item.snippet.publishedAt),
          item.snippet.thumbnails.medium.url,
        ));
        this.pagination.nextPageToken = res.nextPageToken;
        this.videos.push(...items);
        this.getDetails(this.videos);

      }
    })
  }

  /*fetching extra data for each video,*/
  private getDetails(videos: Video[]) {
    const videosIds: string[] = videos.map((video: Video) => video.id);
    let reqQuery: VideoDetailReq = new VideoDetailReq();
    reqQuery.id = videosIds;
    this.youtubeService.getVideosDetails(reqQuery).subscribe(res => {
      if (res.items && res.items) {
        let data = res.items.map(item => {
          return new Video(
            item.id,
            item.snippet.channelTitle,
            item.snippet.title,
            item.snippet.description,
            new Date(item.snippet.publishedAt),
            item.snippet.thumbnails.medium.url,
            item.statistics,
            item.contentDetails)
        })
        /*creating dictonary in order to create merge list by O(n),
        * each view wil includes extra data (likes,dislikes, views..).
        */
        data = _.groupBy(data, (obj) => obj.id);
        this.videos = this.mergeCollections(data, this.videos);
        // updating the playlist (next,prev videos) while scrolling - / fetchin data.
        this.youtubeService.updateResultsList(this.videos);
        this.loading = false;
      }
    })
  }

  // "deep populate" additonal information added to videos (such as: views, likes).
  private mergeCollections(data, mergeToCollection: Video[]) {
    return mergeToCollection.map((video: Video) => {
      video.channelTitle = data[video.id][0].channelTitle;
      if (_.get(data, '[video.id][0].contentDetails.duration')) {
        video.contentDetails.duration = this.timeToString(data[video.id][0].contentDetails.duration);
      }
      video.statistics = data[video.id][0].statistics;
      return video;
    })
  }

  private timeToString(time: string) {
    return time.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "")

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
