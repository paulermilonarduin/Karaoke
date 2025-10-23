export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface AboutData {
  title: string;
  description: string;
  features: Feature[];
  scrollTarget?: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  about: AboutData;
}

export interface ScrollTarget {
  selector: string;
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
}