import { Component } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {
  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  favoritesList: Suggestion[] = [];

 
  searchTerm: string = '';

  
  incrementLikes(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  
  addToFavorites(suggestion: Suggestion): void {
    const exists = this.favoritesList.find(s => s.id === suggestion.id);
    if (!exists) {
      this.favoritesList.push(suggestion);
      alert(`"${suggestion.title}" ajouté aux favoris !`);
    } else {
      alert(`"${suggestion.title}" est déjà dans les favoris !`);
    }
  }

  
  getFilteredSuggestions(): Suggestion[] {
    if (!this.searchTerm) {
      return this.suggestions;
    }
    
    const term = this.searchTerm.toLowerCase();
    return this.suggestions.filter(s => 
      s.title.toLowerCase().includes(term) || 
      s.category.toLowerCase().includes(term)
    );
  }

 
  getStatusClass(status: string): string {
    switch(status) {
      case 'acceptee': return 'badge bg-success';
      case 'refusee': return 'badge bg-danger';
      case 'en_attente': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  }


  getStatusText(status: string): string {
    switch(status) {
      case 'acceptee': return 'Acceptée';
      case 'refusee': return 'Refusée';
      case 'en_attente': return 'En attente';
      default: return status;
    }
  }
}