import { Store } from '@ngrx/store';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import projectActions from '../../store/project.actions';
import projectSelectors from '../../store/project.selectors';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import { ProjectFacade } from '../../store/project.facade';

@Component({
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css'],
})
export class ProjectDialogComponent implements OnInit, OnDestroy {
  projectLoadOperation$: string;
  saveOperation$: string;
  projectForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.required,
      Validators.maxLength(35),
    ]),
    url: this.formBuilder.control(''),
    website: this.formBuilder.control(''),
    user: this.formBuilder.control(''),
  });
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private projectFacade: ProjectFacade,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    if (this.data.projectId !== '') {
      this.store.dispatch(
        projectActions.loadProject({ id: this.data.projectId })
      );
    }

    this.subscriptions.add(
      this.projectFacade.projectLoadOperation$.subscribe((status: string) => {
        console.log({ projectLoadOperation: status });
        this.projectLoadOperation$ = status;
      })
    );

    this.subscriptions.add(
      this.store.select(projectSelectors.project).subscribe((data) => {
        if (!data) {
          return;
        }
        const { name, url, website, user } = data;
        this.projectForm.setValue({ name, url, website, user });
      })
    );

    this.subscriptions.add(
      this.projectFacade.saveOperation$.subscribe((status: string) => {
        console.log({ projectSaveOperation: status });
        this.saveOperation$ = status;
        if (status === httpCallStatus.OK) {
          this.dialogRef.close();
        }
      })
    );
  }

  saveProject() {
    // console.log(this.projectForm.getRawValue());
    if (this.data.projectId === '') {
      this.createProject();
    } else {
      this.updateProject(this.data.projectId);
    }
  }

  createProject() {
    const project = { ...this.projectForm.getRawValue(), user: 'Pranay-Tej' };
    this.store.dispatch(projectActions.createProject({ project }));
  }

  updateProject(projectId: string) {
    this.store.dispatch(
      projectActions.updateProject({
        project: this.projectForm.value,
        id: projectId,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
