import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "https://jsonplaceholder.typicode.com";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/users')

    .pipe(
      catchError(this.errorHandler)
    )
  }


  create(post:Post): Observable<any> {

    return this.httpClient.post(this.apiURL + '/users/', JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  find(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/users/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  update(id:number, post:Post): Observable<any> {

    return this.httpClient.put(this.apiURL + '/users/' + id, JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/users/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
