import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProjectFacade } from './../../store/project.facade';

@Component({
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css'],
})
export class ProjectDialogComponent implements OnInit, OnDestroy {
  projectForm: FormGroup;
  repoId: string;
  saveOperation: string;
  subscriptions: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private projectFacade: ProjectFacade,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.subscriptions = new Subscription();

    const projectSubscription = this.projectFacade.project$.subscribe(
      (data: any) => {
        const { name, url, website, user } = data;
        this.projectForm.setValue({ name, url, website, user });
      }
    );

    const saveOperationSubscription = this.projectFacade.saveOperation$.subscribe(
      (status: any) => {
        console.log(status);
        if (status === 'OK') {
          this.dialogRef.close();
        } else {
          this.saveOperation = status;
        }
      }
    );

    this.projectForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      url: this.formBuilder.control(''),
      website: this.formBuilder.control(''),
      user: this.formBuilder.control(''),
    });

    this.repoId = this.data.repoId;

    if (this.data.repoId !== '') {
      this.projectFacade.getProject(this.repoId);
    }

    // all subscriptions
    this.subscriptions.add(projectSubscription);
    this.subscriptions.add(saveOperationSubscription);
  }

  saveProject() {
    console.log(this.projectForm.getRawValue());
    if (this.data.repoId === '') {
      this.createProject();
    } else {
      this.updateProject(this.data.repoId);
    }
  }

  createProject() {
    const project = { ...this.projectForm.getRawValue(), user: 'Pranay-Tej' };
    // let res =
    this.projectFacade.createProject(project);
    // if(res === 'OK'){

    // }
  }

  updateProject(repoId: string) {
    this.projectFacade.updateProject(this.projectForm.value, repoId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
