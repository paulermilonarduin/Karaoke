import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { HeroSectionComponent, HeroContent } from './hero-section.component';
import { ScrollArrowComponent } from '../scroll-arrow/scroll-arrow.component';
import { ScrollService } from '../../services/scroll.service';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  const mockHeroContent: HeroContent = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    scrollTarget: '#about'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ScrollService', ['scrollToElement']);

    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent, ScrollArrowComponent],
      providers: [
        { provide: ScrollService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    scrollServiceSpy = TestBed.inject(ScrollService) as jasmine.SpyObj<ScrollService>;
    
    component.content = mockHeroContent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero content', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.hero-section__title').textContent).toContain('Test Title');
    expect(compiled.querySelector('.hero-section__subtitle').textContent).toContain('Test Subtitle');
  });

  it('should show scroll arrow when scrollTarget is provided', () => {
    expect(fixture.nativeElement.querySelector('.hero-section__arrow')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-scroll-arrow')).toBeTruthy();
  });

  it('should hide scroll arrow when scrollTarget is not provided', () => {
    // Créer un nouveau contenu sans scrollTarget
    const newContent: HeroContent = {
      title: 'Test Title',
      subtitle: 'Test Subtitle'
      // pas de scrollTarget
    };
    
    // Assigner le nouveau contenu
    component.content = newContent;
    
    // Marquer pour vérification (OnPush change detection)
    const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
    cdr.markForCheck();
    fixture.detectChanges();

    // Avec @if, l'élément n'est pas présent dans le DOM quand la condition est false
    expect(fixture.nativeElement.querySelector('.hero-section__arrow')).toBeNull();
  });

  it('should have correct hero section ID', () => {
    const heroSection = fixture.nativeElement.querySelector('.hero-section');
    expect(heroSection.getAttribute('id')).toBe('hero');
  });

  it('should apply correct CSS classes', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.hero-section')).toBeTruthy();
    expect(compiled.querySelector('.hero-section__content')).toBeTruthy();
    expect(compiled.querySelector('.hero-section__title')).toBeTruthy();
    expect(compiled.querySelector('.hero-section__subtitle')).toBeTruthy();
  });
});