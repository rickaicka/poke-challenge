import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  baseurl = 'http://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  GetPokemons(pagination?): Observable<any> {
    if(pagination){
      return this.http.get<any>(pagination)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    } else {
      return this.http.get<any>(this.baseurl + '/pokemon/?&offset=0&limit=50')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }    
  }

  GetPokemonByName(name: string): Observable<any>{
    return this.http.get<any>(this.baseurl + '/pokemon/' + name)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
