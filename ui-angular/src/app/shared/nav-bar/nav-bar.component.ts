import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let theme: string = localStorage.getItem('projecthub-theme') || 'dark';
    if (theme) {
      document.body.classList.remove('dark');
      document.body.classList.remove('light');
      document.body.classList.add(theme);
    }
  }

  setLightTheme() {
    localStorage.setItem('projecthub-theme', 'light')
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }

  setDarkTheme(){
    localStorage.setItem('projecthub-theme', 'dark');
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  }
}
