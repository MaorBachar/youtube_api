import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-video-statistics',
  templateUrl: './video-statistics.component.html',
  styleUrls: ['./video-statistics.component.scss']
})
export class VideoStatisticsComponent implements OnInit {
  @Input() data: Video;
  public list = {
    likeCount: 'thumb_up',
    dislikeCount: 'thumb_down',
    favoriteCount:'favorite',
    commentCount:'comment',
    viewCount:'visibility'
  }

  public listOrder: Array<string> = ['viewCount','likeCount','dislikeCount','favoriteCount', 'commentCount'];
  constructor() { }

  ngOnInit(): void {
  }

}
