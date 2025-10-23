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
        @if (data.scrollTarget) {
          <div class="about-section__arrow">
            <app-scroll-arrow
              direction="up"
              [target]="data.scrollTarget"
              [customTitle]="'Retour en haut'"
              [customAriaLabel]="'Retourner à la section principale'">
            </app-scroll-arrow>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      min-height: 100vh;
      padding: var(--spacing-xl, 3rem) var(--spacing-lg, 2rem);
      background: var(--gradient-purple-dark,
        radial-gradient(ellipse at center,
          rgba(25, 25, 112, 0.8) 0%,
          rgba(72, 61, 139, 0.7) 50%,
          rgba(75, 0, 130, 0.9) 100%)
      );
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .about-section__container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .about-section__header {
      text-align: center;
      margin-bottom: var(--spacing-xl, 3rem);
      animation: var(--fade-in-animation, fadeInUp 0.8s ease-out);
    }

    .about-section__title {
      font-size: clamp(2rem, 6vw, 3.5rem);
      font-weight: 700;
      margin: 0 0 var(--spacing-md, 1.5rem) 0;
      background: var(--metallic-gradient,
        linear-gradient(45deg,
          #C0C0C0 0%,
          #E6E6FA 25%,
          #C0C0C0 50%,
          #E6E6FA 75%,
          #C0C0C0 100%)
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% 100%;
      animation: var(--metallic-shine, metallicShine 3s ease-in-out infinite);
      font-family: var(--font-family, 'Helvetica Neue', Helvetica, Arial, sans-serif);
    }

    .about-section__description {
      font-size: clamp(1rem, 3vw, 1.25rem);
      font-weight: 300;
      line-height: 1.6;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
      font-family: var(--font-family, 'Helvetica Neue', Helvetica, Arial, sans-serif);
    }

    .about-section__features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-lg, 2rem);
      margin-bottom: var(--spacing-xl, 3rem);
    }

    .feature-card {
      background: var(--card-bg, rgba(255, 255, 255, 0.1));
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: var(--spacing-lg, 2rem);
      text-align: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation: var(--fade-in-up-delayed, fadeInUp 0.8s ease-out);
    }

    .feature-card:nth-child(2) {
      animation-delay: 0.2s;
    }

    .feature-card:nth-child(3) {
      animation-delay: 0.4s;
    }

    .feature-card:nth-child(4) {
      animation-delay: 0.6s;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      background: rgba(255, 255, 255, 0.15);
      box-shadow: var(--card-hover-shadow,
        0 20px 40px rgba(138, 43, 226, 0.3)
      );
    }

    .feature-card__icon {
      font-size: clamp(2rem, 5vw, 3rem);
      margin-bottom: var(--spacing-md, 1rem);
      filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
    }

    .feature-card__title {
      font-size: clamp(1.125rem, 4vw, 1.5rem);
      font-weight: 600;
      margin: 0 0 var(--spacing-sm, 1rem) 0;
      color: #E6E6FA;
      font-family: var(--font-family, 'Helvetica Neue', Helvetica, Arial, sans-serif);
    }

    .feature-card__description {
      font-size: clamp(0.875rem, 3vw, 1rem);
      font-weight: 300;
      line-height: 1.6;
      opacity: 0.85;
      margin: 0;
      font-family: var(--font-family, 'Helvetica Neue', Helvetica, Arial, sans-serif);
    }

    .about-section__arrow {
      display: flex;
      justify-content: center;
      margin-top: var(--spacing-xl, 3rem);
    }

    /* Animations de base (fallback) */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes metallicShine {
      0%, 100% {
        background-position: -200% 0;
      }
      50% {
        background-position: 200% 0;
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .about-section {
        padding: var(--spacing-lg, 2rem) var(--spacing-md, 1.5rem);
      }

      .about-section__features {
        grid-template-columns: 1fr;
        gap: var(--spacing-md, 1.5rem);
      }

      .feature-card {
        padding: var(--spacing-md, 1.5rem);
      }
    }

    @media (max-width: 480px) {
      .about-section {
        padding: var(--spacing-md, 1.5rem) var(--spacing-sm, 1rem);
      }

      .feature-card {
        padding: var(--spacing-sm, 1rem);
      }
    }
  `]
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