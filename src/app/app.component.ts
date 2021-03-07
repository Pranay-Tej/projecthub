import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectHub';

  toggleTheme(){
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
  }
}
