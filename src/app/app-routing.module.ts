import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'pokemon/:name', 
    loadChildren: () => import('./features/pokemon/pokemon.module').then(m => m.PokemonModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
