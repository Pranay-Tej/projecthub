import { distinctUntilChanged, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProjectFacade } from '../store/project.facade';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projectList = [];
  filteredProjectList = [];
  filterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectFacade: ProjectFacade
  ) {}

  ngOnInit(): void {
    this.projectFacade.getAllProjects();

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
}
