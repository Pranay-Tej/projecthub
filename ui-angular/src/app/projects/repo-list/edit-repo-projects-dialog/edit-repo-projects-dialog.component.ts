import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ProjectDialogComponent } from '../../project-list/project-dialog/project-dialog.component';
import { ProjectRepoFacade } from '../../store/project-repo.facade';
import projectActions from '../../store/project.actions';
import projectSelectors from '../../store/project.selectors';

@Component({
  templateUrl: './edit-repo-projects-dialog.component.html',
  styleUrls: ['./edit-repo-projects-dialog.component.css'],
})
export class EditRepoProjectsDialogComponent implements OnInit, OnDestroy {
  projectList$ = [];
  filteredProjectList = [];
  filterForm: FormGroup = this.formBuilder.group({
    projectName: this.formBuilder.control(''),
  });
  projectListOfRepo: Set<string> = new Set<string>();
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private projectRepoFacade: ProjectRepoFacade,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(projectSelectors.projectList).subscribe((data: any) => {
        this.projectList$ = data;
        this.filteredProjectList = data;
      })
    );

    this.filterForm
      .get('projectName')
      .valueChanges.pipe(
        distinctUntilChanged(),
        tap((val) => this.applyFilters(val))
      )
      .subscribe();

    const projectListOfRepoSubscription$ = this.projectRepoFacade.projectListOfRepo$.subscribe(
      (data: any) => {
        const projectListofRepo = data.map((project) => project._id);
        this.projectListOfRepo = new Set<string>(projectListofRepo);
      }
    );

    if (this.data.repoId !== '') {
      this.projectRepoFacade.getProjectListOfRepo(this.data.repoId);
    }

    // subscriptions
    this.subscriptions.add(projectListOfRepoSubscription$);
  }

  applyFilters(searchTerm) {
    this.filteredProjectList = this.projectList$.filter((project) =>
      new RegExp(searchTerm, 'i').test(project.name)
    );
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
