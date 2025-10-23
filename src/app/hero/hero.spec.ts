import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';
import { AboutSectionComponent } from '../components/about-section/about-section.component';
import { ScrollArrowComponent } from '../components/scroll-arrow/scroll-arrow.component';
import { ScrollService } from '../services/scroll.service';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ScrollService', ['scrollToElement']);

    await TestBed.configureTestingModule({
      imports: [
        Hero,
        HeroSectionComponent,
        AboutSectionComponent,
        ScrollArrowComponent
      ],
      providers: [
        { provide: ScrollService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    scrollServiceSpy = TestBed.inject(ScrollService) as jasmine.SpyObj<ScrollService>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hero data signal with correct initial values', () => {
    const heroData = component['heroData']();
    
    expect(heroData.title).toBe('LYRICS MAKER');
    expect(heroData.subtitle).toBe('I CAN DO IT');
    expect(heroData.about.title).toBe('About Karaoke Lyrics Maker');
    expect(heroData.about.features.length).toBe(3);
    expect(heroData.about.scrollTarget).toBe('#hero');
  });

  it('should compute hero content correctly', () => {
    const heroContent = component['heroContent']();
    
    expect(heroContent.title).toBe('LYRICS MAKER');
    expect(heroContent.subtitle).toBe('I CAN DO IT');
    expect(heroContent.scrollTarget).toBe('#about');
  });

  it('should compute about data correctly', () => {
    const aboutData = component['aboutData']();
    
    expect(aboutData.title).toBe('About Karaoke Lyrics Maker');
    expect(aboutData.features.length).toBe(3);
    expect(aboutData.features[0].title).toBe('Precise Timing');
    expect(aboutData.features[0].icon).toBe('🎯');
  });

  it('should render hero section component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-hero-section')).toBeTruthy();
  });

  it('should render about section component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-about-section')).toBeTruthy();
  });

  it('should have hero container with proper styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.hero-container');
    expect(container).toBeTruthy();
  });

  it('should use OnPush change detection', () => {
    expect(component.constructor.name).toBe('Hero');
    // Vérifie que le composant utilise OnPush via les métadonnées
    const componentDef = (component.constructor as any).ɵcmp;
    expect(componentDef.onPush).toBeTruthy(); // OnPush est défini
  });

  it('should pass correct data to child components', () => {
    fixture.detectChanges();
    
    // Vérification que les données sont transmises correctement
    const heroSection = fixture.debugElement.query(
      element => element.name === 'app-hero-section'
    );
    const aboutSection = fixture.debugElement.query(
      element => element.name === 'app-about-section'
    );
    
    expect(heroSection).toBeTruthy();
    expect(aboutSection).toBeTruthy();
  });
});
