import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon: any;
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  showPokemonInfo = false;
  constructor(
    private pokedexService: PokedexService, 
    private route: ActivatedRoute, 
    private utils: UtilsService
  ) {
    this.pokedexService.GetPokemonByName(this.route.snapshot.params.name).subscribe((data: any) => {
      data.sprites = this.utils.filterSprites(data.sprites);
      data.height = this.utils.convertDecimeterToCentimeter(data.height);
      data.weight = this.utils.convertHectogramToKilogram(data.weight);
      data.typeClass = 'title-type-' + data.types[0].type.name;
      this.pokemon = data;
    });
   }

  ngOnInit(): void {}

  getClassStat(stat){
    return 'type-stats-'+ stat;
  }

}
