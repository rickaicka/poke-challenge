import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PokedexService } from '../services/pokedex.service';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [],
  imports: [    
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,    
    SharedModule, 
    NgbModule, 
    FontAwesomeModule,
    HttpClientModule,
    MatCardModule
  ],
  exports: [
    SharedModule,
    BrowserModule
  ],
  providers:[
    PokedexService
  ]
})
export class CoreModule { }
