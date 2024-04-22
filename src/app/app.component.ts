import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PictureOfDayComponent } from './picture-of-day/picture-of-day.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PictureOfDayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'mapping-project';

  ngOnInit(){

    
  }
}
