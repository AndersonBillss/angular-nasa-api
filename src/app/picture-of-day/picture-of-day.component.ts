import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

//services
import { PictureOfDayService } from '../picture-of-day.service';

//components
import { MainInputComponent } from '../main-input/main-input.component';
import { loadingSpinnerComponent } from '../loading-bar/loading-spinner.component';

@Component({
  selector: 'app-picture-of-day',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MainInputComponent,
    FormsModule,
    loadingSpinnerComponent,
  ],
  providers: [PictureOfDayService],
  templateUrl: './picture-of-day.component.html',
  styleUrl: './picture-of-day.component.css'
})
export class PictureOfDayComponent implements OnInit {
  isLoading: boolean = true

  month: string =''
  day: string = ''
  year: string = ''

  placeholderMonth: string = ''
  placeholderDay: string = ''
  placeholderYear: string = ''
  
  data: any;

  constructor(private pictureOfDayService: PictureOfDayService){ }

  fadeIn(element: HTMLElement){
    if(element.classList.contains('fade-out')){
      element.classList.remove('fade-out')
    }
    element.classList.add("fade-in")
  }

  ngOnInit(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();   

    this.placeholderMonth = `${currentMonth}`
    this.placeholderDay= `${currentDay}`
    this.placeholderYear = `${currentYear}`

    this.getImgOfDay(this.placeholderMonth, this.placeholderDay, this.placeholderYear)
  }


  getImgOfDay(month: string, day: string, year: string){
    this.isLoading = true
    this.data = undefined

    if(month.length == 1){
      month = `0${month}`
    }
    if(day.length == 1){
      day = `0${day}`
    }
    if(month.length == 2 && day.length == 2 && year.length == 4){
      this.pictureOfDayService.getPictureOfDay(month, day, year).pipe(
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe((data: any) => {
        this.data = data
      })
    }
  }
}
