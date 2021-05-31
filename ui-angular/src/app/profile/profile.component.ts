import { httpCallStatus } from './../shared/constants/constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string;
  profile: any;
  fetchProfileStatus$;
  userNotFound = false;
  httpCallStatus = httpCallStatus;

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const username = <string>params['username'];
      if (username != null) {
        // console.log(username);
        this.username = username;
        this.fetchProfile(username).subscribe(
          (data) => {
            // console.log(data);
            this.fetchProfileStatus$ = this.httpCallStatus.OK;
            this.profile = data;
          },
          (e) => {
            console.error(e);
            this.fetchProfileStatus$ = this.httpCallStatus.ERROR;
          }
        );
      }
    });
  }

  fetchProfile(username) {
    this.fetchProfileStatus$ = this.httpCallStatus.LOADING;
    return this.profileService.checkUsername(username).pipe(
      switchMap(() => {
        return this.profileService.fetchProfile(username);
      }),
      catchError((e) => {
        this.fetchProfileStatus$ = this.httpCallStatus.ERROR;
        if (e.status === 404) {
          this.userNotFound = true;
        }
        console.error(e);
        return EMPTY;
      })
    );
  }
}
