import { authSelectors } from './../../auth/store/auth.selectors';
import { authActions } from './../../auth/store/auth.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userId$ = this.store.select(authSelectors.user);
  constructor(private store: Store) {}

  ngOnInit(): void {
    let theme: string = localStorage.getItem('projecthub-theme') || 'light';
    if (theme) {
      document.body.classList.remove('dark');
      document.body.classList.remove('light');

      document.body.classList.remove('mat-light-theme');
      document.body.classList.remove('mat-dark-theme');

      document.body.classList.add(theme);
      document.body.classList.add(`mat-${theme}-theme`);
    }
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }

  setLightTheme() {
    localStorage.setItem('projecthub-theme', 'light');
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    // material styles
    document.body.classList.remove('mat-dark-theme');
    document.body.classList.add('mat-light-theme');
  }

  setDarkTheme() {
    localStorage.setItem('projecthub-theme', 'dark');
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    // material styles
    document.body.classList.add('mat-dark-theme');
    document.body.classList.remove('mat-light-theme');
  }

  toggleSideBar() {
    document.querySelector('.projectList').classList.toggle('active');
  }
}
