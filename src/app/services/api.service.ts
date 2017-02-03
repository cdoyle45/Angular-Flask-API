import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Person } from '../models/person.model'

@Injectable()
export class ApiService {
  constructor (private http: Http) {}
  //private serviceUrl = 'https://jsonplaceholder.typicode.com/';  // URL to web API
  private serviceUrl = 'http://localhost:5003/';  // URL to web API

  getAll(): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.serviceUrl+'people',options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getOne(name: string): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.serviceUrl+'people/'+name,options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  createUser(body: Object): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serviceUrl+"people", body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    // console.log("body", body);
    if (body.error){
      return body.error;
    } else {
      return body || { };
    }
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}