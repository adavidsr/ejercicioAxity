import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private message = new Subject<string>();
  private loading = new Subject<boolean>();

  constructor() { }

  setMessage(msg: string){

    this.message.next(msg);
  }

  getMessage():Observable<string>{
    return this.message.asObservable();
  }

  setToken(token:string):void{
    sessionStorage.setItem('TOKEN', token);
  }

  userIsAuthenticated(): boolean {

    const token = sessionStorage.getItem('TOKEN');
    return token !== null && token !== undefined;
  }

  setLoading(load: boolean){
    this.loading.next(load);
  }

  getLoading():Observable<boolean>{
    return this.loading.asObservable();
  }
}
