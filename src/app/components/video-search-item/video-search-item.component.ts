import { Component, OnInit, Input } from '@angular/core';
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
  @Input() withDescription: boolean = true;
  @Input() withWatchLater: boolean = true;
  @Input() isWatchLater: boolean = false;

  public watchLaterHover: boolean = false;
  constructor(private router: Router, private youtubeService: YoutubeService) { }

  ngOnInit(): void {
  }

  watch(): void {
    debugger
    this.router.navigate(['/watch'], { queryParams: { video: this.video.id } });
  }

  toggleWatchLater(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const method = !this.isWatchLater ? 'add' : 'delete'
    this.youtubeService.updateWatchLater(this.video.id, method);
  }
}


