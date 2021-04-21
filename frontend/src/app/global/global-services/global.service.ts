import { CONSTANT_URL } from './../../core/constants/response.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GlobalService<T> {

  public baseUrl = CONSTANT_URL.baseUrl;

  constructor(
    public http: HttpClient,
    public url: string
  ) {
    this.baseUrl = url;
  }
}
