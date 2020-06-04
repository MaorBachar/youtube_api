import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultsComponent } from './pages/results/results.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimeagoModule } from 'ngx-timeago';
import { NgxYoutubePlayerModule  } from "ngx-youtube-player";

import { HttpHandler } from './services/httpHandler';
import { VideoSearchItemComponent } from './components/video-search-item/video-search-item.component';

import { VideoStatisticsComponent } from './components/video-statistics/video-statistics.component';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { WatchLaterComponent } from './pages/watch-later/watch-later.component';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { NavComponent } from './components/nav/nav.component';
import { NavItemComponent } from './components/nav/nav-item/nav-item.component';
import { NavDividerComponent } from './components/nav/nav-divider/nav-divider.component';
import { SearchComponent } from './components/search/search.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    VideoSearchItemComponent,
    VideoStatisticsComponent,
    ShortNumberPipe,
    LoaderComponent,
    WatchLaterComponent,
    NoResultsComponent,
    NavComponent,
    NavItemComponent,
    NavDividerComponent,
    SearchComponent,
    PlayerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatBadgeModule,
    MatMenuModule,
    MatTooltipModule,
    TimeagoModule.forRoot(),
    NgxYoutubePlayerModule.forRoot()

  ],
  providers: [HttpHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
