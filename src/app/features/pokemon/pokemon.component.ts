import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonComponent implements OnInit, AfterViewChecked {

  panelOpenState = false;
  pokemon: any;
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  showPokemonInfo = true;

  @ViewChild('tabGroup') tabGroup;
  typeTabText = null;
  showTab = false;

  abilities = [];
  moves = [];

  constructor(
    private pokedexService: PokedexService, 
    private route: ActivatedRoute, 
    private utils: UtilsService,
    private cdr: ChangeDetectorRef
  ) {
    window.scrollTo(0,0);
    this.pokedexService.GetPokemonByName(this.route.snapshot.params.name).subscribe((data: any) => {
      this.pokedexService.GetFlavorTexts(data.species.url).subscribe(res =>{
        data.flavor_text = res.flavorSelected;
      });
      data.sprites = this.utils.filterSprites(data.sprites);
      data.height = this.utils.convertDecimeterToCentimeter(data.height);
      data.weight = this.utils.convertHectogramToKilogram(data.weight);
      data.typeClass = 'text-type-' + data.types[0].type.name;
      this.pokemon = data;
    });
   }

  ngOnInit(): void {    
    window.scrollTo(0,0);
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
    const bar = document.querySelectorAll('.simplebar-visible');
    if(bar.length > 0){
      bar.forEach(b =>{
        b.classList.add(this.pokemon.types[0].type.name, 'scrollbar-pokedex')
      })
    }
  }

  getClassStat(stat){
    return 'type-stats-'+ stat;
  }

  getMoveDetails(move){
    this.pokedexService.GetMoveDetails(move.url).subscribe(mv => {
      move.moveDetails = mv;
    });
  }

  getAbilityDetails(ability){
    this.pokedexService.GetAbilityDetails(ability.url).subscribe(ab => {
      ability.abilityDetails = ab;
    });
  }

  getTabSelected(){
    if(this.tabGroup?.selectedIndex > 0){
      this.typeTabText = this.tabGroup?.selectedIndex > 1 ? 'Ability' : this.typeTabText = 'Move';
    }
  }

  formatName(name): String{
    return name = this.utils.removeHyphen(name);
  }
}
