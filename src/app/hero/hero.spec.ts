import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-title')?.textContent).toBe('KARAOKE');
  });

  it('should render hero subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-subtitle')?.textContent).toBe('LYRICS MAKER');
  });

  it('should render scroll arrow', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.scroll-arrow')).toBeTruthy();
  });

  it('should render about section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.about-section')).toBeTruthy();
    expect(compiled.querySelector('.about-content h2')?.textContent).toBe('About Karaoke Lyrics Maker');
  });

  it('should have scrollToAbout method', () => {
    expect(component.scrollToAbout).toBeDefined();
    expect(typeof component.scrollToAbout).toBe('function');
  });

  it('should have scrollToHero method', () => {
    expect(component.scrollToHero).toBeDefined();
    expect(typeof component.scrollToHero).toBe('function');
  });

  it('should render back arrow in about section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.back-arrow')).toBeTruthy();
  });
});
