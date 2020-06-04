import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Video } from 'src/app/models/video.model';

import { YoutubeService } from 'src/app/services/youtube.service';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-video-search-item',
  templateUrl: './video-search-item.component.html',
  styleUrls: ['./video-search-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations:[fadeInOnEnterAnimation()]
})
export class VideoSearchItemComponent implements OnInit {
  @Input() video: Video;
  @Input() isWatchLater: boolean = false;
  @Input() withStatistics: boolean = true;
  @Input() withBorder:boolean = true;
  @Input() withWatchLater: boolean = false;
  @Input() withActions: boolean = false;
  @Input() withRemoveAction: boolean = false;
  @Output() removeAction = new EventEmitter();
  constructor( private youtubeService: YoutubeService) { }

  ngOnInit(): void {
  }

  // update subscriber (media player component) that video selected 
  watch(): void {
    this.youtubeService.triggerWatchVideo(this.video);
  }

  toggleWatchLater(event: Event): void {
    event.stopPropagation();
    if (!this.isWatchLater) {
      this.youtubeService.addToWatchList(this.video.id);
    } else {
      this.youtubeService.removeFromWatchList(this.video.id);
    }
  }

  // remove video from watch-later list
  public removeActionOnClick(video: Video): void {
    this.removeAction.emit(video);
  }


}


