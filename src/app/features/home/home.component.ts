import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

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
  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.pokedexService.GetPokemons().subscribe((data: any) => {
      console.log(data)
      this.pokemons = data;
    });
  }

  NextPokemons(){
    if(this.pokemons){
      this.pokedexService.GetPokemons(this.pokemons.next).subscribe((data: any) => {
        this.pokemons = data;
      });
    }
  }
  PreviousPokemons(){
    if(this.pokemons){
      this.pokedexService.GetPokemons(this.pokemons.previous).subscribe((data: any) => {
        this.pokemons = data;
      });
    }
  }
}
