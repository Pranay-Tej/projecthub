import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../project-list/project-dialog/project-dialog.component';
import { ProjectFacade } from '../../store/project.facade';
import { ProjectRepoFacade } from '../../store/project-repo.facade';

@Component({
  templateUrl: './edit-repo-projects-dialog.component.html',
  styleUrls: ['./edit-repo-projects-dialog.component.css'],
})
export class EditRepoProjectsDialogComponent implements OnInit, OnDestroy {
  projectList = [];
  projectListOfRepo: Set<string> = new Set<string>();
  subscriptions: Subscription;

  constructor(
    private projectFacade: ProjectFacade,
    private projectRepoFacade: ProjectRepoFacade,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.subscriptions = new Subscription();

    const projectListSubscription$ = this.projectFacade.projectList$.subscribe(
      (data: any) => {
        this.projectList = data;
      }
    );

    const projectListOfRepoSubscription$ = this.projectRepoFacade.projectListOfRepo$.subscribe(
      (data: any) => {
        const projectListofRepo = data.map((project) => project._id);
        this.projectListOfRepo = new Set<string>(projectListofRepo);
      }
    );

    if (this.data.repoId !== '') {
      this.projectRepoFacade.getProjectListOfRepo(this.data.repoId);
    }

    this.projectFacade.getAllProjects();

    // subscriptions
    this.subscriptions.add(projectListSubscription$);
    this.subscriptions.add(projectListOfRepoSubscription$);
  }

  toggleProjectForRepo(event: any, projectId: string, projectRepoId: string) {
    if (event.checked === true) {
      console.log('add', projectId, this.data.repoId);
      this.projectRepoFacade.add(projectId, this.data.repoId);
    } else {
      console.log('remove', projectId, this.data.repoId);
      this.projectRepoFacade.remove(projectId, this.data.repoId);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
