import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  baseurl = 'http://pokeapi.co/api/v2';
  private limitPerPage = 50;

  constructor(private http: HttpClient, private utils: UtilsService) { }

  GetPokemons(pagination?): Observable<any> {
      return this.http.get<any>((pagination ? pagination : this.baseurl + '/pokemon/?&offset=0&limit=' + this.limitPerPage))
      .pipe(
        tap(res => {
          res.results.forEach(element => {         
            this.GetPokemonByName(element.name).subscribe(e => {
              element.sprite = this.utils.filterSprites(e.sprites);
              element.id = e.id;
              element.types = this.utils.reverseTypes(e.types);
            });       
          });
        }),
        retry(1),
        catchError(this.utils.errorHandl)
      ) 
  }

  GetPokemonByName(name: string): Observable<any>{
    return this.http.get<any>(this.baseurl + '/pokemon/' + name)
      .pipe(
        tap(res => {   
          res.types = this.utils.reverseTypes(res.types);
          this.GetFlavorTexts(res.species.url).subscribe(a => {
            res.flavor_text = a.flavor_text_entries[0]; 
          });
        }),
        retry(1),
        catchError(this.utils.errorHandl)
      )
  }

  GetFlavorTexts(url): Observable<any>{
    return this.http.get<any>(url)
    .pipe(
      tap(res => {
        res.flavor_text_entries = res.flavor_text_entries.filter(txt => txt.language.name === 'en')
      }),
      retry(1),
      catchError(this.utils.errorHandl)
    )
  }
}
