import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { ArchivalSpecimenModal } from './ArchivalSpecimenModal';

export interface RoomItem {
  id: string;
  title: string;
}

export interface CarouselImageRecord {
  id: string;
  displayOrder: string;
  category: string;
  imageUrl: string;
  title: string;
  shortDescription: string;
  sourceCredit: string;
  alt: string;
}

export interface OtherRoomPreviewData {
  id: string;
  title: string;
  heading: string;
  description: string;
  previewLabel: string;
  image: string;
  alt: string;
  tone: 'bw' | 'sepia';
  workingTitle: string;
  visualDescription: string;
  provenance: string;
}

const ROOM_TABS: RoomItem[] = [
  { id: 'fashion', title: 'Fashion' },
  { id: 'photography', title: 'Photography' },
  { id: 'music', title: 'Music' },
  { id: 'design', title: 'Design' },
];

const FASHION_CATEGORIES_ROW_1 = [
  'Hairstyles & Hair Artistry',
  'Headwear & Adornment',
  'Jewellery & Beads',
];

const FASHION_CATEGORIES_ROW_2 = [
  'Clothing & Textiles',
  'Grooming, Beauty & Personal Style',
];

// All 10 exact Cloudinary image records in exact preserved order
const HAIRSTYLE_CAROUSEL_IMAGES: CarouselImageRecord[] = [
  {
    id: 'hair-01',
    displayOrder: '01',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422083/Image_8.jpg',
    title: 'Sculptural Woven Arch & Plaiting',
    shortDescription:
      'A master study in architectural hair geometry, featuring elevated vertical arches constructed through meticulous narrow-section braiding. The intricate cornrow foundation anchors arched loops rising above the crown, illustrating the sculptural balance between structural tension and personal adornment.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Sculptural Nigerian archival hairstyle featuring woven arched loops and precise cornrow foundation',
  },
  {
    id: 'hair-02',
    displayOrder: '02',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422082/Image1.jpg',
    title: 'Radiating Threaded Crest',
    shortDescription:
      'Fine black thread binding techniques utilized to sculpt elongated curved spires ascending upward from radiating scalp partings. The smooth, lustrous density of the wrapped forms highlights the artisanal skill of traditional Nigerian hair threading, transforming hair into three-dimensional living sculpture.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Nigerian threaded crest hairstyle with ascending spires and radiating scalp geometric lines',
  },
  {
    id: 'hair-03',
    displayOrder: '03',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422082/image9.jpg',
    title: 'Layered Ribbed Cornrow Geometry',
    shortDescription:
      'Geometric scalp mapping defined by parallel curving cornrows that sweep symmetrically across the temples toward a central apex. The rhythmic repetition of raised ridges demonstrates meticulous tension control and spatial harmony, celebrating hair as an enduring medium of graphic and cultural expression.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Symmetrical ribbed cornrow hairstyle curving across the scalp toward a central apex',
  },
  {
    id: 'hair-04',
    displayOrder: '04',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422082/Image_5.jpg',
    title: 'Volumetric Tiered Crown',
    shortDescription:
      'A multi-tiered sculptural hairstyle combining concentric cornrow foundations with dramatic ascending coiled loops. The composition balances substantial cranial volume with delicate tactile texture, showcasing the craftsperson’s ability to manipulate hair into stately, dignified crests for celebratory and everyday occasions.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Multi-tiered Nigerian sculptural hairstyle featuring concentric cornrows and raised coils',
  },
  {
    id: 'hair-05',
    displayOrder: '05',
    category: 'Hairstyles & Hair Artistry',
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422082/hairstyles-01-braided-crown-natural-puff.jpg',
    title: 'Braided Crown with Natural Volume',
    shortDescription:
      'An intricate circular halo braid enclosing a voluminous natural textured puff. The clean division between tightly flat-laid perimeter plaiting and expansive crown fullness demonstrates the versatility of African natural hair textures, uniting protective technique with ceremonial elegance.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Circular halo perimeter braid surrounding a full natural textured crown puff',
  },
  {
    id: 'hair-06',
    displayOrder: '06',
    category: 'Hairstyles & Hair Artistry',
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422082/hairstyles-02-starburst-cornrow-knots.jpg',
    title: 'Starburst Cornrow Knots',
    shortDescription:
      'A dynamic starburst pattern radiating outwards from a central scalp coordinate into segmented raised cornrows terminating in sculpted sculptural knots. The razor-sharp linear grid reveals mathematical precision in parting and execution, underscoring hair styling as high visual artistry.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Starburst radiating cornrows originating from a central point and terminating in sculpted knots',
  },
  {
    id: 'hair-07',
    displayOrder: '07',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422084/Image4.jpg',
    title: 'Cantilevered Spires & Wrapped Crests',
    shortDescription:
      'Tall, cantilevered cylindrical spires formed using traditional black cotton thread binding. Projecting gracefully forward and backward from the crown, the dramatic silhouette captures the zenith of mid-century Nigerian studio portraiture documentation and hair sculpture traditions.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Dramatic cantilevered cylindrical spires formed with traditional black thread wrapping',
  },
  {
    id: 'hair-08',
    displayOrder: '08',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422083/Image_7.png',
    title: 'Concentric Coiled Waves',
    shortDescription:
      'Curvilinear cornrows swooping in concentric wave-like contours around the ear and occipital bone. The fluid, undulating tracks create a continuous visual rhythm across the head, demonstrating supreme thumb dexterity and intuitive understanding of cranial contours.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Concentric curving cornrow waves following the ear and cranial contour in fluid harmony',
  },
  {
    id: 'hair-09',
    displayOrder: '09',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422083/Image3.jpg',
    title: 'Interlocking Basket-Weave Plaiting',
    shortDescription:
      'An elaborate cross-hatched surface created through overlapping three-strand plaiting and flat interlocking braids. Resembling hand-woven cane and textile structures, this style illustrates the deep cross-pollination between Nigerian textile weaving and hair craft.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Elaborate cross-hatched interlocking plaiting resembling artisanal basketry and woven textile',
  },
  {
    id: 'hair-10',
    displayOrder: '10',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422083/Image_6.jpg',
    title: 'Ascending Spiral Pillars',
    shortDescription:
      'Vertical spiral columns wound with dark cord, rising in symmetrical formation above a base of micro-cornrows. The architectural purity of the vertical pillars highlights the dialogue between head adornment, personal posture, and statuesque presence in Nigerian creative history.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Vertical ascending spiral columns wrapped in dark cord rising above symmetrical micro-cornrows',
  },
];

// Headwear & Adornment Collection: 9 exact verified archival specimens
const HEADWEAR_COLLECTION_IMAGES: CarouselImageRecord[] = [
  {
    id: 'head-01',
    displayOrder: '01',
    category: 'Headwear & Adornment',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430891/Wrapped_in_Pattern.jpg',
    title: 'Wrapped in Pattern',
    shortDescription:
      'An expansive patterned headwrap frames the wearer’s face and is paired with coordinated clothing and layered beads.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Expansive patterned headwrap framing the face paired with coordinated clothing and layered beads',
  },
  {
    id: 'head-02',
    displayOrder: '02',
    category: 'Headwear & Adornment',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430891/Colour_Beads_and_Headwrap.jpg',
    title: 'Colour, Beads and Headwrap',
    shortDescription:
      'A striped headwrap, colourful bead strands, and layered neck adornment create a composition rich in colour and texture.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Striped headwrap and colourful bead strands with layered neck adornment',
  },
  {
    id: 'head-03',
    displayOrder: '03',
    category: 'Headwear & Adornment',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430891/The_Sculptural_Wrap.jpg',
    title: 'The Sculptural Wrap',
    shortDescription:
      'Tall, folded patterned fabric forms a striking silhouette, drawing attention to the shape and arrangement of the headwrap.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Tall folded patterned fabric forming a striking headwrap silhouette',
  },
  {
    id: 'head-04',
    displayOrder: '04',
    category: 'Headwear & Adornment',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430891/A_Crown_of_Folds.jpg',
    title: 'A Crown of Folds',
    shortDescription:
      'An elaborate headwrap combines layered folds, contrasting patterns, and a dramatic silhouette.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Elaborate headwrap combining layered folds and contrasting patterns with a dramatic silhouette',
  },
  {
    id: 'head-05',
    displayOrder: '05',
    category: 'Headwear & Adornment',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430891/The_Art_of_Shaping.jpg',
    title: 'The Art of Shaping',
    shortDescription:
      'A moment of headwear preparation offers a glimpse of the hands-on work involved in shaping and arranging a headpiece. The specific technique is not yet verified.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Hands-on preparation shaping and arranging an elaborate headpiece',
  },
  {
    id: 'head-06',
    displayOrder: '06',
    category: 'Headwear & Adornment',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430892/Pattern_in_Profile.png',
    title: 'Pattern in Profile',
    shortDescription:
      'A patterned headwrap is arranged into an extended form, with the fabric and silhouette taking centre stage.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Patterned headwrap arranged into an extended form shown in profile',
  },
  {
    id: 'head-07',
    displayOrder: '07',
    category: 'Headwear & Adornment',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430892/The_Wrapped_Portrait.jpg',
    title: 'The Wrapped Portrait',
    shortDescription:
      'A close portrait highlights the printed fabric, the arrangement of the wrap, and the wearer’s expression.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Close portrait highlighting printed fabric and headwrap arrangement',
  },
  {
    id: 'head-08',
    displayOrder: '08',
    category: 'Headwear & Adornment',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430892/Adornment_in_Celebration.jpg',
    title: 'Adornment in Celebration',
    shortDescription:
      'A prominent gele is paired with layered necklaces and formal attire, bringing headwear and personal adornment together.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Prominent gele paired with layered necklaces and formal celebratory attire',
  },
  {
    id: 'head-09',
    displayOrder: '09',
    category: 'Headwear & Adornment',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430892/The_Dark_Silhouette.jpg',
    title: 'The Dark Silhouette',
    shortDescription:
      'A dark sculptural headwrap contrasts with patterned clothing and jewellery, creating a portrait defined by shape and texture.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Dark sculptural headwrap contrasting with patterned attire and jewellery',
  },
];

// =========================================================================
// Jewellery & Beads Collection: Exact 9 curated archival specimens
// =========================================================================
const JEWELLERY_COLLECTION_IMAGES: CarouselImageRecord[] = [
  {
    id: 'jewel-01',
    displayOrder: '01',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792579327/1The_Hand_as_Ornament.jpg',
    title: 'The Hand as Ornament',
    shortDescription:
      'The hand becomes part of the composition through jewellery that connects the fingers, hand, and wrist. Look closely at how placement, shape, and detail turn an accessory into a visual statement. Do not assign a specific cultural origin or traditional meaning without a reliable source.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'The Hand as Ornament — jewellery connecting fingers, hand, and wrist in sculpted metalwork',
  },
  {
    id: 'jewel-02',
    displayOrder: '02',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792579328/2Rings_as_Small_Sculptures.jpg',
    title: 'Rings as Small Sculptures',
    shortDescription:
      'Rings can be read as miniature sculptures. Their shapes, surfaces, and arrangement invite a closer look at how small objects create distinct visual identities. Do not assume the rings are historical or associated with a particular community.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Rings as Small Sculptures — close examination of tactile surfaces, geometry, and craftsmanship',
  },
  {
    id: 'jewel-03',
    displayOrder: '03',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792579328/3The_Language_of_Metal.jpg',
    title: 'The Language of Metal',
    shortDescription:
      'Multiple rings create a visual language through their forms, finishes, and arrangement. Notice how individual pieces work together to shape the overall composition. Do not claim a specific metal composition, maker, date, or cultural symbolism unless verified.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'The Language of Metal — ensemble of artisanal metal rings displaying textural interplay',
  },
  {
    id: 'jewel-04',
    displayOrder: '04',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792579327/Yoruba_Beaded_Crowns_ARCHIVES_Nigeria.jpg',
    title: 'A Crown Woven in Beads',
    shortDescription:
      'Intricate beadwork, vivid colours, layered geometric forms, and sculptural details give this crown its striking presence. Yoruba beaded crowns have important associations with kingship and royal authority. Explain that broader cultural context only where supported by reliable sources. Do not invent the identity of the maker, ruler, specific date, or ceremony associated with this particular object.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'A Crown Woven in Beads — intricate Yoruba beaded royal crown featuring geometric forms and vivid colours',
  },
  {
    id: 'jewel-05',
    displayOrder: '05',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792579328/5Adornment_in_Gold.jpg',
    title: 'Adornment in Gold',
    shortDescription:
      'Explore the relationship between neck adornment, headwear, and the body. Scale, placement, and repeated forms work together to create a striking visual composition. Do not assume the object is made from solid gold or attribute it to a particular Nigerian community without evidence.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Adornment in Gold — exploration of scale, placement, and repeated metallic forms on the body',
  },
  {
    id: 'jewel-06',
    displayOrder: '06',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792579329/6The_Art_of_the_Bangle.jpg',
    title: 'The Art of the Bangle',
    shortDescription:
      'Repeated circular forms create rhythm through colour, surface, and arrangement. Look at how multiple bangles build a visual statement through repetition and contrast. Avoid unsupported historical or cultural attribution.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'The Art of the Bangle — repeated circular bangles creating visual rhythm through contrast and surface',
  },
  {
    id: 'jewel-07',
    displayOrder: '07',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792579328/7Beads_Worn_in_Layers.jpg',
    title: 'Beads Worn in Layers',
    shortDescription:
      'Layered bracelets bring together colour, texture, and repetition. Observe how the arrangement and combinations create a tactile and visual rhythm. Do not assign a specific cultural origin or traditional meaning without a reliable source.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Beads Worn in Layers — stacked beaded bracelets exhibiting colour harmony and tactile repetition',
  },
  {
    id: 'jewel-08',
    displayOrder: '08',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430891/Colour_Beads_and_Headwrap.jpg',
    title: 'Glass Trade Beads & Patterned Accents',
    shortDescription:
      'A delicate cascade of monochrome and polychrome glass beads paired with patterned woven fabrics. The subtle contrast between glossy bead surfaces and matte handspun cloth highlights textural sophistication.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Layered monochrome beads paired with hand-dyed textile cloth',
  },
  {
    id: 'jewel-09',
    displayOrder: '09',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430892/The_Dark_Silhouette.jpg',
    title: 'The Sculpted Brass Cuff & Choker',
    shortDescription:
      'Solid cast brass wrist cuffs featuring incised geometric cross-hatching and raised studs. The metallic warmth anchors the dark silhouette of the wearer, speaking to enduring blacksmithing and lost-wax bronze traditions.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Cast brass wrist cuff and choker exhibiting geometric surface engravings',
  },
];

const OTHER_ROOMS_DATA: Record<string, OtherRoomPreviewData> = {
  photography: {
    id: 'photography',
    title: 'Photography',
    heading: 'The moments that become our memory.',
    description:
      'Discover the photographs and visual records that document Nigerian people, places, and everyday life.',
    previewLabel: 'A GLIMPSE INTO THE PHOTOGRAPHY ROOM.',
    image: '/assets/rooms-photography.jpg',
    alt: 'Nigerian street photographer documenting everyday Lagos street life with vintage rangefinder camera',
    tone: 'bw',
    workingTitle: 'Lagos Street Life & Documentary Photography',
    visualDescription:
      'Street photography capturing the pulse of everyday life, human gestures, and urban community in post-independence Lagos. Visual records that document social gatherings, studio portraits, and the living texture of Nigerian cityscapes.',
    provenance: 'National Archives & Verified Collections',
  },
  music: {
    id: 'music',
    title: 'Music',
    heading: 'The sounds that carry a generation.',
    description:
      'Discover the musicians, sounds, and performance cultures that have shaped how Nigerians create, connect, and express themselves.',
    previewLabel: 'A GLIMPSE INTO THE MUSIC ROOM.',
    image: '/assets/rooms-music.jpg',
    alt: 'Nigerian highlife musician playing saxophone in vintage Lagos club in warm sepia tone',
    tone: 'sepia',
    workingTitle: 'Highlife & Brass Performance Culture',
    visualDescription:
      'A celebration of mid-century highlife, afrobeat pioneers, and brass musicianship. Instrument craft, bandstands, and performance cultures that carried communal optimism and musical innovation across generations.',
    provenance: 'National Archives & Verified Collections',
  },
  design: {
    id: 'design',
    title: 'Design',
    heading: 'The ideas that shape what surrounds us.',
    description:
      'Discover the visual identities, printed works, objects, and spaces through which Nigerian designers have shaped everyday life.',
    previewLabel: 'A GLIMPSE INTO THE DESIGN ROOM.',
    image: '/assets/rooms-design.jpg',
    alt: 'Warm sepia architectural photograph of modernist Nigerian geometric concrete facade',
    tone: 'sepia',
    workingTitle: 'Modernist Nigerian Architectural Form',
    visualDescription:
      'Geometric brise-soleil concrete facades and modernist vernacular architecture adapting tropical climate principles. Reflecting Nigerian structural creativity, graphic print traditions, and spatial innovation.',
    provenance: 'National Archives & Verified Collections',
  },
};

export const ExploreRoomsSection: React.FC = () => {
  // Fashion is selected by default as required
  const [activeRoomId, setActiveRoomId] = useState<string>('fashion');
  const [activeCategory, setActiveCategory] = useState<string>('Hairstyles & Hair Artistry');

  // Active overlay ID for tap-to-inspect on mobile or keyboard
  const [activeOverlayId, setActiveOverlayId] = useState<string | null>(null);
  // Active enlarged specimen ID for high-res Modal / Lightbox inspection
  const [enlargedSpecimenId, setEnlargedSpecimenId] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Accessible keyboard tab navigation
  const handleTabKeyDown = (e: React.KeyboardEvent, roomId: string) => {
    const currentIndex = ROOM_TABS.findIndex((r) => r.id === roomId);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % ROOM_TABS.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + ROOM_TABS.length) % ROOM_TABS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = ROOM_TABS.length - 1;
    }

    if (nextIndex !== currentIndex) {
      const nextRoom = ROOM_TABS[nextIndex];
      setActiveRoomId(nextRoom.id);
      setActiveOverlayId(null);
      const tabButton = document.getElementById(`room-tab-${nextRoom.id}`);
      if (tabButton) tabButton.focus();
    }
  };

  // =========================================================================
  // CURATED IMAGES FOR FASHION EXHIBITIONS (Hairstyles & Headwear)
  // =========================================================================
  const isHairstyles = activeCategory === 'Hairstyles & Hair Artistry';
  const isHeadwear = activeCategory === 'Headwear & Adornment';
  const isJewellery = activeCategory === 'Jewellery & Beads';

  // Dominant Centerpiece:
  const activeCenterImage = isJewellery
    ? JEWELLERY_COLLECTION_IMAGES[0] // jewel-01: 'The Hand as Ornament'
    : isHeadwear
    ? HEADWEAR_COLLECTION_IMAGES[0] // head-01: 'Wrapped in Pattern'
    : HAIRSTYLE_CAROUSEL_IMAGES[0]; // hair-01: 'Sculptural Woven Arch & Plaiting'

  // Four Images on the Left (arranged in 2 columns x 2 rows)
  const activeLeftImages = isJewellery
    ? [
        JEWELLERY_COLLECTION_IMAGES[1], // jewel-02: 'Rings as Small Sculptures'
        JEWELLERY_COLLECTION_IMAGES[2], // jewel-03: 'The Language of Metal'
        JEWELLERY_COLLECTION_IMAGES[3], // jewel-04: 'A Crown Woven in Beads'
        JEWELLERY_COLLECTION_IMAGES[4], // jewel-05: 'Adornment in Gold'
      ]
    : isHeadwear
    ? [
        HEADWEAR_COLLECTION_IMAGES[1], // head-02: 'Colour, Beads and Headwrap'
        HEADWEAR_COLLECTION_IMAGES[2], // head-03: 'The Sculptural Wrap'
        HEADWEAR_COLLECTION_IMAGES[3], // head-04: 'A Crown of Folds'
        HEADWEAR_COLLECTION_IMAGES[4], // head-05: 'The Art of Shaping'
      ]
    : [
        HAIRSTYLE_CAROUSEL_IMAGES[1], // hair-02: Radiating Threaded Crest
        HAIRSTYLE_CAROUSEL_IMAGES[2], // hair-03: Layered Ribbed Cornrow Geometry
        HAIRSTYLE_CAROUSEL_IMAGES[3], // hair-04: Volumetric Tiered Crown
        HAIRSTYLE_CAROUSEL_IMAGES[4], // hair-05: Braided Crown with Natural Volume
      ];

  // Four Images on the Right (arranged in 2 columns x 2 rows)
  const activeRightImages = isJewellery
    ? [
        JEWELLERY_COLLECTION_IMAGES[5], // jewel-06: 'The Art of the Bangle'
        JEWELLERY_COLLECTION_IMAGES[6], // jewel-07: 'Beads Worn in Layers'
        JEWELLERY_COLLECTION_IMAGES[7], // jewel-08: 'Glass Trade Beads & Patterned Accents'
        JEWELLERY_COLLECTION_IMAGES[8], // jewel-09: 'The Sculpted Brass Cuff & Choker'
      ]
    : isHeadwear
    ? [
        HEADWEAR_COLLECTION_IMAGES[5], // head-06: 'Pattern in Profile'
        HEADWEAR_COLLECTION_IMAGES[6], // head-07: 'The Wrapped Portrait'
        HEADWEAR_COLLECTION_IMAGES[7], // head-08: 'Adornment in Celebration'
        HEADWEAR_COLLECTION_IMAGES[8], // head-09: 'The Dark Silhouette'
      ]
    : [
        HAIRSTYLE_CAROUSEL_IMAGES[5], // hair-06: Starburst Cornrow Knots
        HAIRSTYLE_CAROUSEL_IMAGES[6], // hair-07: Cantilevered Spires & Wrapped Crests
        HAIRSTYLE_CAROUSEL_IMAGES[7], // hair-08: Concentric Coiled Waves
        HAIRSTYLE_CAROUSEL_IMAGES[8], // hair-09: Interlocking Basket-Weave Plaiting
      ];

  const activeSpecimensList = isJewellery
    ? JEWELLERY_COLLECTION_IMAGES
    : isHeadwear
    ? HEADWEAR_COLLECTION_IMAGES
    : HAIRSTYLE_CAROUSEL_IMAGES.slice(0, 9);

  // NOTE: hair-10 ('Ascending Spiral Pillars', Image_6.jpg) is preserved in the underlying
  // HAIRSTYLE_CAROUSEL_IMAGES data array, but intentionally excluded from the initial
  // 9-image hairstyle presentation to avoid visual repetition.

  const otherRoom = OTHER_ROOMS_DATA[activeRoomId];

  // Helper renderer for clean, frameless editorial image cards with hover/tap overlay
  const renderImageCard = (
    item: CarouselImageRecord,
    heightClass: string,
    isCenter: boolean = false
  ) => {
    const isOverlayOpen = activeOverlayId === item.id;

    return (
      <div
        key={item.id}
        tabIndex={0}
        role="button"
        aria-label={`${item.title}. Click or press Enter to reveal historical and craft details.`}
        aria-expanded={isOverlayOpen}
        onClick={() => setActiveOverlayId(isOverlayOpen ? null : item.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setActiveOverlayId(isOverlayOpen ? null : item.id);
          }
        }}
        className={`group relative w-full overflow-hidden bg-[#171715] cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] ${heightClass}`}
        style={{ borderRadius: '0px' }}
      >
        {/* Unobstructed Archival Photograph in resting state (No titles, numbers, or labels) */}
        <img
          src={item.imageUrl}
          alt={item.alt}
          className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out ${
            prefersReducedMotion ? '' : 'group-hover:scale-[0.98]'
          } ${isOverlayOpen ? 'scale-[0.98]' : ''}`}
          loading="lazy"
        />

        {/* Deep Espresso Information Overlay (#321F18) revealed on Hover, Tap, or Focus */}
        <div
          className={`absolute inset-0 bg-[#321F18]/95 p-4 sm:p-5 md:p-6 flex flex-col justify-between transition-opacity duration-300 z-20 ${
            isOverlayOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-visible:opacity-100 group-focus-visible:pointer-events-auto'
          }`}
        >
          {/* Top: Category Tag & Quick Action Buttons (Enlarge + Dismiss) */}
          <div className="flex items-center justify-between pb-2 border-b border-[#FAF8F4]/15">
            <span className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.2em] uppercase text-[#A4401F] font-semibold">
              {item.category.toUpperCase()}
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setEnlargedSpecimenId(item.id);
                }}
                aria-label={`Enlarge specimen ${item.title}`}
                title="Enlarge high-resolution specimen"
                className="px-2 py-1 rounded-none border border-[#FAF8F4]/30 hover:border-[#FAF8F4] bg-[#171715]/60 hover:bg-[#FAF8F4] text-[#D5D0C1] hover:text-[#171715] flex items-center space-x-1 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">ENLARGE</span>
              </button>
              {isOverlayOpen && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveOverlayId(null);
                  }}
                  aria-label="Close information overlay"
                  className="w-6 h-6 rounded-none border border-[#FAF8F4]/30 flex items-center justify-center text-[#D5D0C1] hover:text-[#FAF8F4] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Middle: Title & Visual Craft Description */}
          <div className="my-auto py-2">
            <h5
              className={`font-display text-[#FAF8F4] leading-[1.14] tracking-tight ${
                isCenter
                  ? 'text-xl sm:text-2xl md:text-3xl'
                  : 'text-base sm:text-lg md:text-xl'
              }`}
            >
              {item.title}
            </h5>
            <p className="font-sans text-xs md:text-[12.5px] leading-relaxed text-[#D5D0C1] mt-2 line-clamp-4">
              {item.shortDescription}
            </p>
          </div>

          {/* Bottom: Provenance & Click to Enlarge Link */}
          <div className="pt-2 border-t border-[#FAF8F4]/15 flex items-center justify-between text-[9.5px] sm:text-[10px] font-mono tracking-wider uppercase text-[#D5D0C1]/80">
            <span className="truncate max-w-[150px]">{item.sourceCredit}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setEnlargedSpecimenId(item.id);
              }}
              className="text-[#FAF8F4] hover:text-[#A4401F] flex items-center space-x-1 font-mono text-[10px] uppercase tracking-wider cursor-pointer underline underline-offset-2"
            >
              <span>View Dossier</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="explore-rooms"
      aria-label="Explore the Rooms Exhibition"
      className="relative w-full bg-[#FAF8F4] text-[#171715] py-16 md:py-24 overflow-hidden select-none"
    >
      {/* Subtle deckled archival paper slips behind section background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-[48%] left-[8%] w-[84%] h-[240px] bg-[#E3DED5]/40 border border-[#E3DED5]/80 -rotate-1 transform pointer-events-none" />
        <div className="absolute top-[52%] left-[12%] w-[78%] h-[200px] bg-[#D5D0C1]/30 border border-[#D5D0C1]/60 rotate-1 transform pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        {/* =========================================================================
            1. SHARED SECTION INTRODUCTION (Compact Shared Header)
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          {/* Eyebrow in terracotta without flanking lines */}
          <div className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#A4401F] font-semibold mb-2 text-center">
            <span>EXPLORE THE ROOMS</span>
          </div>

          {/* Display Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-[54px] text-[#171715] leading-[1.04] tracking-tight">
            <span>Four rooms. </span>
            <span className="italic text-[#A4401F] font-normal">Many stories.</span>
          </h2>

          {/* Compact Supporting Copy */}
          <p className="font-sans text-[14px] sm:text-[15px] leading-[1.55] text-[#6B6B6B] mt-2.5 max-w-[540px]">
            Explore Nigeria’s creative history through the people, practices, and ideas that continue
            to shape how we see, hear, wear, and make.
          </p>
        </div>

        {/* =========================================================================
            2. FOUR SELECTABLE ROOM TABS (Compact, Understated Editorial Tabs)
            ========================================================================= */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Creative discipline exhibition rooms"
          className="mt-6 md:mt-8 flex items-center justify-center flex-wrap gap-2 sm:gap-4 md:gap-8 border-b border-[#E3DED5] pb-3 w-full max-w-3xl mx-auto"
        >
          {ROOM_TABS.map((room) => {
            const isSelected = activeRoomId === room.id;
            return (
              <button
                key={room.id}
                role="tab"
                id={`room-tab-${room.id}`}
                aria-controls={`room-panel-${room.id}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  setActiveRoomId(room.id);
                  setActiveOverlayId(null);
                }}
                onKeyDown={(e) => handleTabKeyDown(e, room.id)}
                className={`relative px-4 sm:px-5 py-2 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] ${
                  isSelected
                    ? 'text-[#171715] font-semibold'
                    : 'text-[#6B6B6B] hover:text-[#171715]'
                }`}
                style={{ borderRadius: '0px' }}
              >
                <span className="flex items-center space-x-2">
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A4401F]" aria-hidden="true" />
                  )}
                  <span>{room.title}</span>
                </span>
                {isSelected && (
                  <span
                    className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[#A4401F]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            3. ROOM EXHIBITION CONTENT PANEL
            ========================================================================= */}
        <div
          role="tabpanel"
          id={`room-panel-${activeRoomId}`}
          aria-labelledby={`room-tab-${activeRoomId}`}
          className="w-full max-w-[1380px] mx-auto mt-8 md:mt-10"
        >
          {activeRoomId === 'fashion' ? (
            /* =====================================================================
               FASHION ROOM: Two-Column Header & 9-Image Editorial Composition
               ===================================================================== */
            <div className="w-full flex flex-col items-center">
              {/* 3.1 Two-Column Fashion Header: Text on Left, Filters on Right */}
              <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8 lg:gap-12">
                {/* Left column: Fashion heading and short supporting paragraph */}
                <div className="w-full md:max-w-md lg:max-w-lg flex flex-col items-start text-left">
                  <h3 className="font-display text-2xl sm:text-[28px] md:text-3xl lg:text-[32px] text-[#171715] leading-[1.12] tracking-tight">
                    Fashion is more than what we wear.
                  </h3>
                  <p className="font-sans text-xs sm:text-[13.5px] leading-relaxed text-[#6B6B6B] mt-2 sm:mt-2.5 max-w-[420px]">
                    Explore how hairstyles, clothing, jewellery, and textiles express identity,
                    craft, and creativity across Nigerian life.
                  </p>
                </div>

                {/* Right column: Five Category Filters in 2 clean rows (no horizontal scrollbar) */}
                <div
                  role="group"
                  aria-label="Fashion collection categories"
                  className="w-full md:w-auto flex flex-col items-start md:items-end gap-2 shrink-0"
                >
                  {/* First row: Hairstyles & Hair Artistry, Headwear & Adornment, Jewellery & Beads */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {FASHION_CATEGORIES_ROW_1.map((category) => {
                      const isActive = activeCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => {
                            setActiveCategory(category);
                            setActiveOverlayId(null);
                          }}
                          className={`px-3 py-1.5 font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] ${
                            isActive
                              ? 'bg-[#171715] text-[#FAF8F4] border border-[#171715]'
                              : 'bg-transparent text-[#171715] border border-[#E3DED5] hover:border-[#171715]'
                          }`}
                          style={{ borderRadius: '0px' }}
                        >
                          <span>{category}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Second row: Clothing & Textiles, Grooming, Beauty & Personal Style */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {FASHION_CATEGORIES_ROW_2.map((category) => {
                      const isActive = activeCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => {
                            setActiveCategory(category);
                            setActiveOverlayId(null);
                          }}
                          className={`px-3 py-1.5 font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] ${
                            isActive
                              ? 'bg-[#171715] text-[#FAF8F4] border border-[#171715]'
                              : 'bg-transparent text-[#171715] border border-[#E3DED5] hover:border-[#171715]'
                          }`}
                          style={{ borderRadius: '0px' }}
                        >
                          <span>{category}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3.2 Category Content: Hairstyles, Headwear, & Jewellery (9-Image Compositions) vs Others (In Development) */}
              {isHairstyles || isHeadwear || isJewellery ? (
                <div className="w-full mt-7 md:mt-8">
                  {/* Desktop & Tablet: Four-Left (2x2), One-Centre (dominant tall), Four-Right (2x2) */}
                  <div className="hidden md:grid md:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4 xl:gap-5 w-full items-stretch">
                    {/* Column 1: Left Group Col 1 (LEFT[0], LEFT[2]) */}
                    <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4 xl:gap-5">
                      {renderImageCard(activeLeftImages[0], 'h-[190px] lg:h-[240px] xl:h-[270px]')}
                      {renderImageCard(activeLeftImages[2], 'h-[190px] lg:h-[240px] xl:h-[270px]')}
                    </div>

                    {/* Column 2: Left Group Col 2 (LEFT[1], LEFT[3]) */}
                    <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4 xl:gap-5">
                      {renderImageCard(activeLeftImages[1], 'h-[190px] lg:h-[240px] xl:h-[270px]')}
                      {renderImageCard(activeLeftImages[3], 'h-[190px] lg:h-[240px] xl:h-[270px]')}
                    </div>

                    {/* Column 3: Centre Dominant Image (Spans the height of both side rows!) */}
                    <div className="flex flex-col h-full">
                      {renderImageCard(
                        activeCenterImage,
                        'h-full min-h-[392px] lg:min-h-[496px] xl:min-h-[556px]',
                        true
                      )}
                    </div>

                    {/* Column 4: Right Group Col 1 (RIGHT[0], RIGHT[2]) */}
                    <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4 xl:gap-5">
                      {renderImageCard(activeRightImages[0], 'h-[190px] lg:h-[240px] xl:h-[270px]')}
                      {renderImageCard(activeRightImages[2], 'h-[190px] lg:h-[240px] xl:h-[270px]')}
                    </div>

                    {/* Column 5: Right Group Col 2 (RIGHT[1], RIGHT[3]) */}
                    <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4 xl:gap-5">
                      {renderImageCard(activeRightImages[1], 'h-[190px] lg:h-[240px] xl:h-[270px]')}
                      {renderImageCard(activeRightImages[3], 'h-[190px] lg:h-[240px] xl:h-[270px]')}
                    </div>
                  </div>

                  {/* Mobile Reflow: Prioritises Centrepiece, followed by Supporting 8 Images */}
                  <div className="md:hidden w-full flex flex-col items-center">
                    {/* Dominant Centrepiece Image on Mobile */}
                    <div className="w-full max-w-sm mx-auto">
                      {renderImageCard(
                        activeCenterImage,
                        'w-full aspect-[3/4] max-h-[440px]',
                        true
                      )}
                    </div>

                    {/* Supporting 8 Images in Clean 2-Column Grid */}
                    <div className="w-full max-w-sm mx-auto grid grid-cols-2 gap-2.5 sm:gap-3 mt-2.5 sm:mt-3">
                      {[
                        activeLeftImages[0],
                        activeLeftImages[1],
                        activeLeftImages[2],
                        activeLeftImages[3],
                        activeRightImages[0],
                        activeRightImages[1],
                        activeRightImages[2],
                        activeRightImages[3],
                      ].map((item) => renderImageCard(item, 'w-full aspect-[4/5]'))}
                    </div>
                  </div>
                </div>
              ) : (
                /* OTHER FASHION CATEGORIES (Honest In-Development State) */
                <div className="mt-8 p-8 sm:p-12 bg-[#FAF8F4] border border-[#E3DED5] text-center max-w-xl mx-auto flex flex-col items-center">
                  <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#A4401F] font-semibold">
                    CURATORIAL CATALOGUING IN PROGRESS
                  </span>
                  <h4 className="font-display text-2xl text-[#171715] mt-2.5">
                    {activeCategory}
                  </h4>
                  <p className="font-sans text-xs sm:text-[13px] text-[#6B6B6B] leading-relaxed mt-2.5 max-w-md">
                    Archival specimens, documentation, and verified provenance for this category are
                    currently being catalogued. The Hairstyles &amp; Hair Artistry, Headwear &amp; Adornment, and Jewellery &amp; Beads collections are
                    currently available for viewing.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5 justify-center">
                    <button
                      type="button"
                      onClick={() => setActiveCategory('Hairstyles & Hair Artistry')}
                      className="inline-flex items-center px-4 py-2 bg-[#171715] text-[#FAF8F4] hover:bg-[#A4401F] text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
                      style={{ borderRadius: '0px' }}
                    >
                      <span>View Hairstyles &amp; Hair Artistry</span>
                      <span className="ml-2">→</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCategory('Headwear & Adornment')}
                      className="inline-flex items-center px-4 py-2 bg-transparent text-[#171715] border border-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
                      style={{ borderRadius: '0px' }}
                    >
                      <span>View Headwear &amp; Adornment</span>
                      <span className="ml-2">→</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCategory('Jewellery & Beads')}
                      className="inline-flex items-center px-4 py-2 bg-[#A4401F] text-[#FAF8F4] hover:bg-[#171715] text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F]"
                      style={{ borderRadius: '0px' }}
                    >
                      <span>View Jewellery &amp; Beads</span>
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : otherRoom ? (
            /* =====================================================================
               PHOTOGRAPHY, MUSIC, OR DESIGN: Unified Editorial Room Preview
               ===================================================================== */
            <div className="w-full flex flex-col items-center">
              {/* Content Header Row: Heading & Description on Left, Accent + Preview Label on Right */}
              <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8 lg:gap-12">
                {/* Left Column: Room Heading & Supporting Text */}
                <div className="w-full md:max-w-xl lg:max-w-2xl flex flex-col items-start text-left">
                  <h3 className="font-display text-2xl sm:text-[28px] md:text-3xl lg:text-[34px] text-[#171715] leading-[1.12] tracking-tight">
                    {otherRoom.heading}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13.5px] leading-relaxed text-[#6B6B6B] mt-2 sm:mt-2.5 max-w-[500px]">
                    {otherRoom.description}
                  </p>
                </div>

                {/* Right Column: Small Terracotta Accent & Uppercase Room-Preview Label */}
                <div className="w-full md:w-auto flex items-center md:justify-end shrink-0 pt-1 md:pt-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#A4401F] shrink-0" aria-hidden="true" />
                    <span className="font-mono text-xs sm:text-[12.5px] tracking-[0.18em] uppercase text-[#171715] font-semibold">
                      {otherRoom.previewLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* One Large Representative Archival Image Spanning Full Content Width */}
              <div className="w-full mt-7 md:mt-8">
                <div
                  className="relative w-full overflow-hidden bg-[#171715] select-none"
                  style={{ borderRadius: '0px' }}
                >
                  <img
                    src={otherRoom.image}
                    alt={otherRoom.alt}
                    className="w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[580px] xl:h-[620px] object-cover object-center"
                    style={{
                      filter:
                        otherRoom.tone === 'bw'
                          ? 'grayscale(100%) contrast(1.06)'
                          : 'sepia(35%) saturate(1.08) contrast(1.04)',
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* =========================================================================
          4. ARCHIVAL SPECIMEN ENLARGEMENT MODAL (LIGHTBOX)
          Enables high-resolution inspection, curatorial reading, and seamless browsing
          across all specimens in the active category.
          ========================================================================= */}
      <ArchivalSpecimenModal
        isOpen={enlargedSpecimenId !== null}
        onClose={() => setEnlargedSpecimenId(null)}
        specimens={activeSpecimensList}
        activeSpecimenId={enlargedSpecimenId}
        onSelectSpecimen={(id) => setEnlargedSpecimenId(id)}
        categoryTitle={activeCategory}
      />
    </section>
  );
};
