import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KittySimulatorService {

  constructor(
    private httpService: HttpClient
  ) { }

  breeds(): Observable<any[]> {
    return this.httpService.get<any[]>('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key' : '99f2bb88-b35c-459b-9bc5-01b88f924fa7'
      }
    });
  }

  getCat(breed: string) {
    return this.httpService.get(`https://api.thecatapi.com/v1/images/search?breed_id=${breed}`, {
      headers: {
        'x-api-key' : '99f2bb88-b35c-459b-9bc5-01b88f924fa7'
      }
    });
  }
}
