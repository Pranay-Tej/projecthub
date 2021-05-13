import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import projectRepoActions from '../store/project-repo.actions';
import projectActions from '../store/project.actions';
import projectSelectors from '../store/project.selectors';
import repoActions from '../store/repo.actions';
import { RepoFacade } from '../store/repo.facade';
import repoSelectors from '../store/repo.selectors';
import { httpCallStatus } from './../../shared/constants/constants';
import { DeleteRepoDialogComponent } from './delete-repo-dialog/delete-repo-dialog.component';
import { EditRepoProjectsDialogComponent } from './edit-repo-projects-dialog/edit-repo-projects-dialog.component';
import { RepoDialogComponent } from './repo-dialog/repo-dialog.component';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent implements OnInit, OnDestroy {
  repoList$ = [];
  filteredRepoList = [];
  selectedProjectId$: string;
  loadOperationStatus$: string;
  filterForm: FormGroup = this.formBuilder.group({
    repoName: this.formBuilder.control(''),
  });
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private repoFacade: RepoFacade,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(repoSelectors.repoList).subscribe((data: any) => {
        this.repoList$ = data;
        this.filteredRepoList = data;
      })
    );

    this.store
      .select(projectSelectors.selectedProjectId)
      .subscribe((data: any) => {
        if (!data) {
          this.store.dispatch(
            projectActions.setSelectedProjectId({ id: 'ALL' })
          );
        }
        this.store.dispatch(repoActions.reloadRepoList());
        this.selectedProjectId$ = data;
      });

    this.subscriptions.add(
      // this.store
      //   .select(repoSelectors.loadOperationStatus)
      //   .subscribe((data: any) => {
      //     this.loadOperationStatus$ = data;
      //   })
      this.repoFacade.repoListLoadOperation$.subscribe(
        (status: string) => (this.loadOperationStatus$ = status)
      )
    );

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
    this.filteredRepoList = this.repoList$.filter((repo) =>
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
      this.store.dispatch(repoActions.resetDialogData());
      this.repoFacade.setRepoLoadOperation(httpCallStatus.OK);

      if (
        this.selectedProjectId$ &&
        this.selectedProjectId$ !== 'ALL' &&
        repoId === '' &&
        result
      ) {
        console.log('projectId', this.selectedProjectId$);

        this.store.dispatch(
          projectRepoActions.add({
            projectId: this.selectedProjectId$,
            repoId: result,
          })
        );
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

  confirmDeleteRepo(repoId: string, repoName: string) {
    const dialogRef = this.dialog.open(DeleteRepoDialogComponent, {
      width: '300px',
      data: {
        repoId,
        repoName,
      },
    });

    dialogRef.afterClosed().subscribe(() =>
      // this.store.dispatch(repoActions.setDeleteOperationStatus(null))
      this.repoFacade.setDeleteOperation(httpCallStatus.OK)
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
