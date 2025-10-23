import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ScrollArrowComponent } from '../scroll-arrow/scroll-arrow.component';
import { HeroData } from '../../interfaces/hero-data.interface';

/**
 * Composant pour la section principale (hero) avec titre, sous-titre et navigation
 * Optimisé avec OnPush change detection pour les performances
 */
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ScrollArrowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './hero-section.component.css',
  template: `
    <section class="hero-section" id="home">
      <div class="hero-section__content">
        <!-- Titre principal -->
        <h1 class="hero-section__title">{{ data.title }}</h1>
        
        <!-- Sous-titre -->
        @if (data.subtitle) {
          <p class="hero-section__subtitle">{{ data.subtitle }}</p>
        }
      </div>
      
      <!-- Flèche de navigation vers le bas -->
      @if (data.about) {
        <div class="hero-section__arrow">
          <app-scroll-arrow
            direction="down"
            [target]="'#about'"
            [customTitle]="'Découvrir la suite'"
            [customAriaLabel]="'Aller à la section À propos'">
          </app-scroll-arrow>
        </div>
      }
    </section>
  `
})
export class HeroSectionComponent {
  /**
   * Configuration du contenu de la section hero
   */
  @Input({ required: true }) data!: HeroData;
}