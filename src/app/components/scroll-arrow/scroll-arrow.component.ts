import { Component, Input, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

/**
 * Composant pour les flèches de navigation avec animation et fonctionnalité de scroll
 * Supporte les directions up et down avec styles personnalisables
 */
@Component({
  selector: 'app-scroll-arrow',
  standalone: true,
  template: `
    <button 
      class="scroll-arrow"
      [class.scroll-arrow--up]="direction === 'up'"
      [class.scroll-arrow--down]="direction === 'down'"
      (click)="handleScrollClick()"
      [attr.aria-label]="computedAriaLabel"
      [title]="computedTitle">
      <svg 
        class="scroll-arrow__icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2">
        <path 
          [attr.d]="svgPath" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>
      </svg>
    </button>
  `,
  styles: [`
    .scroll-arrow {
      --arrow-size: 3rem;
      --arrow-padding: 0.75rem;
      --arrow-color: rgba(139, 69, 19, 0.9);
      --arrow-hover-color: rgba(160, 82, 45, 1);
      --arrow-bg: rgba(255, 255, 255, 0.1);
      --arrow-hover-bg: rgba(255, 255, 255, 0.2);
      --arrow-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
      --arrow-border: 2px solid rgba(139, 69, 19, 0.6);
      
      width: var(--arrow-size);
      height: var(--arrow-size);
      background: var(--arrow-bg);
      backdrop-filter: blur(10px);
      border: var(--arrow-border);
      border-radius: 50%;
      color: var(--arrow-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--arrow-padding);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--arrow-shadow);
      position: relative;
      overflow: hidden;
    }

    .scroll-arrow:hover {
      color: var(--arrow-hover-color);
      background: var(--arrow-hover-bg);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
    }

    .scroll-arrow:active {
      transform: translateY(0);
      box-shadow: var(--arrow-shadow);
    }

    .scroll-arrow__icon {
      width: 100%;
      height: 100%;
      transition: transform 0.2s ease;
    }

    .scroll-arrow--up .scroll-arrow__icon {
      transform: rotate(0deg);
    }

    .scroll-arrow--down .scroll-arrow__icon {
      transform: rotate(0deg);
    }

    .scroll-arrow:hover .scroll-arrow__icon {
      transform: scale(1.1);
    }

    /* Animation de pulsation pour attirer l'attention */
    .scroll-arrow::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid var(--arrow-color);
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.6;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0.3;
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.6;
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .scroll-arrow {
        --arrow-size: 2.5rem;
        --arrow-padding: 0.6rem;
      }
    }
  `]
})
export class ScrollArrowComponent {
  private readonly scrollService = inject(ScrollService);

  /**
   * Direction de la flèche (up pour monter, down pour descendre)
   */
  @Input() direction: 'up' | 'down' = 'down';

  /**
   * Cible du scroll (sélecteur CSS ou élément HTML)
   */
  @Input() target?: string;

  /**
   * Titre pour l'accessibilité et le tooltip
   */
  @Input() customTitle?: string;

  /**
   * Label ARIA pour l'accessibilité
   */
  @Input() customAriaLabel?: string;

  /**
   * Type de comportement de scroll
   */
  @Input() behavior: ScrollBehavior = 'smooth';

  /**
   * Offset en pixels pour le scroll
   */
  @Input() offset: number = 0;

  /**
   * Chemin SVG dynamique basé sur la direction
   */
  get svgPath(): string {
    return this.direction === 'up'
      ? 'M18 15l-6-6-6 6'  // Flèche vers le haut
      : 'M6 9l6 6 6-6';    // Flèche vers le bas
  }

  /**
   * Génère automatiquement les labels d'accessibilité si non fournis
   */
  get computedAriaLabel(): string {
    return this.customAriaLabel || `Scroll ${this.direction === 'up' ? 'vers le haut' : 'vers le bas'}`;
  }

  get computedTitle(): string {
    return this.customTitle || `Cliquez pour scroller ${this.direction === 'up' ? 'vers le haut' : 'vers le bas'}`;
  }

  /**
   * Gère le clic sur la flèche et effectue le scroll approprié
   */
  async handleScrollClick(): Promise<void> {
    try {
      if (this.target) {
        // Scroll vers une cible spécifique
        if (this.offset !== 0) {
          await this.scrollService.scrollToElementWithOffset(
            this.target, 
            this.offset, 
            this.behavior
          );
        } else {
          await this.scrollService.scrollToElement(
            this.target, 
            this.behavior,
            this.direction === 'up' ? 'end' : 'start'
          );
        }
      } else {
        // Scroll vers le haut par défaut si pas de cible
        if (this.direction === 'up') {
          await this.scrollService.scrollToTop(this.behavior);
        } else {
          console.warn('ScrollArrow: Aucune cible spécifiée pour le scroll vers le bas');
        }
      }
    } catch (error) {
      console.error('Erreur lors du scroll:', error);
    }
  }
}