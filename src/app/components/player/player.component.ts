import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from 'src/app/services/youtube.service';
import { RelatedVideoReq } from 'src/app/models/requests/related-videos.model';
import { Video } from 'src/app/models/video.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { trigger, transition, style, animate, state } from '@angular/animations';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [fadeInOnEnterAnimation(),
    trigger('toggleHeight', [
      state('hide', style({
          height: '0px',
          opacity: '0',
          overflow: 'hidden',
          // display: 'none'
      })),
      state('show', style({
          height: '*',
          opacity: '1',
          // display: 'block'
      })),
      transition('hide => show', animate('200ms ease-in')),
      transition('show => hide', animate('200ms ease-out'))
  ])
  ]
})
export class PlayerComponent implements OnInit {
  private watchSubscription: Subscription;
  private resultsListSubscription: Subscription;
  public resultsList: Video[];
  public ytEvent;
  public player: YT.Player;
  public video: Video;
  public videoId: string = ''
  public playerVars: object;
  public relatedVideos: Video[];
  constructor(public sanitizer: DomSanitizer, private youtubeService: YoutubeService) {
    this.playerVars = {
      host: 'http://wwww.youtube.com',
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      origin: 'http://localhost:4200'
    }
  }

  ngOnInit(): void {
    /* subscribing when there is update in results (scrolling / searching) in order
    *  updating the playlist (next,prev videos) while scrolling - / fetchin data.
    */
    this.resultsListSubscription = this.youtubeService.getResultsList().subscribe((videos: Video[]) => {
      if (videos) {
        this.resultsList = videos;
        if (this.video) {
          this.updatePlaylist(this.resultsList);
        }
      }
    })
    /* subscrbing to selected video from list (results/ watch later list)
    *  trigger play video and get the related videos of selected video.
    */
    this.watchSubscription = this.youtubeService.getWatchVideo().subscribe((video: Video) => {
      if (video) {
        this.video = video;
        this.videoId = video.id;
        this.player.loadVideoById(this.videoId);
        if (this.resultsList) {
          this.updatePlaylist(this.resultsList);
        }
        this.getRelatedVideos(this.videoId);
      }
    })
  }

  savePlayer(player) {
    this.player = player;
  }
  onStateChange(event) {
    this.ytEvent = event.data;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  nextVideo() {
    this.player.nextVideo();
  }

  prevVideo() {
    this.player.previousVideo();
  }

  updatePlaylist(videos: Video[]) {
    const videosIds: string[] = videos.map((video: Video) => video.id);
    const currVideoIdPlaying: number = videosIds.findIndex((vidId: string) => vidId == this.video.id);
    if (currVideoIdPlaying != -1) {
      this.player.loadPlaylist(videosIds, currVideoIdPlaying);
    }
  }

  getRelatedVideos(videoId: string) {
    const query: RelatedVideoReq = new RelatedVideoReq();
    query.relatedToVideoId = videoId;
    this.relatedVideos = [];
    this.youtubeService.getRelatedVideos(query).subscribe(res => {
      const items = res.items.map(item => new Video(
        item.id.videoId,
        item.channelTitle,
        item.snippet.title,
        item.snippet.description,
        new Date(item.snippet.publishedAt),
        item.snippet.thumbnails.medium.url,
      ));
      this.relatedVideos.push(...items);
    })
  }

  onDestroy() {
    this.resultsListSubscription.unsubscribe();
    this.watchSubscription.unsubscribe();
  }

}

