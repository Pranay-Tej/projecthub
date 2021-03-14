import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class RepoService {
  constructor(private httpClient: HttpClient) {}

  // utils
  getUrl = () => `${environment.baseURL}/repos`;

  getUrlWithId = (id) => `${environment.baseURL}/repos/${id}`;

  getAllRepos() {
    return this.httpClient.get(this.getUrl());
  }
}
