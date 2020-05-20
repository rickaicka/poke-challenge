import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

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
        tap(res => {
          res.results.forEach(element => {          
            this.GetPokemonByName(element.name).subscribe(e => {
              Object.keys(e.sprites).forEach(function(k){
                if(k == 'front_default'){
                  element.sprite = e.sprites[k];
                }
              });
            });            
          });
        }),
        retry(1),
        catchError(this.errorHandl)
      )
    } else {
      return this.http.get<any>(this.baseurl + '/pokemon/?&offset=0&limit=47')
      .pipe(
        tap(res => {
          res.results.forEach(element => {         
            this.GetPokemonByName(element.name).subscribe(e => {
              Object.keys(e.sprites).forEach(function(k){
                if(k == 'front_default'){
                  element.sprite = e.sprites[k];
                }
              });
            });       
          });
        }),
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
