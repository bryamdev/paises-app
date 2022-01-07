import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { Country } from '../interfaces/pais.interface';
//import { Observable, of } from 'rxjs';
//import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams (){
    return new HttpParams().set( 'fields', 'name,capital,population,flags,cca2');
  }

  constructor(private http: HttpClient) { }

  //of: funcion que genera observables
  buscarPaisPorNombre( termino: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>( url, { params : this.httpParams }  );
            /*.pipe(
              catchError( err => of([])) //cuando hay error se retorna nuevo observable con array vacio
            );*/
  }

  buscarPaisPorCapital( termino: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>( url, { params : this.httpParams }  );
  }

  buscarPaisPorCodigo( id: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>( url );
  }

  buscarPaisPorRegion( termino: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${termino}`;
    return this.http.get<Country[]>( url, { params : this.httpParams } );
  }

}
