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
  private watchLaterSubscription: Subscription;
  public videosIds: Array<string>;
  public videos: Video[] = [];
  constructor(private youtubeService: YoutubeService) {
    this.watchLaterSubscription = this.youtubeService.getWatchLater().subscribe((list: object) => {
      this.videosIds = Object.keys(list);
      if (this.videosIds && this.videosIds.length) {
        this.getVideos();
      }
    })
  }

  ngOnInit(): void {

  }

  getVideos() {
    const query: VideoDetailReq = new VideoDetailReq();
    query.id = this.videosIds;
    this.youtubeService.getVideosDetails(query).subscribe(res => {
      if (res.items) {
        debugger
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

        this.videos.push(...items);
      }
    })
  }

  ngOnDestroy(): void {
    this.watchLaterSubscription.unsubscribe();
  }



}
