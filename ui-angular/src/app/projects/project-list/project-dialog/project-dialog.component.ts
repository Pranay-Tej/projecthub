import { ProjectFacade } from './../../store/project.facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css'],
})
export class ProjectDialogComponent implements OnInit {
  projectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectFacade: ProjectFacade,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      url: this.formBuilder.control(''),
      website: this.formBuilder.control(''),
    });
  }

  saveProject() {
    if (this.data.repoId === '') {
      this.createProject();
    } else {
      this.updateProject(this.data.repoId);
    }
  }

  createProject() {
    console.log(this.projectForm.getRawValue());
    let project = { ...this.projectForm.getRawValue(), user: 'Pranay-Tej' };
    // let res =
    this.projectFacade.createProject(project);
    // if(res === 'OK'){

    // }
  }

  updateProject(repoId: string) {}
}
