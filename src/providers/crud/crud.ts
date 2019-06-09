import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CrudProvider {

  host: string;

  constructor(public http: HttpClient) {
    // console.log('Hello CrudProvider Provider');
    this.host = 'http://localhost:3000/';
  }

  get(url: string, params?: any) {
    return this.http.get(this.host + url, { params: params }).toPromise()
  }

}
