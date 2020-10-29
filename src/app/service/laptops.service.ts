import { Injectable } from '@angular/core';
import { ILaptop } from '../model/laptops.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaptopsService {

  constructor(private http: HttpClient) { }
  
  
  createLaptop(value: ILaptop):Observable<any> {
      return this.http.post('https://super-rest.herokuapp.com/david/laptops',value);
  }

  getLaptops():Observable<[ILaptop]> {
    return this.http.get<[ILaptop]>('https://super-rest.herokuapp.com/david/laptops');
}


getLaptop(value: string):Observable<ILaptop> {
  return this.http.get<ILaptop>('https://super-rest.herokuapp.com/david/laptops/'+value);
}

deleteLaptop(value: string) {
  return this.http.delete('https://super-rest.herokuapp.com/david/laptops/'+value);
}

editLaptop(id:string, value: ILaptop) {
  return this.http.put('https://super-rest.herokuapp.com/david/laptops/'+id, value);
}

}
