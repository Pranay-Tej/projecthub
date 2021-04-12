import { Subscription } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepoFacade } from '../../store/repo.facade';

@Component({
  templateUrl: './repo-dialog.component.html',
  styleUrls: ['./repo-dialog.component.css'],
})
export class RepoDialogComponent implements OnInit {
  repoForm: FormGroup;
  repoId: string;
  saveOperation: string;
  subscriptions: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private repoFacade: RepoFacade,
    public dialogRef: MatDialogRef<RepoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.subscriptions = new Subscription();

    const repoSubscription$ = this.repoFacade.repo$.subscribe((data: any) => {
      const { name, url, user } = data;
      this.repoId = data.repoId;
      this.repoForm.setValue({ name, url, user });
    });

    const saveOperationSubscription$ = this.repoFacade.saveOperation$.subscribe(
      (data: any) => {
        console.log(data);

        if (data?.status === 'OK') {
          this.dialogRef.close(data.id);
        }
        this.saveOperation = data?.status;
      }
    );

    this.repoForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      url: this.formBuilder.control(''),
      user: this.formBuilder.control(''),
    });

    if (this.data.repoId !== '') {
      this.repoFacade.getRepo(this.data.repoId);
    }

    this.subscriptions.add(repoSubscription$);
    this.subscriptions.add(saveOperationSubscription$);
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
    this.repoFacade.createRepo(repo);
  }

  updateRepo(repoId: string) {
    this.repoFacade.updateRepo(this.repoForm.value, repoId);
  }
}
