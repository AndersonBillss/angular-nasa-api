import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PictureOfDayService {
  private api_key: string = 'rH63HJNa5FSTpCFlm8jOk8l75qg7KtAenICkJcye'

  constructor(private http: HttpClient) { }
  
  getPictureOfDay(month: string, day: string, year: string) {
    const query =`&date=${year}-${month}-${day}`
    const apiUrl: string = `https://api.nasa.gov/planetary/apod?api_key=${this.api_key}${query}`
    return this.http.get<any>(apiUrl)
  }

  getPictures(search?: string){
    let apiUrl = `https://images-api.nasa.gov`
    if(search){
      apiUrl = `${apiUrl}/search?q=${search}`
    }
    return this.http.get<any>(apiUrl)
  }
  


}
