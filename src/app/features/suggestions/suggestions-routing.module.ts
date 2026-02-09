import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: SuggestionsComponent,
    children: [
      // Route par défaut du module : affiche la liste
      { path: '', component: SuggestionListComponent },
      
      // Route paramétrée : affiche les détails d'une suggestion
      { path: ':id', component: SuggestionDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }