import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import {
  trigger,
  state,
  animate,
  transition,
  style
} from "@angular/animations";
import { Router } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-video-search-item',
  templateUrl: './video-search-item.component.html',
  styleUrls: ['./video-search-item.component.scss'],
  animations: [
    trigger('anim', [
      transition(':enter', [
        style({ width: 0 }),
        animate(100, style({ width: '*' })),
      ]),
      transition(':leave', [
        style({ width: '*', }),
        animate(100, style({ width: 0 })),
      ]),
    ]),
  ]
})
export class VideoSearchItemComponent implements OnInit {
  @Input() video: Video;
  @Input() isWatchLater: boolean = false;
  @Input() withDescription: boolean = true;
  @Input() withWatchLater: boolean = false;
  @Input() withActions: boolean = false;
  @Input() withRemoveAction: boolean = false;
  @Output() removeAction = new EventEmitter();

  public watchLaterHover: boolean = false;
  constructor(private router: Router, private youtubeService: YoutubeService) { }

  ngOnInit(): void {
  }

  watch(): void {
    this.router.navigate(['/watch'], { queryParams: { video: this.video.id } });
  }

  toggleWatchLater(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isWatchLater) {
      this.youtubeService.addToWatchList(this.video.id);
    } else {
      this.youtubeService.removeFromWatchList(this.video.id);
    }
  }

  public removeActionOnClick(video: Video): void {
    this.removeAction.emit(video);
  }
}


