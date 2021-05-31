import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ProjectHub';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get(`${environment.baseURL}`).subscribe(() => {
      console.log('contact api');
    });
  }
}
