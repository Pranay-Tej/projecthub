import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectRepoService {
  constructor(private httpClient: HttpClient) {}

  // utils
  getUrl = () => `${environment.baseURL}/project-repos`;

  getUrlWithId = (id) => `${environment.baseURL}/project-repos/${id}`;

  getProjectRepos(projectId: string) {
    return this.httpClient.get(`${this.getUrl()}/?projectId=${projectId}`);
  }
}
