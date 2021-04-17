import { httpCallStatus } from 'src/app/shared/constants/constants';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import repoActions from '../../store/repo.actions';
import repoSelectors from '../../store/repo.selectors';

@Component({
  templateUrl: './repo-dialog.component.html',
  styleUrls: ['./repo-dialog.component.css'],
})
export class RepoDialogComponent implements OnInit, OnDestroy {
  saveOperation$: string;
  repoForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', Validators.required),
    url: this.formBuilder.control(''),
    user: this.formBuilder.control(''),
  });
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<RepoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    if (this.data.repoId !== '') {
      this.store.dispatch(repoActions.loadRepo({ id: this.data.repoId }));
    }

    this.subscriptions.add(
      this.store.select(repoSelectors.repo).subscribe((data: any) => {
        if (!data) {
          return;
        }
        const { name, url, user } = data;
        this.repoForm.setValue({ name, url, user });
      })
    );

    this.subscriptions.add(
      this.store
        .select(repoSelectors.saveOperationStatus)
        .subscribe((data: any) => {
          // console.log(data);
          if (data?.status === httpCallStatus.OK) {
            this.dialogRef.close(data?.id);
          }
          this.saveOperation$ = data?.status;
        })
    );

    this.repoForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      url: this.formBuilder.control(''),
      user: this.formBuilder.control(''),
    });
  }

  saveRepo() {
    if (this.data.repoId === '') {
      this.createRepo();
    } else {
      this.updateRepo(this.data.repoId);
    }
  }

  createRepo() {
    const repo = { ...this.repoForm.getRawValue(), user: 'Pranay-Tej' };
    this.store.dispatch(repoActions.createRepo({ repo }));
  }

  updateRepo(repoId: string) {
    this.store.dispatch(
      repoActions.updateRepo({ repo: this.repoForm.value, id: repoId })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
