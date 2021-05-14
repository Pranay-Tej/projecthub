import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import repoActions from '../../store/repo.actions';
import { RepoFacade } from './../../store/repo.facade';

@Component({
  templateUrl: './delete-repo-dialog.component.html',
  styleUrls: ['./delete-repo-dialog.component.css'],
})
export class DeleteRepoDialogComponent implements OnInit, OnDestroy {
  deleteOperation$: string;
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private repoFacade: RepoFacade,
    public dialogRef: MatDialogRef<DeleteRepoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.repoFacade.deleteOperation$.subscribe((status: string) => {
        console.log({ repoDeleteOperation: status });
        this.deleteOperation$ = status;
        if (status === httpCallStatus.OK) {
          this.dialogRef.close();
        }
      })
    );
  }

  deleteRepo() {
    this.store.dispatch(repoActions.deleteRepo({ id: this.data.repoId }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
