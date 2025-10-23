# Karaoke App - AI Coding Instructions

## Project Overview
Modern Angular 20 application using standalone components architecture, bootstrapped with Angular CLI. The project follows Angular's latest conventions with no NgModules - all components are standalone.

## Architecture Patterns

### Standalone Components (No NgModules)
- All components use `imports` array instead of module declarations
- Main app component is `App` (not `AppComponent`) in `src/app/app.ts`
- Bootstrap via `bootstrapApplication()` in `src/main.ts` with `appConfig`

### Signal-Based State Management
- Uses Angular signals for reactive state: `signal()`, `computed()`, `effect()`
- Example: `protected readonly title = signal('karaoke')` in `App` component
- Prefer signals over traditional observables for local component state

### File Naming Convention
- Components: `component.ts` (not `component.component.ts`)
- Templates: `component.html` (co-located with component)
- Styles: `component.css` (co-located with component)
- Example: `app.ts`, `app.html`, `app.css`

## Development Workflow

### Key Commands
- `npm start` or `ng serve` - Development server on http://localhost:4200
- `npm test` or `ng test` - Karma unit tests with live reload
- `npm run build` - Production build with optimization
- `npm run watch` - Development build with file watching

### Code Generation
- Use Angular CLI: `ng generate component component-name`
- Components auto-generate as standalone with proper imports
- All schematics create modern standalone architecture

## Configuration Details

### TypeScript Setup
- Strict mode enabled with enhanced type checking
- `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`
- Angular strict templates and injection parameters enabled
- Target ES2022 with module preservation

### Build Configuration
- Uses new `@angular/build:application` builder (not webpack)
- Assets served from `public/` directory (not `src/assets/`)
- Production builds have 500kB initial bundle warning, 1MB error limit
- Component styles limited to 4kB warning, 8kB error

### Code Style
- Prettier configured: 100 char width, single quotes, Angular HTML parser
- Use Prettier format: `'template string'` not `"double quotes"`

## Testing Patterns
- Jasmine + Karma setup with Angular Testing Utilities
- Import components directly in tests: `imports: [App]`
- Use `TestBed.configureTestingModule()` for component testing
- Tests expect modern signal-based component structure

## Audio Management Best Practices

### Web Audio API Integration
- Use Angular services for audio management with dependency injection
- Create reactive audio services using signals for state management
- Implement proper audio context lifecycle management
- Handle browser autoplay policies with user gesture requirements

### Lyrics Synchronization Focus
- Precise audio playback control with frame-accurate timing
- Real-time waveform visualization for manual timing adjustment
- Export synchronized timing data in standard formats (LRC, SRT, JSON)
- Audio analysis for beat detection and rhythm pattern recognition

### TypeScript Audio Types
- Use strict typing for audio contexts, nodes, and buffers
- Create interfaces for lyrics timing data and synchronization metadata
- Type audio event handlers and callback functions properly
- Define precise timing structures with millisecond accuracy

### Performance Considerations
- Preload audio assets using Angular's HttpClient with proper caching
- Use OnPush change detection for audio-heavy components
- Implement audio worker threads for heavy processing tasks
- Handle memory management for large audio files and buffers