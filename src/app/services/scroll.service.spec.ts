import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;
  let mockDocument: any;
  let mockElement: jasmine.SpyObj<Element>;

  beforeEach(() => {
    // Mock element avec scrollIntoView
    mockElement = jasmine.createSpyObj('Element', ['scrollIntoView', 'getBoundingClientRect']);
    mockElement.getBoundingClientRect.and.returnValue({
      top: 100,
      left: 0,
      bottom: 200,
      right: 300,
      width: 300,
      height: 100
    } as DOMRect);

    // Mock document simplifié
    mockDocument = {
      querySelector: jasmine.createSpy('querySelector').and.returnValue(mockElement),
      documentElement: {
        scrollTo: jasmine.createSpy('scrollTo'),
        clientWidth: 1200,
        clientHeight: 800,
        scrollLeft: 0,
        scrollTop: 0
      },
      body: {
        scrollLeft: 0,
        scrollTop: 0
      }
    };

    TestBed.configureTestingModule({
      providers: [
        ScrollService,
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });
    
    service = TestBed.inject(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('scrollToElement', () => {
    it('should scroll to element by selector', async () => {
      const selector = '#test-element';
      
      await service.scrollToElement(selector);
      
      expect(mockDocument.querySelector).toHaveBeenCalledWith(selector);
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    });

    it('should reject if element not found', async () => {
      spyOn(console, 'error'); // Empêche l'affichage de l'erreur dans les tests
      mockDocument.querySelector.and.returnValue(null);
      
      await expectAsync(service.scrollToElement('#nonexistent'))
        .toBeRejectedWithError('Élément cible introuvable: #nonexistent');
      
      expect(console.error).toHaveBeenCalledWith('Erreur lors du scroll:', jasmine.any(Error));
    });
  });

  describe('scrollToTop', () => {
    it('should call scrollTo on documentElement', async () => {
      await service.scrollToTop('smooth');
      
      expect(mockDocument.documentElement.scrollTo).toHaveBeenCalled();
    });
  });

  describe('isElementVisible', () => {
    it('should return true for visible element', () => {
      const result = service.isElementVisible('#test');
      
      expect(result).toBe(true);
    });

    it('should return false for non-existent element', () => {
      mockDocument.querySelector.and.returnValue(null);
      
      const result = service.isElementVisible('#nonexistent');
      
      expect(result).toBe(false);
    });
  });

  describe('getScrollPosition', () => {
    it('should return current scroll position', () => {
      mockDocument.documentElement.scrollLeft = 50;
      mockDocument.documentElement.scrollTop = 150;
      
      const position = service.getScrollPosition();
      
      expect(position).toEqual({ x: 50, y: 150 });
    });
  });
});