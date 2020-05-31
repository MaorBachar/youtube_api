import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Subscription } from 'rxjs/internal/Subscription';
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
      this.videosIds = Object.keys(this.youtubeService.getWatchLaterFromStorage());
      if (this.videosIds && this.videosIds.length) {
        this.getVideos();
      }

  }

  ngOnInit(): void {

  }

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
            item.snippet.title,
            item.snippet.description,
            new Date(item.snippet.publishedAt),
            item.snippet.thumbnails.medium.url,
            item.statistics);
        }
        );
        this.loading = false;
        this.videos.push(...items);
      }
    })
  }
  removeVideo(video:Video){
    var foundIndex = this.videos.findIndex((obj:Video) => video.id === obj.id);
    if(!isNaN(foundIndex)){
      this.youtubeService.updateWatchLater(video.id,'delete');
      this.videos.splice(foundIndex,1);
    }
  }

  ngOnDestroy(): void {
  }



}
