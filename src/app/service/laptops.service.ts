import { Injectable } from '@angular/core';
import { ILaptop } from '../model/laptops.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaptopsService {

  constructor(private http: HttpClient) { }
  createLaptop(value: ILaptop){
  return this.http.post('https://super-rest.herokuapp.com/david/laptops',value);
  }
}
