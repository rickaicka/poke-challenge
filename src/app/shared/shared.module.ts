import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeaderComponent} from './header/header.component';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import {MatCardModule} from '@angular/material/card';
import { TypePokemonComponent } from './components/type-pokemon/type-pokemon.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    HeaderComponent,
    CardPokemonComponent,
    TypePokemonComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  exports: [
    HeaderComponent,
    CardPokemonComponent,
    TypePokemonComponent,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressBarModule
  ]
})
export class SharedModule { }
