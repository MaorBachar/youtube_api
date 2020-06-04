import { Injectable } from '@angular/core';
import { HttpHandler } from './httpHandler';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { VideoDetailReq } from '../models/requests/video-detail.model';
import { VideoSearchReq } from '../models/requests/video-search.model';
import { RelatedVideoReq } from '../models/requests/related-videos.model';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService extends HttpHandler {
  private searchSubject = new BehaviorSubject<string>(null);
  private watchLaterSubject = new BehaviorSubject<Set<string>>(this.getWatchLaterFromStorage());
  private watchVideoSubject = new BehaviorSubject<Video>(null);
  private resultsListSubject = new BehaviorSubject<Video[]>(null);
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3/';
  private key: string = 'AIzaSyCZuK70ylA_l81Y_mZ_EnJNrF3OKJ2Si1Q';

  // fetching data of videos by string
  public getSearchedVideos(query: VideoSearchReq) {
    const path = 'search';
    query.key = this.key;
    const params: HttpParams = query.toHttpParams();
    return this.get(this.baseUrl + path, params);
  }
  // fetching extra data of videos  (likes, dislikes, views..)
  public getVideosDetails(query: VideoDetailReq) {
    const path = "videos";
    query.key = this.key;
    const params: HttpParams = query.toHttpParams();
    return this.get(this.baseUrl + path, params);
  }
  // get related videos by video id.
  public getRelatedVideos(query: RelatedVideoReq) {
    const path = 'search';
    query.key = this.key;
    const params: HttpParams = query.toHttpParams();
    return this.get(this.baseUrl + path, params);
  }
  // update results page that there is new string to search.
  public updateSearchValue(value: string): void {
    this.searchSubject.next(value);
  }

  public getSearchValue(): Observable<string> {
    return this.searchSubject.asObservable();
  }
  // return set of watch later - videos ids from storage
  public getWatchLaterFromStorage(): Set<string> {
    const parsedData: Array<string> = JSON.parse(localStorage.getItem('watchLater'));
    return parsedData ? new Set(parsedData) : new Set();
  }
  // add video Id to watch later list, save to localstorage and update all subscribers - there is new update
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

  // update all subscribers that media player needs to play the selected video.
  public triggerWatchVideo(video:Video): void{
    this.watchVideoSubject.next(video);
  }

  public getWatchVideo() {
    return this.watchVideoSubject.asObservable();
  }
  // update player subscriber in order to manage playlist (next , prev videos)
  updateResultsList(videos:Video[]):void{
    this.resultsListSubject.next(videos);
  }

  getResultsList(){
    return this.resultsListSubject.asObservable();
  }
}
