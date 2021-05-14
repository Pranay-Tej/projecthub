import { httpCallStatus } from './../../../shared/constants/constants';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ProjectDialogComponent } from '../../project-list/project-dialog/project-dialog.component';
import projectRepoActions from '../../store/project-repo.actions';
import { ProjectRepoFacade } from '../../store/project-repo.facade';
import projectRepoSelectors from '../../store/project-repo.selectors';
import projectSelectors from '../../store/project.selectors';

@Component({
  templateUrl: './edit-repo-projects-dialog.component.html',
  styleUrls: ['./edit-repo-projects-dialog.component.css'],
})
export class EditRepoProjectsDialogComponent implements OnInit, OnDestroy {
  loadProjectListOfRepoOperation$: string;
  projectList$ = [];
  filteredProjectList = [];
  filterForm: FormGroup = this.formBuilder.group({
    projectName: this.formBuilder.control(''),
  });
  httpCallStatus = httpCallStatus;
  projectListOfRepo$: Set<string> = new Set<string>();
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private projectRepoFacade: ProjectRepoFacade,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    if (this.data.repoId !== '') {
      this.store.dispatch(
        projectRepoActions.loadProjectListOfRepo({ repoId: this.data.repoId })
      );
    }

    this.subscriptions.add(
      this.projectRepoFacade.projectListOfRepoLoadOperation$.subscribe(
        (status: string) => {
          console.log({ projectListOfRepoLoadOperation: status });
          this.loadProjectListOfRepoOperation$ = status;
        }
      )
    );

    this.subscriptions.add(
      this.store.select(projectSelectors.projectList).subscribe((data: any) => {
        this.projectList$ = data;
        this.filteredProjectList = data;
      })
    );

    this.subscriptions.add(
      this.store
        .select(projectRepoSelectors.projectListOfRepo)
        .subscribe((data: any) => {
          const projectListofRepo = data.map((project) => project._id);
          this.projectListOfRepo$ = new Set<string>(projectListofRepo);
        })
    );

    this.filterForm
      .get('projectName')
      .valueChanges.pipe(
        distinctUntilChanged(),
        tap((val) => this.applyFilters(val))
      )
      .subscribe();
  }

  applyFilters(searchTerm) {
    this.filteredProjectList = this.projectList$.filter((project) =>
      new RegExp(searchTerm, 'i').test(project.name)
    );
  }

  toggleProjectForRepo(event: any, projectId: string, projectRepoId: string) {
    if (event.checked === true) {
      // console.log('add', projectId, this.data.repoId);
      this.store.dispatch(
        projectRepoActions.add({ projectId, repoId: this.data.repoId })
      );
    } else {
      // console.log('remove', projectId, this.data.repoId);
      this.store.dispatch(
        projectRepoActions.remove({ projectId, repoId: this.data.repoId })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
