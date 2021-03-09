import { Component, OnInit, Output } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemons = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };
  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {    
    window.scrollTo(0,0);
    this.pokedexService.GetPokemons().subscribe((data: any) => {
      this.pokemons = data;
    });
  }
}
