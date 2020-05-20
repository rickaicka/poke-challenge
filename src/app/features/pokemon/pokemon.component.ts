import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon: {}
  constructor(public pokedexService: PokedexService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pokedexService.GetPokemonByName(this.route.snapshot.params.name).subscribe((data: any) => {
      this.pokemon = data;
    });
  }

}
