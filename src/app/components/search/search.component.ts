import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchValue: string;
  public numOfWatchLaterVideos: number;
  constructor(private router: Router, private activateRoute: ActivatedRoute, private youtubeService: YoutubeService) {
    this.activateRoute.queryParams.subscribe((params: Params) => {
      if (params.query) {
        this.searchValue = params.query;
        this.youtubeService.updateSearchValue(this.searchValue);
      }
    });

    // this.watchLaterSubscription = this.youtubeService.getWatchLater().subscribe((list: Set<string>) => {
    //   this.numOfWatchLaterVideos = list.size;
    // })
  }

  ngOnInit() {
  }

  search() {
    if(this.searchValue){
      this.router.navigate(['/results'], { queryParams: { query: this.searchValue } });
    }
  }

  // watchLater() {
  //   this.router.navigate(['/watchLater']);
  // }

  // ngOnDestroy(){
  //   this.watchLaterSubscription.unsubscribe();
  // }

}
