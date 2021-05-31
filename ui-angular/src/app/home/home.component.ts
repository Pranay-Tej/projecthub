import { authSelectors } from './../auth/store/auth.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userId$ = this.store.select(authSelectors.userId);
  featureList = [
    {
      title: 'GitHub Organizations',
      description:
        'GitHub does not have repository groups. GitHub organizations are not user specific.',
      sub: "For example, only one user can have 'react-learning' organization in GitHub.",
    },
    {
      title: 'Organize',
      description: 'Manage your projects and repos in one place.',
      sub: 'Organize as if repos are your songs and projects are your playlists.',
    },
    {
      title: 'Showcase',
      description: 'Share your username with anyone to showcase your profile.',
      sub: 'projecthub.com/profile/[your-username]',
    },
    {
      title: 'Dark Theme',
      description: 'The Dark Side welcomes you!',
      sub: 'Switch to dark theme and give in to the dark side!',
    },
    {
      title: 'Open Source',
      description:
        'ProjectHub is open source. Source code is available on GitHub. Contributions are welcome.',
    },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
