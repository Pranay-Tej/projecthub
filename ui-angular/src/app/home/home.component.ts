import { authSelectors } from './../auth/store/auth.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userId$ = this.store.select(authSelectors.user);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
