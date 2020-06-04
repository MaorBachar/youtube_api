import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';

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
        // set search input value from url query
        this.searchValue = params.query;
      } else{
        // default search input value 
        this.searchValue = 'music'
      }

      // update subscriber - results page needs to trigger search by string
      this.youtubeService.updateSearchValue(this.searchValue);
    });
  }

  ngOnInit() {
  }

  search() {
    if(this.searchValue){
      this.router.navigate(['/search'], { queryParams: { query: this.searchValue } });
    }
  }

}
