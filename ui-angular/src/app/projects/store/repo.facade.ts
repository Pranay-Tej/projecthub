import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RepoService } from '../services/repo.service';

@Injectable()
export class RepoFacade {
  constructor(private repoService: RepoService) {}

  private repoList = new Subject();

  repoList$ = this.repoList.asObservable();

  getAllRepos() {
    this.repoService
      .getAllRepos()
      .subscribe((data) => this.repoList.next(data));
  }
}
