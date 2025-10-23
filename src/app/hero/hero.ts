import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';
import { AboutSectionComponent } from '../components/about-section/about-section.component';
import { HeroData } from '../interfaces/hero-data.interface';

/**
 * Composant Hero principal refactorisé avec architecture clean
 * Utilise les signaux Angular et la détection de changement OnPush pour les performances
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeroSectionComponent, AboutSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hero-container">
      <!-- Section Hero -->
      <app-hero-section [data]="heroData()"></app-hero-section>
      
      <!-- Section About -->
      <app-about-section [data]="aboutData()"></app-about-section>
    </div>
  `,
  styles: [`
    .hero-container {
      width: 100%;
      height: 100%;
    }
    
    /* Scroll snapping pour les sections */
    app-hero-section,
    app-about-section {
      scroll-snap-align: start;
    }
  `]
})
export class Hero {
  /**
   * Configuration des données du hero avec signal pour la réactivité
   */
  protected readonly heroData = signal<HeroData>({
    title: 'LYRICS MAKER',
    subtitle: 'I CAN DO IT',
    about: {
      title: 'À propos du Créateur de Paroles Karaoké',
      description: 'Synchronisez parfaitement vos morceaux audio avec leurs paroles grâce à nos outils de calage ultra-précis.',
      features: [
        { 
          title: 'Timing Ultra-Précis', 
          description: 'Synchronisation image par image pour un rendu professionnel',
          icon: '🎯'
        },
        { 
          title: 'Interface Simple', 
          description: 'Des outils faciles à utiliser pour ajuster rapidement vos paroles',
          icon: '🎨'
        },
        { 
          title: 'Export Multi-Format', 
          description: 'Sauvegardez en LRC, SRT, JSON et bien d\'autres formats',
          icon: '📄'
        }
      ],
      scrollTarget: '#hero'
    }
  });

  /**
   * Configuration des données about pour le composant AboutSection
   */
  protected readonly aboutData = computed(() => {
    return this.heroData().about;
  });
}
