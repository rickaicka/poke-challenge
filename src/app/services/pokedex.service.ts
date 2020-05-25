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
              element.types = e.types;
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
          res.moves.forEach(mv => {
            mv.move.name = this.utils.removeHyphen(mv.move.name);
          });
          res.abilities.forEach(ab => {
            ab.ability.name = this.utils.removeHyphen(ab.ability.name);
          });
          res.stats.forEach(st => {
            st.stat.nameFormatted = this.utils.removeHyphen(st.stat.name);
          });
        }),
        retry(1),
        catchError(this.utils.errorHandl)
      )
  }

  GetFlavorTexts(url){
    return this.http.get<any>(url)
    .pipe(
      tap(res => {
        res.flavorSelected = this.utils.filterLanguage(res.flavor_text_entries, 'en');
      }),
      retry(1),
      catchError(this.utils.errorHandl)
    )
  };

  GetMoveDetails(moveUrl){
    return this.http.get<any>(moveUrl)
    .pipe(
      tap(res => {
        res.flavorSelected = this.utils.filterLanguage(res.flavor_text_entries, 'en');
        res.effectSelected = this.utils.filterLanguage(res.effect_entries, 'en');
        res.nameFormatted = this.utils.removeHyphen(res.name);
      }),
      retry(1),
      catchError(this.utils.errorHandl)
    )
  };

  GetAbilityDetails(moveUrl){
    return this.http.get<any>(moveUrl)
    .pipe(
      tap(res => {
        res.flavorSelected = this.utils.filterLanguage(res.flavor_text_entries, 'en');
        res.effectSelected = this.utils.filterLanguage(res.effect_entries, 'en');
      }),
      retry(1),
      catchError(this.utils.errorHandl)
    )
  }
}
