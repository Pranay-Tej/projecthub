import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import projectActions from '../../store/project.actions';
import { ProjectFacade } from '../../store/project.facade';

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
    private projectFacade: ProjectFacade,
    public dialogRef: MatDialogRef<DeleteProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      // this.store
      //   .select(projectSelectors.deleteOperationStatus)
      //   .subscribe((data: any) => {
      //     if (data === httpCallStatus.OK) {
      //       this.dialogRef.close();
      //     }
      //     this.deleteOperation$ = data;
      //   })
      this.projectFacade.deleteOperation$.subscribe((status: string) => {
        console.log({ projectDeleteOperation: status });
        this.deleteOperation$ = status;
        if (status === httpCallStatus.OK) {
          this.dialogRef.close();
        }
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
