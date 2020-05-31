import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private watchLaterSubscription: Subscription;
  searchValue: string;
  numOfWatchLaterVideos: number;
  constructor(private router: Router, private activateRoute: ActivatedRoute, private youtubeService: YoutubeService) {
    this.activateRoute.queryParams.subscribe((params: Params) => {
      if (params.query) {
        this.searchValue = params.query;
        this.youtubeService.updateSearchValue(this.searchValue);
      }
    });

    this.watchLaterSubscription = this.youtubeService.getWatchLater().subscribe((list: object) => {
      this.numOfWatchLaterVideos = Object.keys(list).length;
    })
  }

  ngOnInit(): void {
  }

  search(): void {
    this.router.navigate(['/results'], { queryParams: { query: this.searchValue } });
  }

  watchLater(): void {
    this.router.navigate(['/watchLater']);
  }

  ngOnDestroy(){
    this.watchLaterSubscription.unsubscribe();
  }

}
