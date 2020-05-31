import { Component, OnInit, Input } from '@angular/core';
import { Statistics, Video } from 'src/app/models/video.model';

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
    commentCount:'comment'
  }

  public listOrder: Array<string> = ['likeCount','dislikeCount','favoriteCount', 'commentCount'];
  constructor() { }

  ngOnInit(): void {
  }

}
