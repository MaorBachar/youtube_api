import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { VideoDetailReq } from 'src/app/models/requests/video-detail.model';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent implements OnInit {
  public videosIds: Array<string>;
  public videos: Video[] = [];
  public loading: boolean = false;
  constructor(private youtubeService: YoutubeService) {
    this.videosIds = Array.from(this.youtubeService.getWatchLaterFromStorage());
    if (this.videosIds && this.videosIds.length) {
      this.getVideos();
    }

  }

  ngOnInit(): void {

  }
  /*fetching videos from localstorage (watch later list),
  */
  getVideos() {
    const query: VideoDetailReq = new VideoDetailReq();
    query.id = this.videosIds;
    this.loading = true;
    this.youtubeService.getVideosDetails(query).subscribe(res => {
      if (res.items) {
        this.videos = [];
        const items = res.items.map(item => {
          return new Video(
            item.id,
            item.channelTitle,
            item.snippet.title,
            item.snippet.description,
            new Date(item.snippet.publishedAt),
            item.snippet.thumbnails.medium.url,
            item.statistics,
            item.contentDetails);
        }
        );
        this.videos.push(...items);
        // updating the playlist (next,prev buttons) while scrolling - / fetchin data.
        this.youtubeService.updateResultsList(this.videos);
        this.loading = false;
      }
    })
  }
  removeVideo(video: Video) {
    var foundIndex = this.videos.findIndex((obj: Video) => video.id === obj.id);
    if (!isNaN(foundIndex)) {
      /*fetching videos from localstorage (watch later list),
      *update subscriber - results page in order to show the correct and most updated state
      * is video selected to be in watch later lisr or not 
      */
      this.youtubeService.removeFromWatchList(video.id);
      this.videos.splice(foundIndex, 1);
    }
  }



}
