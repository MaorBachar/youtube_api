import { Injectable } from '@angular/core';
import { Pagination } from '../models/pagination.model';
import { HttpHandler } from './httpHandler';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { VideoDetailReq } from '../models/requests/video-detail.model';
import { VideoSearchReq } from '../models/requests/video-search.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService extends HttpHandler {
  private searchSubject = new BehaviorSubject<string>(null);
  private watchLaterSubject = new BehaviorSubject<object>(this.getWatchLaterFromStorage());
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3/';
  private key: string = '';


  public getSearchedVideos(query: VideoSearchReq) {
    const path = 'search';
    query.key = this.key;
    const params: HttpParams = query.toHttpParams();
    return this.get(this.baseUrl + path, params);
  }

  public getVideosDetails(query: VideoDetailReq) {
    const path = "videos";
    query.key = this.key;
    const params: HttpParams = query.toHttpParams();
    return this.get(this.baseUrl + path, params);
  }

  public updateSearchValue(value: string): void {
    this.searchSubject.next(value);
  }

  public getSearchValue(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  public getWatchLaterFromStorage(): Array<string> {
    return JSON.parse(localStorage.getItem('watchLater')) ? JSON.parse(localStorage.getItem('watchLater')) : new Object();
  }
  public updateWatchLater(videoId: string, method: string): void {
    const list: object = this.getWatchLaterFromStorage();
    switch (method) {
      case 'add':
        list[videoId] = true;
        break;
      case 'delete':
        delete list[videoId];
        break;
    }
    localStorage.setItem('watchLater', JSON.stringify(list));
    this.watchLaterSubject.next(list);
  }

  public getWatchLater(): Observable<object> {
    return this.watchLaterSubject.asObservable();
  }
}
