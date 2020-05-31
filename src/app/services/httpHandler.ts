import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpHandler {


  public headers = new HttpHeaders();

  constructor(
    private http: HttpClient) { }


  public get(url: string, params: HttpParams = undefined): Observable<any> {
    return this.http.get(url, {
      params: params,
      headers: this.headers
    });
  }

//   public delete(url: string, params: HttpParams = undefined): Observable<any> {
//     params.append('token', this.toekn);
//     return this.http.delete(this.baseUrl + url, {
//       params: params,
//       headers: this.headers
//     });
//   }

//   public put(url: string, body: any): Observable<any> {
//     return this.http.put(this.baseUrl + url, body, { headers: this.headers });
//   }

//   public post(url: string, body: any): Observable<any> {
//     return this.http.post(this.baseUrl + url, body, { headers: this.headers });
//   }

}