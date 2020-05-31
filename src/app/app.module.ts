import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { WatchComponent } from './pages/watch/watch.component';
import { ResultsComponent } from './pages/results/results.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimeagoModule } from 'ngx-timeago';

import { HttpHandler } from './services/httpHandler';
import { VideoSearchItemComponent } from './components/video-search-item/video-search-item.component';

import { VideoStatisticsComponent } from './components/video-statistics/video-statistics.component';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { WatchLaterComponent } from './pages/watch-later/watch-later.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WatchComponent,
    ResultsComponent,
    VideoSearchItemComponent,
    VideoStatisticsComponent,
    ShortNumberPipe,
    LoaderComponent,
    WatchLaterComponent

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
    TimeagoModule.forRoot()

  ],
  providers: [HttpHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
