import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ScrollArrowComponent } from '../scroll-arrow/scroll-arrow.component';
import { AboutData, Feature } from '../../interfaces/hero-data.interface';

/**
 * Composant pour la section À propos avec fonctionnalités et navigation
 * Optimisé avec OnPush change detection pour les performances
 */
@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [ScrollArrowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './about-section.component.css',
  template: `
    <section class="about-section" id="about">
      <div class="about-section__container">
        <!-- En-tête de section -->
        <div class="about-section__header">
          <h2 class="about-section__title">{{ data.title }}</h2>
          <p class="about-section__description">{{ data.description }}</p>
        </div>

        <!-- Grille des fonctionnalités -->
        @if (data.features && data.features.length > 0) {
          <div class="about-section__features">
            @for (feature of data.features; track trackFeature($index, feature)) {
              <div class="feature-card">
                <div class="feature-card__icon">
                  {{ feature.icon }}
                </div>
                <h3 class="feature-card__title">{{ feature.title }}</h3>
                <p class="feature-card__description">{{ feature.description }}</p>
              </div>
            }
          </div>
        }

        <!-- Navigation vers le haut -->
        <div class="about-section__arrow">
          <app-scroll-arrow
            direction="up"
            [target]="'#home'"
            [customTitle]="'Retour en haut'"
            [customAriaLabel]="'Retourner à la section principale'">
          </app-scroll-arrow>
        </div>
      </div>
    </section>
  `
})
export class AboutSectionComponent {
  /**
   * Configuration des données de la section À propos
   */
  @Input({ required: true }) data!: AboutData;

  /**
   * Fonction de tracking pour NgFor (optimisation des performances)
   */
  trackFeature(index: number, feature: Feature): string {
    return feature.title;
  }
}