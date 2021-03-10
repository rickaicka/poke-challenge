import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PokedexService } from 'src/app/services/pokedex.service';
@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss']
})
export class CardPokemonComponent implements OnInit {

  constructor(
    public router: Router, 
    public pokedexService: PokedexService
  ) { }

  @Input() pokemons: any;
  prevPage = false;
  ngOnInit(): void {
  }  
  @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    const uA = navigator.userAgent;
    if(pos == max && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(uA)))   {
      this.NextPokemons()
    }
  }

  NextPokemons(){
    if(this.pokemons){
      this.pokedexService.GetPokemons(this.pokemons.next).subscribe((data: any) => {
        this.pokemons.next = data.next;
        data.results.forEach(element => {
          this.pokemons.results.push(element)
        });
      });
    }
  }

}
