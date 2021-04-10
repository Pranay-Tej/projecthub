import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectFacade } from '../../store/project.facade';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.css'],
})
export class DeleteProjectDialogComponent implements OnInit {
  deleteOperation: string;
  constructor(
    private projectFacade: ProjectFacade,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.projectFacade.deleteOperation$.subscribe((data: any) => {
      if (data === 'OK') {
        this.dialogRef.close();
      }
      this.deleteOperation = data;
    });
  }

  deleteProject() {
    this.projectFacade.deleteProject(this.data.projectId);
  }
}
