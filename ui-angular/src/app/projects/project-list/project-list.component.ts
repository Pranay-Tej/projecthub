import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ProjectFacade } from '../store/project.facade';
import { RepoFacade } from './../store/repo.facade';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projectList = [];
  filteredProjectList = [];
  filterForm: FormGroup;
  selectedProject: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private projectFacade: ProjectFacade,
    private repoFacade: RepoFacade,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectFacade.getAllProjects();

    this.projectFacade.selectedProject$.subscribe(
      (data: any) => (this.selectedProject = data)
    );

    this.projectFacade.projectList$.subscribe((data: any) => {
      (this.projectList = data), (this.filteredProjectList = data);
    });

    this.filterForm = this.formBuilder.group({
      projectName: this.formBuilder.control(''),
    });

    this.filterForm
      .get('projectName')
      .valueChanges.pipe(
        distinctUntilChanged(),
        tap((val) => this.applyFilters(val))
      )
      .subscribe();
  }

  applyFilters(searchTerm) {
    this.filteredProjectList = this.projectList.filter((project) =>
      new RegExp(searchTerm, 'i').test(project.name)
    );
  }

  fetchAllRepos() {
    this.repoFacade.getAllRepos();
  }

  fetchProjectRepos(projectId: string) {
    this.repoFacade.getProjectRepos(projectId);
  }

  openProjectDialog(repoId: string) {
    this.dialog.open(ProjectDialogComponent, {
      width: '300px',
      data: {
        repoId,
      },
    });
  }
}
