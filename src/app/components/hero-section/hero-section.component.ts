import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ScrollArrowComponent } from '../scroll-arrow/scroll-arrow.component';

export interface HeroContent {
  title: string;
  subtitle: string;
  scrollTarget?: string;
}

/**
 * Composant pour la section hero avec titre, sous-titre et flèche de navigation
 * Optimisé avec OnPush change detection pour les performances
 */
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ScrollArrowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero-section" id="hero">
      <div class="hero-section__content">
        <h1 class="hero-section__title">{{ content.title }}</h1>
        <p class="hero-section__subtitle">{{ content.subtitle }}</p>
        
        @if (content.scrollTarget) {
          <div class="hero-section__arrow">
            <app-scroll-arrow
              direction="down"
              [target]="content.scrollTarget"
              [customTitle]="'Découvrir la suite'"
              [customAriaLabel]="'Aller à la section À propos'">
            </app-scroll-arrow>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background: var(--gradient-purple, 
        radial-gradient(ellipse at center, 
          rgba(75, 0, 130, 0.9) 0%, 
          rgba(25, 25, 112, 0.8) 50%, 
          rgba(72, 61, 139, 0.7) 100%)
      );
      color: white;
      text-align: center;
      padding: var(--spacing-lg, 2rem);
    }

    .hero-section__content {
      max-width: 800px;
      margin: 0 auto;
      animation: var(--fade-in-animation, fadeInUp 1s ease-out);
    }

    .hero-section__title {
      font-size: clamp(2.5rem, 8vw, 6rem);
      font-weight: 700;
      line-height: 1.2;
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
      text-shadow: var(--purple-glow, 0 0 30px rgba(138, 43, 226, 0.8));
      font-family: var(--font-family, 'Helvetica Neue', Helvetica, Arial, sans-serif);
    }

    .hero-section__subtitle {
      font-size: clamp(1rem, 4vw, 1.5rem);
      font-weight: 300;
      line-height: 1.6;
      margin: 0 0 var(--spacing-xl, 3rem) 0;
      opacity: 0.9;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      font-family: var(--font-family, 'Helvetica Neue', Helvetica, Arial, sans-serif);
    }

    .hero-section__arrow {
      display: flex;
      justify-content: center;
      margin-top: var(--spacing-xl, 3rem);
    }

    /* Animations de base (fallback si les animations globales ne sont pas chargées) */
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
      .hero-section {
        padding: var(--spacing-md, 1.5rem);
      }

      .hero-section__title {
        text-shadow: 0 0 20px rgba(138, 43, 226, 0.6);
      }

      .hero-section__subtitle {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 480px) {
      .hero-section {
        padding: var(--spacing-sm, 1rem);
      }
    }
  `]
})
export class HeroSectionComponent {
  /**
   * Configuration du contenu de la section hero
   */
  @Input({ required: true }) content!: HeroContent;
}