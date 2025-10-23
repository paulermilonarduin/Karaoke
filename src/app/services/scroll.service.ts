import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollTarget } from '../interfaces/hero-data.interface';

/**
 * Service gérant les fonctionnalités de scroll avec gestion d'erreurs
 * et animation fluide pour l'application karaoke
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly document = inject(DOCUMENT);

  /**
   * Scroll vers un élément avec animation fluide et gestion d'erreurs
   * @param target - Cible de scroll (sélecteur CSS ou élément HTML)
   * @param behavior - Type d'animation (smooth par défaut)
   * @param block - Position verticale dans la viewport
   */
  scrollToElement(
    target: ScrollTarget | string, 
    behavior: ScrollBehavior = 'smooth',
    block: ScrollLogicalPosition = 'start'
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        let element: Element | null = null;

        // Résolution de l'élément cible
        if (typeof target === 'string') {
          element = this.document.querySelector(target);
        } else if (target instanceof Element) {
          element = target;
        }

        if (!element) {
          const targetStr = typeof target === 'string' ? target : 'Element';
          throw new Error(`Élément cible introuvable: ${targetStr}`);
        }

        // Vérification de la disponibilité du scroll smooth
        if (!('scrollIntoView' in element)) {
          throw new Error('scrollIntoView non supporté sur cet élément');
        }

        // Configuration du scroll
        const scrollOptions: ScrollIntoViewOptions = {
          behavior,
          block,
          inline: 'nearest'
        };

        // Exécution du scroll avec timeout de sécurité
        element.scrollIntoView(scrollOptions);

        // Délai pour permettre l'animation
        setTimeout(() => {
          resolve();
        }, behavior === 'smooth' ? 800 : 0);

      } catch (error) {
        console.error('Erreur lors du scroll:', error);
        reject(error);
      }
    });
  }

  /**
   * Scroll vers le haut de la page
   */
  async scrollToTop(behavior: ScrollBehavior = 'smooth'): Promise<void> {
    try {
      this.document.documentElement.scrollTo({
        top: 0,
        behavior
      });
      
      // Attendre l'animation
      if (behavior === 'smooth') {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    } catch (error) {
      console.error('Erreur lors du scroll vers le haut:', error);
      throw error;
    }
  }

  /**
   * Vérifie si un élément est visible dans la viewport
   * @param target - Élément à vérifier
   * @returns true si l'élément est visible
   */
  isElementVisible(target: ScrollTarget | string): boolean {
    try {
      let element: Element | null = null;

      if (typeof target === 'string') {
        element = this.document.querySelector(target);
      } else if (target instanceof Element) {
        element = target;
      }

      if (!element) return false;

      const rect = element.getBoundingClientRect();
      const viewport = {
        width: this.document.documentElement.clientWidth,
        height: this.document.documentElement.clientHeight
      };

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= viewport.height &&
        rect.right <= viewport.width
      );
    } catch (error) {
      console.error('Erreur lors de la vérification de visibilité:', error);
      return false;
    }
  }

  /**
   * Obtient la position de scroll actuelle
   */
  getScrollPosition(): { x: number; y: number } {
    return {
      x: this.document.documentElement.scrollLeft || this.document.body.scrollLeft || 0,
      y: this.document.documentElement.scrollTop || this.document.body.scrollTop || 0
    };
  }

  /**
   * Scroll avec offset personnalisé
   * @param target - Élément cible
   * @param offset - Décalage en pixels (positif = plus bas, négatif = plus haut)
   */
  async scrollToElementWithOffset(
    target: ScrollTarget | string,
    offset: number = 0,
    behavior: ScrollBehavior = 'smooth'
  ): Promise<void> {
    try {
      let element: Element | null = null;

      if (typeof target === 'string') {
        element = this.document.querySelector(target);
      } else if (target instanceof Element) {
        element = target;
      }

      if (!element) {
        throw new Error(`Élément introuvable pour le scroll avec offset`);
      }

      const rect = element.getBoundingClientRect();
      const scrollTop = this.getScrollPosition().y;
      const targetPosition = scrollTop + rect.top + offset;

      this.document.documentElement.scrollTo({
        top: targetPosition,
        behavior
      });

      // Attendre l'animation
      if (behavior === 'smooth') {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    } catch (error) {
      console.error('Erreur lors du scroll avec offset:', error);
      throw error;
    }
  }
}