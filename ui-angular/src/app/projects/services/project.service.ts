import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  // utils
  getUrl = () => `${environment.baseURL}/projects`;

  getUrlWithId = (id) => `${environment.baseURL}/projects/${id}`;

  getAllProjects(userId) {
    return this.httpClient.get(
      `${this.getUrl()}?userId=${userId}&_sort=name&_order=1&_limit=-1`
    );
  }

  getProject(id: string) {
    return this.httpClient.get(`${this.getUrlWithId(id)}`);
  }

  create(project) {
    return this.httpClient.post(this.getUrl(), project);
  }

  update(project, id) {
    return this.httpClient.put(this.getUrlWithId(id), project);
  }

  delete(id) {
    return this.httpClient.delete(this.getUrlWithId(id));
  }
}
