import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectRepoService {
  constructor(private httpClient: HttpClient) {}

  // utils
  getUrl = () => `${environment.baseURL}/project-repos`;

  getUrlWithId = (id) => `${environment.baseURL}/project-repos/${id}`;

  getRepoListOfProject(projectId: string) {
    return this.httpClient.get(`${this.getUrl()}/?projectId=${projectId}`);
  }

  getProjectListOfRepo(repoId: string) {
    return this.httpClient.get(`${this.getUrl()}/?repoId=${repoId}`);
  }

  create(projectId: string, repoId: string) {
    return this.httpClient.post(`${this.getUrl()}`, {
      projectId: projectId,
      repoId: repoId,
      user: 'Pranay-Tej',
    });
  }

  remove(projectId: string, repoId: string) {
    return this.httpClient.delete(
      `${this.getUrl()}?projectId=${projectId}&repoId=${repoId}`
    );
  }
}
