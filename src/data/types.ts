export type Vec3 = [number, number, number];

export interface RootJSON {
  id: number;
  position: Vec3;
  normal: Vec3;
  growthDirection: Vec3;
  initialHeight: number;
  radius: number;
  color: string;
  weight: number;
}

export interface HairJSON {
  version: string;
  kind: string;
  scalpRadii: Vec3;
  roots: RootJSON[];
}

export interface HairDef {
  id: string;
  name: string;
  parSeconds: number;
  glb: string;
  roots: string;
  count: number;
}

export interface ClipperDef {
  id: string;
  name: string;
  color: string;
  radius: number;
  cutRate: number;
  glb: string;
}

export interface CharacterDef {
  id: string;
  name: string;
  emotion: string;
  glb: string;
  accent?: string;
  skin?: string;
  description?: string;
  scalpRadii: Vec3;
  hairTransform?: { position: Vec3; rotation: Vec3; scale: Vec3 };
  hairCompatibility: string;
  rigged: boolean;
  scoreMultiplier: number;
}

export interface Catalog {
  version: string;
  quality?: string;
  character?: string;
  hair: HairDef[];
  clippers: ClipperDef[];
  characters?: CharacterDef[];
  characterCatalog?: string;
}

export interface CharactersJSON {
  version: string;
  defaultCharacter: string;
  characters: CharacterDef[];
}

export type GameMode = 'free' | 'ta';
