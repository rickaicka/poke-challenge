import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  baseurl = 'http://pokeapi.co/api/v2';
  private limitPerPage = 48;

  constructor(private http: HttpClient) { }

  GetPokemons(pagination?): Observable<any> {
      return this.http.get<any>((pagination ? pagination : this.baseurl + '/pokemon/?&offset=0&limit=' + this.limitPerPage))
      .pipe(
        tap(res => {
          res.results.forEach(element => {         
            this.GetPokemonByName(element.name).subscribe(e => {
              Object.keys(e.sprites).forEach(function(k){
                if(k == 'front_default'){
                  element.sprite = e.sprites[k];
                }
              });
              element.id = e.id;
              element.types = this.reverseTypes(e.types);
            });       
          });
        }),
        retry(1),
        catchError(this.errorHandl)
      ) 
  }

  GetPokemonByName(name: string): Observable<any>{
    return this.http.get<any>(this.baseurl + '/pokemon/' + name)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  reverseTypes(types){
    return types.slice().reverse();
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
