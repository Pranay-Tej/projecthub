import { ProjectRepoFacade } from './../store/project-repo.facade';
import { ProjectFacade } from './../store/project.facade';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RepoFacade } from '../store/repo.facade';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditRepoProjectsDialogComponent } from './edit-repo-projects-dialog/edit-repo-projects-dialog.component';
import { RepoDialogComponent } from './repo-dialog/repo-dialog.component';
@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent implements OnInit {
  repoList = [];
  filteredRepoList = [];
  filterForm: FormGroup;
  selectedProjectId: string;

  constructor(
    private repoFacade: RepoFacade,
    private projectRepoFacade: ProjectRepoFacade,
    private projectFacade: ProjectFacade,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.repoFacade.reloadRepoListTrigger$.subscribe((_) => {
      if (this.selectedProjectId === 'ALL') {
        this.repoFacade.getAllRepos();
      } else {
        this.repoFacade.getRepoListOfProject(this.selectedProjectId);
      }
    });

    this.repoFacade.repoList$.subscribe((data: any) => {
      this.repoList = data;
      this.filteredRepoList = data;
    });

    this.projectFacade.selectedProject$.subscribe(
      (data: any) => (this.selectedProjectId = data)
    );

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
    this.filteredRepoList = this.repoList.filter((repo) =>
      new RegExp(searchTerm, 'i').test(repo.name)
    );
  }

  openRepoDialog(repoId: string) {
    const dialogRef = this.dialog.open(RepoDialogComponent, {
      width: '300px',
      data: {
        repoId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.selectedProjectId === 'ALL') {
        this.repoFacade.getAllRepos();
      } else {
        console.log(result);
        if (repoId === '') {
          this.projectRepoFacade.add(this.selectedProjectId, result);
        }
      }
    });
  }

  editProjects(repoId: string) {
    const dialogRef = this.dialog.open(EditRepoProjectsDialogComponent, {
      width: '300px',
      data: {
        repoId,
      },
    });
  }

  deleteRepo(id: string) {
    this.repoFacade.deleteRepo(id);
  }
}
