import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
import { VideoDetailReq } from 'src/app/models/requests/video-detail.model';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
})
export class WatchComponent implements OnInit {
  public videoId: string;
  public videoLink: SafeResourceUrl;
  public data: Video
  constructor(public sanitizer: DomSanitizer, private activateRoute: ActivatedRoute, private youtubeService: YoutubeService) {
    this.activateRoute.queryParams.subscribe((params: Params) => {
      if (params.video) {
        this.videoId = params.video;
        this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${this.videoId}?autoplay=1`);
        this.getVideo();
      }
    });

  }

  ngOnInit(): void {
  }


  getVideo() {
    const query: VideoDetailReq = new VideoDetailReq();
    query.id = [this.videoId];
    this.youtubeService.getVideosDetails(query).subscribe((res) => {
      if (res.items && res.items[0]) {
        const item = res.items[0];
        this.data = new Video(
          item.id.videoId,
          item.snippet.title,
          item.snippet.description,
          new Date(item.snippet.publishedAt),
          item.snippet.thumbnails.medium.url,
          item.statistics)
      }
    })
  }

}
