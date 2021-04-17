import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import projectSelectors from '../../store/project.selectors';
import projectActions from '../../store/project.actions';

@Component({
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.css'],
})
export class DeleteProjectDialogComponent implements OnInit, OnDestroy {
  deleteOperation$: string;
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<DeleteProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select(projectSelectors.deleteOperationStatus)
        .subscribe((data: any) => {
          if (data === httpCallStatus.OK) {
            this.dialogRef.close();
          }
          this.deleteOperation$ = data;
        })
    );
  }

  deleteProject() {
    this.store.dispatch(
      projectActions.deleteProject({ id: this.data.projectId })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
