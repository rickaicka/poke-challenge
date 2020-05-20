import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardPokemonComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CardPokemonComponent,
    MatCardModule
  ]
})
export class SharedModule { }
