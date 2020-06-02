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
  private watchLaterSubject = new BehaviorSubject<Set<string>>(this.getWatchLaterFromStorage());
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3/';
  private key: string = 'AIzaSyBD8vOusQyT1hOgGVI_H37ZOqsXrplCvCg';


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

  public getWatchLaterFromStorage(): Set<string> {
    const parsedData: Array<string> = JSON.parse(localStorage.getItem('watchLater'));
    return  parsedData ? new Set(parsedData) : new Set();
  }

  public addToWatchList(videoId: string): void {
    const list: Set<string> = this.getWatchLaterFromStorage();
    list.add(videoId);
    localStorage.setItem('watchLater', JSON.stringify(Array.from(list)));
    this.watchLaterSubject.next(list);
  }

  public removeFromWatchList(videoId: string): void {
    const list: Set<string> = this.getWatchLaterFromStorage();
    list.delete(videoId);
    localStorage.setItem('watchLater', JSON.stringify(Array.from(list)));
    this.watchLaterSubject.next(list);

  }

  public getWatchLater(): Observable<Set<string>> {
    return this.watchLaterSubject.asObservable();
  }
}
