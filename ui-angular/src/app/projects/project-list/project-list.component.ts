import { RepoFacade } from './../store/repo.facade';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProjectFacade } from '../store/project.facade';
import { Observable } from 'rxjs';

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
    private repoFacade: RepoFacade
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
}
