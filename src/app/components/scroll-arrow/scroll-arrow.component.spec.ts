import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollArrowComponent } from './scroll-arrow.component';
import { ScrollService } from '../../services/scroll.service';

describe('ScrollArrowComponent', () => {
  let component: ScrollArrowComponent;
  let fixture: ComponentFixture<ScrollArrowComponent>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ScrollService', [
      'scrollToElement',
      'scrollToTop',
      'scrollToElementWithOffset'
    ]);

    await TestBed.configureTestingModule({
      imports: [ScrollArrowComponent],
      providers: [
        { provide: ScrollService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollArrowComponent);
    component = fixture.componentInstance;
    scrollServiceSpy = TestBed.inject(ScrollService) as jasmine.SpyObj<ScrollService>;
    
    // Mock return promises
    scrollServiceSpy.scrollToElement.and.returnValue(Promise.resolve());
    scrollServiceSpy.scrollToTop.and.returnValue(Promise.resolve());
    scrollServiceSpy.scrollToElementWithOffset.and.returnValue(Promise.resolve());
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('SVG Path Generation', () => {
    it('should generate up arrow path for direction up', () => {
      component.direction = 'up';
      expect(component.svgPath).toBe('M18 15l-6-6-6 6');
    });

    it('should generate down arrow path for direction down', () => {
      component.direction = 'down';
      expect(component.svgPath).toBe('M6 9l6 6 6-6');
    });
  });

  describe('Accessibility Labels', () => {
    it('should generate default aria label for up direction', () => {
      component.direction = 'up';
      expect(component.computedAriaLabel).toBe('Scroll vers le haut');
    });

    it('should generate default aria label for down direction', () => {
      component.direction = 'down';
      expect(component.computedAriaLabel).toBe('Scroll vers le bas');
    });

    it('should use custom aria label when provided', () => {
      component.customAriaLabel = 'Aller à la section suivante';
      expect(component.computedAriaLabel).toBe('Aller à la section suivante');
    });

    it('should generate default title for up direction', () => {
      component.direction = 'up';
      expect(component.computedTitle).toBe('Cliquez pour scroller vers le haut');
    });

    it('should use custom title when provided', () => {
      component.customTitle = 'Retour en haut';
      expect(component.computedTitle).toBe('Retour en haut');
    });
  });

  describe('Scroll Functionality', () => {
    it('should call scrollToElement with target', async () => {
      component.target = '#section';
      component.direction = 'down';
      
      await component.handleScrollClick();
      
      expect(scrollServiceSpy.scrollToElement).toHaveBeenCalledWith(
        '#section',
        'smooth',
        'start'
      );
    });

    it('should call scrollToElementWithOffset when offset provided', async () => {
      component.target = '#section';
      component.offset = 100;
      
      await component.handleScrollClick();
      
      expect(scrollServiceSpy.scrollToElementWithOffset).toHaveBeenCalledWith(
        '#section',
        100,
        'smooth'
      );
    });

    it('should call scrollToTop for up direction without target', async () => {
      component.direction = 'up';
      component.target = undefined;
      
      await component.handleScrollClick();
      
      expect(scrollServiceSpy.scrollToTop).toHaveBeenCalledWith('smooth');
    });

    it('should handle scroll errors gracefully', async () => {
      spyOn(console, 'error');
      scrollServiceSpy.scrollToTop.and.returnValue(Promise.reject('Test error'));
      
      component.direction = 'up';
      await component.handleScrollClick();
      
      expect(console.error).toHaveBeenCalledWith('Erreur lors du scroll:', 'Test error');
    });

    it('should warn for down direction without target', async () => {
      spyOn(console, 'warn');
      component.direction = 'down';
      component.target = undefined;
      
      await component.handleScrollClick();
      
      expect(console.warn).toHaveBeenCalledWith(
        'ScrollArrow: Aucune cible spécifiée pour le scroll vers le bas'
      );
    });
  });

  describe('Template Rendering', () => {
    it('should apply up direction class', () => {
      component.direction = 'up';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('.scroll-arrow');
      expect(button.classList).toContain('scroll-arrow--up');
    });

    it('should apply down direction class', () => {
      component.direction = 'down';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('.scroll-arrow');
      expect(button.classList).toContain('scroll-arrow--down');
    });

    it('should trigger handleScrollClick on button click', () => {
      spyOn(component, 'handleScrollClick');
      
      const button = fixture.nativeElement.querySelector('.scroll-arrow');
      button.click();
      
      expect(component.handleScrollClick).toHaveBeenCalled();
    });

    it('should set correct aria-label attribute', () => {
      component.customAriaLabel = 'Test label';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('.scroll-arrow');
      expect(button.getAttribute('aria-label')).toBe('Test label');
    });

    it('should set correct title attribute', () => {
      component.customTitle = 'Test title';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('.scroll-arrow');
      expect(button.getAttribute('title')).toBe('Test title');
    });
  });
});