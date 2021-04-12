import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { RepoFacade } from '../../store/repo.facade';

@Component({
  templateUrl: './delete-repo-dialog.component.html',
  styleUrls: ['./delete-repo-dialog.component.css'],
})
export class DeleteRepoDialogComponent implements OnInit {
  deleteOperation: string;
  constructor(
    private repoFacade: RepoFacade,
    public dialogRef: MatDialogRef<DeleteRepoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.repoFacade.deleteOperation$.subscribe((data: any) => {
      if (data?.status === 'OK') {
        this.dialogRef.close();
      }
      this.deleteOperation = data?.status;
    });
  }

  deleteRepo() {
    this.repoFacade.deleteRepo(this.data.repoId);
  }
}
