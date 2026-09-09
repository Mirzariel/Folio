/**
 * The 18 tiles in the gallery mockup. `name` becomes the tile's accessible name
 * and the filename shown in the viewer, so it must read like a real capture.
 * `big` spans 2x2 in the grid. `clip` renders the video badge, which is the only
 * thing allowed on a tile that is not the picture.
 */
export interface Tile {
  readonly file: string;
  readonly name: string;
  readonly alt: string;
  readonly big?: boolean;
  readonly clip?: boolean;
}

export const tiles: readonly Tile[] = [
  { file: 't05.jpg', name: 'IMG_4821.CR2', alt: 'A family standing in shallow water', big: true },
  { file: 't01.jpg', name: 'IMG_4822.CR2', alt: 'A family on the shoreline' },
  { file: 't02.jpg', name: 'IMG_4830.CR2', alt: 'A child on an adult\u2019s shoulders at the beach' },
  { file: 't03.jpg', name: 'DSC_0043.JPG', alt: 'Figures on a wide empty beach' },
  { file: 't09.jpg', name: 'MVI_0071.MP4', alt: 'A lake at golden hour', clip: true },
  { file: 't04.jpg', name: 'IMG_4831.CR2', alt: 'A family walking along the sand' },
  { file: 't06.jpg', name: 'IMG_4840.CR2', alt: 'An adult and a child playing on the beach' },
  { file: 't10.jpg', name: 'IMG_4855.CR2', alt: 'Mountains above a still lake' },
  { file: 't07.jpg', name: 'IMG_4861.CR2', alt: 'A child being lifted above the sea' },
  { file: 't14.jpg', name: 'IMG_4877.JPG', alt: 'A small dog wearing a party hat' },
  { file: 't12.jpg', name: 'IMG_4890.CR2', alt: 'A turquoise lake below a mountain ridge', big: true },
  { file: 't08.jpg', name: 'IMG_4902.CR2', alt: 'Someone looking out to sea' },
  { file: 't11.jpg', name: 'IMG_4915.CR2', alt: 'A hazy coastline at dusk' },
  { file: 't15.jpg', name: 'IMG_4928.JPG', alt: 'A dog in a party hat on grass' },
  { file: 't13.jpg', name: 'IMG_4931.CR2', alt: 'A road winding through dry hills' },
  { file: 't18.jpg', name: 'MVI_0084.MP4', alt: 'A camera and passport laid out on a map', clip: true },
  { file: 't16.jpg', name: 'IMG_4944.JPG', alt: 'A dog wearing a party hat indoors' },
  { file: 't19.jpg', name: 'IMG_4950.CR2', alt: 'An old camera resting on a folded map' },
] as const;

/** The five hero prints, with their scattered-state offsets from the grid slot. */
export interface Print {
  readonly file: string;
  /** Offset to the pile, as a percentage of the print's own size. */
  readonly dx: string;
  readonly dy: string;
  readonly dr: string;
  /** Extra scale in the pile state. */
  readonly ds: number;
  readonly z: number;
}

export const prints: readonly Print[] = [
  { file: 't09.jpg', dx: '37%', dy: '32%', dr: '-9deg', ds: 0.34, z: 3 },
  { file: 't14.jpg', dx: '60%', dy: '13%', dr: '8deg', ds: 0.22, z: 2 },
  { file: 't04.jpg', dx: '-117%', dy: '93%', dr: '-3deg', ds: 0.52, z: 5 },
  { file: 't02.jpg', dx: '-25%', dy: '-9%', dr: '12deg', ds: 0.18, z: 4 },
  { file: 't12.jpg', dx: '18%', dy: '-14%', dr: '-12deg', ds: 0.14, z: 1 },
] as const;
