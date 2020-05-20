import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss']
})
export class CardPokemonComponent implements OnInit {

  constructor() { }

  @Input() pokemons: any;

  ngOnInit(): void {
  }

}
