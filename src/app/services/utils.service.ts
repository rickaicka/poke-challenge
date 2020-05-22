import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  reverseTypes(types){
    return types.slice().reverse();
  }

  filterSprites(sprites){
    let filteredSprite: String;
    Object.keys(sprites).forEach(function(k){
      if(k == 'front_default'){
        filteredSprite = sprites[k];
      }
    });
    return filteredSprite;
  }

  convertDecimeterToCentimeter(dm){
    return dm * 10;
  }

  convertHectogramToKilogram(hg){
    return hg / 10;
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
