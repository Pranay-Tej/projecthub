import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RepoFacade } from '../store/repo.facade';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent implements OnInit {
  repoList = [];
  filteredReportList = [];
  filterForm: FormGroup;

  constructor(
    private repoFacade: RepoFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.repoFacade.getAllRepos();

    this.repoFacade.repoList$.subscribe((data: any) => {
      this.repoList = data;
      this.filteredReportList = data;
    });

    this.filterForm = this.formBuilder.group({
      repoName: this.formBuilder.control(''),
    });

    this.filterForm
      .get('repoName')
      .valueChanges.pipe(
        // debounceTime(50),
        distinctUntilChanged(),
        // filter((val) => val !== ''),
        // tap((val) => console.log(val)),
        tap((val) => this.applyFilters(val))
      )
      .subscribe();
  }

  applyFilters(searchTerm) {
    this.filteredReportList = this.repoList.filter((repo) =>
      new RegExp(searchTerm, 'i').test(repo.name)
    );
  }
}
