import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  
 
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  
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
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.suggestionForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[A-Z][a-zA-Z ]*$')  
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(30)
        ]
      ],
      category: ['', Validators.required],
      date: [{ value: this.getCurrentDate(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  // Obtenir la date actuelle au format YYYY-MM-DD
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Générer un nouvel ID auto-incrémenté
  generateNewId(): number {
    if (this.suggestions.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.suggestions.map(s => s.id));
    return maxId + 1;
  }

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.suggestionForm.valid) {
      // Créer la nouvelle suggestion
      const newSuggestion: Suggestion = {
        id: this.generateNewId(),
        title: this.suggestionForm.get('title')?.value,
        description: this.suggestionForm.get('description')?.value,
        category: this.suggestionForm.get('category')?.value,
        date: new Date(),
        status: 'en_attente',
        nbLikes: 0
      };

   
      this.suggestions.push(newSuggestion);
      
   
      alert(`✅ Suggestion "${newSuggestion.title}" ajoutée avec succès !`);
      
    
      this.router.navigate(['/suggestions']);
    }
  }


  onCancel(): void {
    this.router.navigate(['/suggestions']);
  }

 
  get title() {
    return this.suggestionForm.get('title');
  }

  get description() {
    return this.suggestionForm.get('description');
  }

  get category() {
    return this.suggestionForm.get('category');
  }
}