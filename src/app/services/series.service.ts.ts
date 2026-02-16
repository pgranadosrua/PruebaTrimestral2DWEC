import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Serie } from '../model/serie/serie.model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {

  private url = "https://peticiones.online/api/series"
  private http = inject(HttpClient);

  findAll(){
    return this.http.get<Serie[]>(this.url);
  }

  insertOne(serieNueva : Serie){
    const body= {
     serieNueva
    }
    return this.http.post<Serie>(this.url, body);
  }

}
