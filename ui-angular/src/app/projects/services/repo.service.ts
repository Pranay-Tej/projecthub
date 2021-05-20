import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class RepoService {
  constructor(private httpClient: HttpClient) {}

  // utils
  getUrl = () => `${environment.baseURL}/repos`;

  getUrlWithId = (id) => `${environment.baseURL}/repos/${id}`;

  getAllRepos(userId) {
    return this.httpClient.get(
      `${this.getUrl()}?userId=${userId}&_sort=name&_order=1&_limit=-1`
    );
  }

  getRepo(id: string) {
    return this.httpClient.get(`${this.getUrlWithId(id)}`);
  }

  create(repo: any) {
    return this.httpClient.post(`${this.getUrl()}`, repo);
  }

  update(repo: any, id: string) {
    return this.httpClient.put(`${this.getUrlWithId(id)}`, repo);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.getUrlWithId(id)}`);
  }
}
