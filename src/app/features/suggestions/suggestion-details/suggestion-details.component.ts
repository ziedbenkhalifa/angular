import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId!: number;
  suggestion!: Suggestion;

  // Liste statique des suggestions (à remplacer par un service plus tard)
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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis les paramètres de la route
    this.route.params.subscribe(params => {
      this.suggestionId = +params['id']; // Le '+' convertit en number
      this.loadSuggestion();
    });
  }

  loadSuggestion(): void {
    // Trouver la suggestion correspondant à l'ID
    const found = this.suggestions.find(s => s.id === this.suggestionId);
    if (found) {
      this.suggestion = found;
    } else {
      // Si la suggestion n'existe pas, rediriger vers 404
      this.router.navigate(['/404']);
    }
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
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