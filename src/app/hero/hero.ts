import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { HeroSectionComponent, HeroContent } from '../components/hero-section/hero-section.component';
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
      <app-hero-section [content]="heroContent()"></app-hero-section>
      
      <!-- Section About -->
      <app-about-section [data]="aboutData()"></app-about-section>
    </div>
  `,
  styles: [`
    .hero-container {
      /* Container principal pour les sections */
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
      title: 'About Karaoke Lyrics Maker',
      description: 'Create perfect synchronization between your audio tracks and lyrics with precision timing tools.',
      features: [
        { 
          title: 'Precise Timing', 
          description: 'Frame-accurate synchronization for professional results',
          icon: '🎯'
        },
        { 
          title: 'Easy Interface', 
          description: 'Intuitive tools for quick lyrics timing adjustment',
          icon: '🎨'
        },
        { 
          title: 'Multiple Formats', 
          description: 'Export to LRC, SRT, JSON, and other popular formats',
          icon: '📄'
        }
      ],
      scrollTarget: '#hero'
    }
  });

  /**
   * Configuration du contenu hero pour le composant HeroSection
   */
  protected readonly heroContent = computed<HeroContent>(() => {
    const data = this.heroData();
    return {
      title: data.title,
      subtitle: data.subtitle,
      scrollTarget: '#about'
    };
  });

  /**
   * Configuration des données about pour le composant AboutSection
   */
  protected readonly aboutData = computed(() => {
    return this.heroData().about;
  });
}
