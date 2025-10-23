import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { AboutSectionComponent } from './about-section.component';
import { ScrollArrowComponent } from '../scroll-arrow/scroll-arrow.component';
import { ScrollService } from '../../services/scroll.service';
import { AboutData } from '../../interfaces/hero-data.interface';

describe('AboutSectionComponent', () => {
  let component: AboutSectionComponent;
  let fixture: ComponentFixture<AboutSectionComponent>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  const mockAboutData: AboutData = {
    title: 'À propos',
    description: 'Une application de karaoké moderne',
    features: [
      {
        title: 'Feature 1',
        description: 'Description 1',
        icon: '🎵'
      },
      {
        title: 'Feature 2', 
        description: 'Description 2',
        icon: '🎤'
      }
    ],
    scrollTarget: '#hero'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ScrollService', ['scrollToElement']);

    await TestBed.configureTestingModule({
      imports: [AboutSectionComponent, ScrollArrowComponent],
      providers: [
        { provide: ScrollService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSectionComponent);
    component = fixture.componentInstance;
    scrollServiceSpy = TestBed.inject(ScrollService) as jasmine.SpyObj<ScrollService>;
    
    component.data = mockAboutData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display about data', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.about-section__title').textContent).toContain('À propos');
    expect(compiled.querySelector('.about-section__description').textContent).toContain('Une application de karaoké moderne');
  });

  it('should display features', () => {
    const compiled = fixture.nativeElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    
    expect(featureCards.length).toBe(2);
    
    expect(featureCards[0].querySelector('.feature-card__title').textContent).toContain('Feature 1');
    expect(featureCards[0].querySelector('.feature-card__description').textContent).toContain('Description 1');
    expect(featureCards[0].querySelector('.feature-card__icon').textContent).toContain('🎵');
    
    expect(featureCards[1].querySelector('.feature-card__title').textContent).toContain('Feature 2');
    expect(featureCards[1].querySelector('.feature-card__description').textContent).toContain('Description 2');
    expect(featureCards[1].querySelector('.feature-card__icon').textContent).toContain('🎤');
  });

  it('should show scroll arrow when scrollTarget is provided', () => {
    expect(fixture.nativeElement.querySelector('.about-section__arrow')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-scroll-arrow')).toBeTruthy();
  });

  it('should always show scroll arrow', () => {
    // La flèche est maintenant toujours affichée avec un target fixe
    expect(fixture.nativeElement.querySelector('.about-section__arrow')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-scroll-arrow')).toBeTruthy();
  });

  it('should hide features when empty array', () => {
    // Créer de nouvelles données avec features vides
    const newData: AboutData = {
      ...mockAboutData,
      features: []
    };
    
    component.data = newData;
    
    // Marquer pour vérification (OnPush change detection)
    const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
    cdr.markForCheck();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.about-section__features')).toBeNull();
  });

  it('should have correct section ID', () => {
    const aboutSection = fixture.nativeElement.querySelector('.about-section');
    expect(aboutSection.getAttribute('id')).toBe('about');
  });

  it('should track features correctly', () => {
    const feature = mockAboutData.features[0];
    const result = component.trackFeature(0, feature);
    
    expect(result).toBe('Feature 1');
  });

  it('should apply correct CSS classes', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.about-section')).toBeTruthy();
    expect(compiled.querySelector('.about-section__container')).toBeTruthy();
    expect(compiled.querySelector('.about-section__header')).toBeTruthy();
    expect(compiled.querySelector('.about-section__features')).toBeTruthy();
  });
});