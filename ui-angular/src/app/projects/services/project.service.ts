import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  // utils
  getUrl = () => `${environment.baseURL}/projects`;

  getUrlWithId = (id) => `${environment.baseURL}/projects/${id}`;

  getAllProjects() {
    return this.httpClient.get(this.getUrl());
  }
}
