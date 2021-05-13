import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ProjectFacade } from '../store/project.facade';
import projectSelectors from '../store/project.selectors';
import { httpCallStatus } from './../../shared/constants/constants';
import projectActions from './../store/project.actions';
import { DeleteProjectDialogComponent } from './delete-project-dialog/delete-project-dialog.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projectList$ = [];
  filteredProjectList = [];
  selectedProject$: string = null;
  loadOperationStatus$: string;
  filterForm: FormGroup = this.formBuilder.group({
    projectName: this.formBuilder.control(''),
  });
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private store: Store,
    private projectFacade: ProjectFacade
  ) {}

  ngOnInit(): void {
    this.store.dispatch(projectActions.loadProjectList());

    this.subscriptions.add(
      this.store
        .select(projectSelectors.selectedProjectId)
        .subscribe((data: any) => (this.selectedProject$ = data))
    );

    this.subscriptions.add(
      this.store.select(projectSelectors.projectList).subscribe((data: any) => {
        this.projectList$ = data;
        this.filteredProjectList = data;
      })
    );

    this.subscriptions.add(
      // this.store
      //   .select(projectSelectors.loadOperationStatus)
      //   .subscribe((data: any) => {
      //     this.loadOperationStatus$ = data;
      //   })
      this.projectFacade.projectListLoadOperation$.subscribe(
        (status: string) => {
          console.log({ projectListLoadOperation: status });
          this.loadOperationStatus$ = status;
        }
      )
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

  fetchAllRepos() {
    this.store.dispatch(projectActions.setSelectedProjectId({ id: 'ALL' }));
  }

  fetchRepoListOfProject(projectId: string) {
    this.store.dispatch(projectActions.setSelectedProjectId({ id: projectId }));
  }

  openProjectDialog(projectId: string) {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '300px',
      data: {
        projectId,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(projectActions.resetDialogData());
      this.projectFacade.setProjectLoadOperation(httpCallStatus.OK);
    });
  }

  confirmDeleteProject(projectId: string, projectName: string) {
    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      width: '300px',
      data: {
        projectId,
        projectName,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.store.dispatch(projectActions.setDeleteOperationStatus(null));
      this.projectFacade.setDeleteOperation(httpCallStatus.OK);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
