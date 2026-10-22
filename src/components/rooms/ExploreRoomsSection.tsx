import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ChevronRight } from 'lucide-react';

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

const FASHION_SUBCATEGORIES = [
  { id: 'hairstyles', label: 'Hairstyle & Hair Artistry', isDeveloped: true },
  { id: 'headwear', label: 'Headwear & Adornment', isDeveloped: true },
  { id: 'jewellery', label: 'Jewelry & Beads', isDeveloped: true },
  { id: 'clothing', label: 'Clothing & Textiles', isDeveloped: true },
  { id: 'grooming', label: 'Grooming & Beauty', isDeveloped: true },
];

// =========================================================================
// Hairstyles & Hair Artistry Collection: 9 verified archival specimens
// =========================================================================
const HAIRSTYLE_CAROUSEL_IMAGES: CarouselImageRecord[] = [
  {
    id: 'hair-01',
    displayOrder: '01',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422083/Image_8.jpg',
    title: 'Sculptural Woven Arch & Plaiting',
    shortDescription:
      'An elaborate updo combines raised braided sections and curved forms, creating a sculptural arrangement viewed from behind.',
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
      "Long, curved strands rise and fan outward from the scalp, creating a striking silhouette. The image invites closer examination of the hairstyle's shape and construction.",
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Nigerian threaded crest hairstyle with ascending spires and radiating scalp geometric lines',
  },
  {
    id: 'hair-03',
    displayOrder: '03',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422082/image9.jpg',
    title: 'Sculpted Loops & Curved Sections',
    shortDescription:
      'Curved, looped sections create a sculptural hairstyle with contrasting shapes and textures. The arrangement draws attention to the visual possibilities of hair styling.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Portrait of a smiling woman with hair styled in curved looped sections',
  },
  {
    id: 'hair-04',
    displayOrder: '04',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422082/Image_5.jpg',
    title: 'The Sculpted Flat Top',
    shortDescription:
      'A high, squared-off hairstyle creates a strong geometric silhouette. The clean outline and carefully shaped volume highlight the role of precision in hair styling.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Studio portrait of a man in formal attire with a high, precision-shaped flat top hairstyle',
  },
  {
    id: 'hair-05',
    displayOrder: '05',
    category: 'Hairstyles & Hair Artistry',
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422082/hairstyles-01-braided-crown-natural-puff.jpg',
    title: 'Braided Crown with Natural Volume',
    shortDescription:
      'A braided section at the back of the head leads into a full natural puff, combining close scalp braiding with a contrasting volume of textured hair.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Braided section at the back of the head ascending into a full natural textured puff',
  },
  {
    id: 'hair-06',
    displayOrder: '06',
    category: 'Hairstyles & Hair Artistry',
    imageUrl:
      'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422082/hairstyles-02-starburst-cornrow-knots.jpg',
    title: 'Starburst Cornrow Knots',
    shortDescription:
      'Cornrows radiate from a central point and extend outward into small raised knots, creating a distinctive starburst pattern across the scalp.',
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
    title: 'Cornrows and Sculpted Braids',
    shortDescription:
      'Closely arranged cornrows follow the scalp and meet thicker braided sections, creating a hairstyle defined by contrasting braid sizes, direction, and structure.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Closely arranged cornrows along the scalp meeting thicker sculpted braided sections',
  },
  {
    id: 'hair-09',
    displayOrder: '09',
    category: 'Hairstyles & Hair Artistry',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792422083/Image3.jpg',
    title: 'The Afro Silhouette',
    shortDescription:
      'A rounded Afro hairstyle creates a distinctive silhouette, drawing attention to the volume, shape, and texture of natural hair.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Studio portrait of a man with a rounded Afro hairstyle creating a distinctive silhouette',
  },
];

// =========================================================================
// Headwear & Adornment Collection: 9 approved archival specimens
// =========================================================================
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
// Jewellery & Beads Collection: 9 approved archival specimens
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
    title: 'Strung with Intention',
    shortDescription:
      'A cascade of colourful beads and layered neck adornment created with deliberate rhythm, spacing, and personal intent. Look at how individual glass and stone beads come together to form an intricate composition.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Strung with Intention — colourful layered bead strands framing the neck in rhythmic balance',
  },
  {
    id: 'jewel-09',
    displayOrder: '09',
    category: 'Jewellery & Beads',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792430892/The_Dark_Silhouette.jpg',
    title: 'Apo Ifa — The Beadwork of a Diviner',
    shortDescription:
      'Intricate beadwork in ceremonial regalia referencing the sacred bag of a Yoruba babalawo (diviner). In Yoruba tradition, beaded bags (àpò Ifá) carry sacred divination instruments and signify spiritual authority and visual mastery. Do not claim the displayed image depicts the exact Metropolitan Museum of Art object (accession 1978.412.729) without direct archival verification.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Apo Ifa — The Beadwork of a Diviner — ceremonial beaded regalia celebrating sacred craft and visual mastery',
  },
];

// =========================================================================
// Clothing & Textiles Collection: 9 approved archival specimens
// =========================================================================
const CLOTHING_COLLECTION_IMAGES: CarouselImageRecord[] = [
  {
    id: 'cloth-01',
    displayOrder: '01',
    category: 'Clothing & Textiles',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792673318/Threads_of_Tradition.jpg',
    title: 'The Hands Behind the Cloth',
    shortDescription:
      'An artisan works at a wooden loom, interlacing coloured threads to create patterned cloth. The image draws attention to the manual skill and labour involved in textile production.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'The Hands Behind the Cloth — an artisan weaving patterned cloth at a traditional wooden loom',
  },
  {
    id: 'cloth-02',
    displayOrder: '02',
    category: 'Clothing & Textiles',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792673318/Authentic_Handwoven_Akwete_Fabric.jpg',
    title: 'Akwete: Patterns in the Weave',
    shortDescription:
      'A patterned woven textile displays repeated geometric arrangements and contrasting colours. The image introduces Akwete as a named Nigerian weaving tradition.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Akwete: Patterns in the Weave — handwoven Akwete textile displaying geometric patterns and contrasting colours',
  },
  {
    id: 'cloth-03',
    displayOrder: '03',
    category: 'Clothing & Textiles',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792673317/Ikaki_Akwete_Cloth.jpg',
    title: 'Ikaki: A Distinctive Textile Motif',
    shortDescription:
      'A textile identified as Ikaki Akwete cloth presents a distinctive patterned surface. The image invites closer attention to the relationship between textile design, pattern, and weaving.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Ikaki: A Distinctive Textile Motif — handwoven Ikaki Akwete cloth showing intricate patterned motifs',
  },
  {
    id: 'cloth-04',
    displayOrder: '04',
    category: 'Clothing & Textiles',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792673479/Yoruba_Tunic___Nigeria.jpg',
    title: 'Cloth Becomes Clothing',
    shortDescription:
      'A complete tunic, trousers, and matching cap demonstrate how patterned cloth comes together as a coordinated outfit. The image focuses on garment form and the relationship between fabric and dress.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Cloth Becomes Clothing — complete coordinated Nigerian tunic, trousers, and matching cap ensemble',
  },
  {
    id: 'cloth-05',
    displayOrder: '05',
    category: 'Clothing & Textiles',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792673525/Hausa_embroidery_detail.jpg',
    title: 'The Art of Embroidery',
    shortDescription:
      'A close view of decorative embroidery reveals contrasting colours, carefully arranged shapes, and the detail applied to a garment. The image focuses on embellishment as part of clothing craftsmanship.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'The Art of Embroidery — close-up of intricate hand embroidery showing geometric stitchwork',
  },
  {
    id: 'cloth-06',
    displayOrder: '06',
    category: 'Clothing & Textiles',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792673525/2919D.jpg',
    title: 'Garments as Cultural Expression',
    shortDescription:
      'A traditionally styled robe features a flowing silhouette and prominent geometric decorative panels. The image invites visitors to examine how garment shape, fabric, and ornamentation contribute to visual identity.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Garments as Cultural Expression — flowing robe with decorative embroidered geometric chest panels',
  },
  {
    id: 'cloth-07',
    displayOrder: '07',
    category: 'Clothing & Textiles',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792673527/Aso_oke_people.png',
    title: 'Clothing and Community',
    shortDescription:
      'A group wears coordinated purple garments and complementary adornments. The image illustrates how clothing can be experienced collectively, providing a starting point for exploring dress, belonging, and shared occasions.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'Clothing and Community — gathering in coordinated ceremonial attire celebrating shared identity',
  },
  {
    id: 'cloth-08',
    displayOrder: '08',
    category: 'Clothing & Textiles',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792673526/Stacked_Ankara_cloth_patterns.jpg',
    title: 'The Variety of Printed Cloth',
    shortDescription:
      'A stack of colourful printed fabrics displays contrasting patterns, shapes, and colour combinations. The image introduces the visual variety of printed cloth used in contemporary clothing.',
    sourceCredit: 'Archival Collection Specimen',
    alt: 'The Variety of Printed Cloth — stack of vibrant printed cotton fabrics displaying diverse geometric motifs',
  },
  {
    id: 'cloth-09',
    displayOrder: '09',
    category: 'Clothing & Textiles',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792673699/Indigo_The_art_of_resist.png',
    title: 'Indigo: The Art of Resist Dyeing',
    shortDescription:
      'An illustrative scene shows a textile artisan lifting indigo-dyed cloth from a dye vat, revealing contrasting patterns created through resist-dyeing techniques. The image evokes the craft behind patterned textiles.',
    sourceCredit: 'Illustrative Reconstruction (AI-Generated Scene)',
    alt: 'Indigo: The Art of Resist Dyeing — illustrative scene of artisan drawing patterned cloth from an indigo dye vat',
  },
];

// =========================================================================
// Grooming, Beauty & Personal Style Collection: 9 curated archival specimens
// =========================================================================
const GROOMING_COLLECTION_IMAGES: CarouselImageRecord[] = [
  {
    id: 'groom-01',
    displayOrder: '01',
    category: 'Grooming & Beauty',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792682847/Elegant_Coral_Bead_Portrait.png',
    title: 'Individuality & Self-Expression',
    shortDescription:
      'A woman’s sculptural hairstyle, coral-coloured adornments, jewellery, and carefully coordinated clothing come together in a distinctive portrait. The image explores how beauty and personal presentation can become forms of individual expression.',
    sourceCredit: 'Illustrative Reconstruction (AI-Generated Portrait)',
    alt: 'Individuality & Self-Expression — illustrative portrait of a woman with sculptural hairstyle, coral adornments, and coordinated clothing',
  },
  {
    id: 'groom-02',
    displayOrder: '02',
    category: 'Grooming & Beauty',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792682098/Regal_African_Headwrap_Portrait.png',
    title: 'The Art of Adornment',
    shortDescription:
      'An elaborate headwrap, layered beads, statement earrings, and coordinated traditional-style clothing create a richly detailed portrait. The image invites visitors to examine how headwear, jewellery, colour, and ornamentation work together in personal presentation.',
    sourceCredit: 'Illustrative Reconstruction (AI-Generated Portrait)',
    alt: 'The Art of Adornment — illustrative portrait featuring elaborate headwrap, layered beads, statement earrings, and traditional-style clothing',
  },
  {
    id: 'groom-03',
    displayOrder: '03',
    category: 'Grooming & Beauty',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792681547/Brenda_Holloway_1967.jpg',
    title: 'Beauty Through Time',
    shortDescription:
      'A vintage-looking image of a beauty practitioner applying makeup captures an intimate moment in the process of getting ready. It provides an entry point for exploring changing beauty practices, professional techniques, and the people who helped shape them.',
    sourceCredit: 'Archival Collection Specimen (Mid-20th-Century Vintage Photograph)',
    alt: 'Beauty Through Time — vintage photograph showing a beauty practitioner applying makeup at a dressing table',
  },
  {
    id: 'groom-04',
    displayOrder: '04',
    category: 'Grooming & Beauty',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792682730/1960s_Salon_Styling_Moment.png',
    title: 'The Hands Behind Beauty',
    shortDescription:
      'A stylist carefully arranges a seated woman’s hair inside a vintage salon. The scene highlights the hands-on skill, attention, and personal interaction involved in beauty work, while offering a glimpse into an earlier salon environment.',
    sourceCredit: 'Illustrative Reconstruction (AI-Generated Salon Scene)',
    alt: 'The Hands Behind Beauty — illustrative scene of a hair stylist arranging hair in a mid-century salon',
  },
  {
    id: 'groom-05',
    displayOrder: '05',
    category: 'Grooming & Beauty',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792681547/beauty_reimagined.jpg',
    title: 'Beauty Reimagined',
    shortDescription:
      'A contemporary beauty portrait uses expressive makeup, bold colour, and striking styling to create an unconventional visual identity. The image explores beauty as experimentation, creativity, and the freedom to interpret personal style.',
    sourceCredit: 'Contemporary Editorial Creative Archive',
    alt: 'Beauty Reimagined — contemporary beauty portrait displaying expressive makeup, vibrant colour, and bold styling',
  },
  {
    id: 'groom-06',
    displayOrder: '06',
    category: 'Grooming & Beauty',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792681547/What_Is_African_Black_Soap_Made_Of__Baraka_Guide_-_Baraka_Impact.jpg',
    title: 'The Making of Black Soap',
    shortDescription:
      'An image associated with African black soap introduces the materials and production processes behind a familiar beauty product. It invites visitors to look beyond the finished product and consider the knowledge, ingredients, and labour involved in making it.',
    sourceCredit: 'Material Craft Documentation (Baraka Impact / Archival Guide)',
    alt: 'The Making of Black Soap — raw ingredients, materials, and traditional craftsmanship behind artisanal black soap',
  },
  {
    id: 'groom-07',
    displayOrder: '07',
    category: 'Grooming & Beauty',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792681547/Did_you_know__Shea_butter_is_extracted_from_the.jpg',
    title: 'The People Behind Beauty Ingredients',
    shortDescription:
      'The production of shea butter offers a way to explore the people, processes, and materials behind beauty ingredients. The image shifts attention from the finished product to the work and knowledge involved in its preparation.',
    sourceCredit: 'Agricultural & Material Documentation',
    alt: 'The People Behind Beauty Ingredients — artisanal extraction, processing, and preparation of natural shea butter',
  },
  {
    id: 'groom-08',
    displayOrder: '08',
    category: 'Grooming & Beauty',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792682285/324962929381242977.jpg',
    title: 'Preparing for the Occasion',
    shortDescription:
      'A woman applies lipstick while preparing her appearance at a dressing table surrounded by cosmetics and personal accessories. The scene captures the intimate process of getting ready and the choices involved in presenting oneself for an occasion.',
    sourceCredit: 'Archival Collection Specimen (Intimate Dressing Table Study)',
    alt: 'Preparing for the Occasion — woman applying lipstick at a dressing table surrounded by cosmetics and accessories',
  },
  {
    id: 'groom-09',
    displayOrder: '09',
    category: 'Grooming & Beauty',
    imageUrl: 'https://res.cloudinary.com/jlggrwhm/image/upload/v1792681549/Artisanal_African-Inspired_Beauty_Still_Life.png',
    title: 'The Tools and Products of Beauty',
    shortDescription:
      'A carefully arranged still life brings together soaps, oils, creams, powders, brushes, combs, and natural-looking materials. The composition highlights the tools and products used in beauty practices and invites visitors to examine the objects behind personal care and presentation.',
    sourceCredit: 'Illustrative Reconstruction (AI-Generated Still Life)',
    alt: 'The Tools and Products of Beauty — illustrative still life arrangement of soaps, oils, wooden combs, and beauty vessels',
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
  // Four Creative Disciplines: Fashion, Photography, Music, Design (Fashion default)
  const [activeDisciplineId, setActiveDisciplineId] = useState<string>('fashion');
  // Fashion subcategory filters
  const [activeFashionSubId, setActiveFashionSubId] = useState<string>('hairstyles');
  // Slide index: 0 (Images 1-3), 1 (Images 4-6), 2 (Images 7-9)
  const [slideIndex, setSlideIndex] = useState<number>(0);
  // Crossfade transition state for slide pagination
  const [isCrossfading, setIsCrossfading] = useState<boolean>(false);
  // Expandable description per card (See more / See less)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // Switch discipline tab
  const handleDisciplineChange = (discId: string) => {
    setActiveDisciplineId(discId);
    setSlideIndex(0);
    setExpandedCards({});
  };

  // Switch fashion subcategory
  const handleFashionSubChange = (subId: string) => {
    setActiveFashionSubId(subId);
    setSlideIndex(0);
    setExpandedCards({});
  };

  // Active collection for Fashion
  const getActiveFashionSpecimens = (): CarouselImageRecord[] => {
    switch (activeFashionSubId) {
      case 'headwear':
        return HEADWEAR_COLLECTION_IMAGES;
      case 'jewellery':
        return JEWELLERY_COLLECTION_IMAGES;
      case 'clothing':
        return CLOTHING_COLLECTION_IMAGES;
      case 'grooming':
        return GROOMING_COLLECTION_IMAGES;
      case 'hairstyles':
      default:
        return HAIRSTYLE_CAROUSEL_IMAGES;
    }
  };

  const isCurrentSubcategoryDeveloped =
    activeFashionSubId === 'hairstyles' ||
    activeFashionSubId === 'headwear' ||
    activeFashionSubId === 'jewellery' ||
    activeFashionSubId === 'clothing' ||
    activeFashionSubId === 'grooming';

  const currentSpecimens = getActiveFashionSpecimens();

  // Exactly 3 cards per screen (Slide 0: 1-3, Slide 1: 4-6, Slide 2: 7-9)
  const slideCards = currentSpecimens.slice(slideIndex * 3, slideIndex * 3 + 3);
  const cardLeft = slideCards[0] || currentSpecimens[0];
  const cardCenter = slideCards[1] || currentSpecimens[1];
  const cardRight = slideCards[2] || currentSpecimens[2];

  const otherRoom = OTHER_ROOMS_DATA[activeDisciplineId];

  return (
    <section
      id="explore-rooms"
      aria-label="Explore the Rooms Exhibition"
      className="relative w-full bg-[#FAF8F4] text-[#171715] py-20 sm:py-24 lg:py-28 overflow-hidden select-none"
    >


      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        {/* =========================================================================
            1. TOP INTRODUCTORY AREA
            - Eyebrow: EXPLORE THE ROOMS
            - Display Headline: Four rooms. Many stories.
            - Supporting text
            - Centered horizontally without redundant top buttons
            ========================================================================= */}
        <ScrollReveal className="w-full max-w-2xl mx-auto flex flex-col items-center text-center" delayMs={50}>
          <span className="font-mono text-[11px] font-semibold tracking-[0.24em] uppercase text-[#A4401F] mb-3 block">
            EXPLORE THE ROOMS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-[54px] lg:text-[58px] text-[#171715] leading-[1.04] tracking-tight">
            <span>Four rooms. </span>
            <span className="italic text-[#A4401F] font-normal">Many stories.</span>
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] leading-[1.6] text-[#6B6B6B] mt-3 max-w-[540px]">
            Explore Nigeria’s creative history through the people, practices, and ideas that continue
            to shape how we see, hear, wear, and make.
          </p>
        </ScrollReveal>

        {/* =========================================================================
            2. FOUR CREATIVE DISCIPLINE NAVIGATION TABS
            - Fashion | Photography | Music | Design
            - Evenly distributed navigation with bottom divider
            - Active tab underline matching text width
            ========================================================================= */}
        <ScrollReveal
          className="w-full mt-10 md:mt-12 border-b border-[#E3DED5]"
          delayMs={120}
        >
        <nav
          aria-label="Creative discipline exhibition rooms"
          className="w-full"
        >
          <div className="flex items-center justify-between sm:justify-center sm:gap-12 md:gap-20">
            {ROOM_TABS.map((disc) => {
              const isActive = activeDisciplineId === disc.id;
              return (
                <button
                  key={disc.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleDisciplineChange(disc.id)}
                  className={`group relative pb-3.5 pt-1 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] ${
                    isActive
                      ? 'text-[#171715] font-semibold'
                      : 'text-[#6B6B6B] hover:text-[#171715]'
                  }`}
                  style={{ borderRadius: '0px' }}
                >
                  <span>{disc.title}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#171715]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
        </ScrollReveal>

        {/* =========================================================================
            3. DISCIPLINE CONTENT PANEL
            - If Fashion: displays Category Heading, Description, and Subcategory Filters
            - If Photography, Music, Design: displays approved Room Preview layout with 1 representative image
            ========================================================================= */}
        <div className="w-full mt-10 md:mt-12">
          {activeDisciplineId === 'fashion' ? (
            /* =====================================================================
               FASHION ROOM
               ===================================================================== */
            <div className="w-full flex flex-col items-start text-left">
              <h3 className="font-display text-2xl sm:text-3xl md:text-[34px] text-[#171715] leading-[1.12] tracking-tight">
                Fashion is more than what we wear.
              </h3>
              <p className="font-sans text-xs sm:text-[13.5px] leading-relaxed text-[#6B6B6B] mt-2 max-w-[520px]">
                Explore how hairstyles, clothing, jewellery, and textiles express identity, craft, and
                creativity across Nigerian life.
              </p>

              {/* Subcategory Filter Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {FASHION_SUBCATEGORIES.map((sub) => {
                  const isSelected = activeFashionSubId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleFashionSubChange(sub.id)}
                      className={`px-3.5 py-1.5 font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] ${
                        isSelected
                          ? 'bg-[#171715] text-[#FAF8F4] border border-[#171715]'
                          : 'bg-transparent text-[#171715] border border-[#E3DED5] hover:border-[#171715]'
                      }`}
                      style={{ borderRadius: '0px' }}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>

              {/* 3.1 Content: 3-Card Asymmetric Gallery (for Hairstyles, Headwear, Jewellery) vs Minimal In-Development State */}
              {isCurrentSubcategoryDeveloped ? (
                <div
                  role="region"
                  aria-label={`Fashion gallery slide ${slideIndex + 1} of 3`}
                  className="w-full mt-12 md:mt-14"
                >
                  {/* Desktop & Tablet 3-Card Row with subtle crossfade */}
                  <div
                    className="hidden md:grid md:grid-cols-[303fr_301fr_301fr] gap-[64px] lg:gap-[88px] w-full items-stretch min-h-[510px] transition-opacity duration-300 ease-out"
                    style={{ opacity: isCrossfading ? 0 : 1 }}
                  >
                    {/* ---------------- CARD 1: LEFT ---------------- */}
                    <article className="flex flex-col justify-between h-[510px] w-full bg-transparent">
                      <div
                        className="relative w-full h-[360px] bg-[#E3DED5] overflow-hidden"
                        style={{ borderRadius: '0px' }}
                      >
                        <img
                          src={cardLeft.imageUrl}
                          alt={cardLeft.alt}
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>

                      <div className="pt-3.5 flex flex-col justify-start flex-1">
                        <h4 className="font-display text-xl lg:text-[22px] text-[#171715] leading-[1.15] tracking-tight">
                          {cardLeft.title}
                        </h4>
                        <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-[#6B6B6B] mt-1.5">
                          {expandedCards[cardLeft.id]
                            ? cardLeft.shortDescription
                            : `${cardLeft.shortDescription.slice(0, 110)}...`}
                        </p>
                        {cardLeft.shortDescription.length > 110 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(cardLeft.id)}
                            className="mt-1 text-left font-mono text-[10.5px] uppercase tracking-wider text-[#A4401F] hover:text-[#171715] font-semibold cursor-pointer"
                          >
                            {expandedCards[cardLeft.id] ? 'See less' : 'See more'}
                          </button>
                        )}
                      </div>
                    </article>

                    {/* ---------------- CARD 2: CENTRE ---------------- */}
                    <article className="relative flex flex-col h-[510px] w-full overflow-hidden bg-[#E3DED5]">
                      <img
                        src={cardCenter.imageUrl}
                        alt={cardCenter.alt}
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out hover:scale-[1.02]"
                        loading="lazy"
                      />

                      {/* Inset White Content Card */}
                      <div
                        className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 sm:p-5 shadow-sm border border-[#E3DED5]/80 z-10"
                        style={{ borderRadius: '0px' }}
                      >
                        <h4 className="font-display text-lg lg:text-[20px] text-[#171715] leading-[1.15] tracking-tight">
                          {cardCenter.title}
                        </h4>
                        <p className="font-sans text-[12px] sm:text-[12.5px] leading-relaxed text-[#6B6B6B] mt-1">
                          {expandedCards[cardCenter.id]
                            ? cardCenter.shortDescription
                            : `${cardCenter.shortDescription.slice(0, 95)}...`}
                        </p>
                        {cardCenter.shortDescription.length > 95 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(cardCenter.id)}
                            className="mt-1 text-left font-mono text-[10.5px] uppercase tracking-wider text-[#A4401F] hover:text-[#171715] font-semibold cursor-pointer"
                          >
                            {expandedCards[cardCenter.id] ? 'See less' : 'See more'}
                          </button>
                        )}
                      </div>
                    </article>

                    {/* ---------------- CARD 3: RIGHT ---------------- */}
                    <article className="flex flex-col justify-between h-[510px] w-full bg-transparent">
                      <div className="pb-3 flex flex-col justify-start">
                        <h4 className="font-display text-xl lg:text-[22px] text-[#171715] leading-[1.15] tracking-tight">
                          {cardRight.title}
                        </h4>
                        <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-[#6B6B6B] mt-1.5">
                          {expandedCards[cardRight.id]
                            ? cardRight.shortDescription
                            : `${cardRight.shortDescription.slice(0, 110)}...`}
                        </p>
                        {cardRight.shortDescription.length > 110 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(cardRight.id)}
                            className="mt-1 text-left font-mono text-[10.5px] uppercase tracking-wider text-[#A4401F] hover:text-[#171715] font-semibold cursor-pointer"
                          >
                            {expandedCards[cardRight.id] ? 'See less' : 'See more'}
                          </button>
                        )}
                      </div>

                      <div
                        className="relative w-full h-[360px] bg-[#E3DED5] overflow-hidden"
                        style={{ borderRadius: '0px' }}
                      >
                        <img
                          src={cardRight.imageUrl}
                          alt={cardRight.alt}
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    </article>
                  </div>

                  {/* Mobile & Small Screen Vertical Presentation */}
                  <div
                    className="md:hidden flex flex-col gap-8 w-full transition-opacity duration-300 ease-out"
                    style={{ opacity: isCrossfading ? 0 : 1 }}
                  >
                    {slideCards.map((card) => (
                      <article key={card.id} className="flex flex-col bg-transparent w-full">
                        <div
                          className="relative w-full h-[320px] bg-[#E3DED5] overflow-hidden"
                          style={{ borderRadius: '0px' }}
                        >
                          <img
                            src={card.imageUrl}
                            alt={card.alt}
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                        <div className="pt-3">
                          <h4 className="font-display text-xl text-[#171715] leading-[1.15]">
                            {card.title}
                          </h4>
                          <p className="font-sans text-xs text-[#6B6B6B] mt-1.5 leading-relaxed">
                            {expandedCards[card.id]
                              ? card.shortDescription
                              : `${card.shortDescription.slice(0, 120)}...`}
                          </p>
                          {card.shortDescription.length > 120 && (
                            <button
                              type="button"
                              onClick={() => toggleExpand(card.id)}
                              className="mt-1 font-mono text-[10.5px] uppercase tracking-wider text-[#A4401F] hover:text-[#171715] font-semibold cursor-pointer"
                            >
                              {expandedCards[card.id] ? 'See less' : 'See more'}
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Bottom Slide Indicators: 3 bars on lower-right */}
                  <div className="w-full flex items-center justify-end mt-12 md:mt-14">
                    <div
                      role="tablist"
                      aria-label="Gallery slides pagination"
                      className="flex items-center gap-[15px]"
                    >
                      {[0, 1, 2].map((idx) => {
                        const isActive = slideIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`Go to slide ${idx + 1} of 3`}
                            onClick={() => {
                              setSlideIndex(idx);
                              setExpandedCards({});
                            }}
                            className={`transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4401F] ${
                              isActive ? 'bg-[#171715]' : 'bg-[#D5D0C1] hover:bg-[#B3ADA0]'
                            }`}
                            style={{
                              width: '38px',
                              height: '5px',
                              borderRadius: '0px',
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Honest In-Development State for Clothing & Textiles or Grooming & Beauty */
                <div
                  className="w-full mt-10 p-8 sm:p-12 md:p-16 border border-[#E3DED5] bg-[#FAF8F4] flex flex-col items-center justify-center text-center"
                  style={{ borderRadius: '0px' }}
                >
                  <span className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-[#A4401F] font-semibold">
                    CURATORIAL CATALOGUING IN PROGRESS
                  </span>
                  <h4 className="font-display text-2xl sm:text-3xl text-[#171715] mt-3">
                    {activeFashionSubId === 'clothing'
                      ? 'Clothing & Textiles'
                      : 'Grooming, Beauty & Personal Style'}
                  </h4>
                  <p className="font-sans text-xs sm:text-[13.5px] text-[#6B6B6B] leading-relaxed mt-2.5 max-w-md">
                    Archival specimens, documentation, and verified provenance for this category are
                    currently being catalogued. The Hairstyles &amp; Hair Artistry, Headwear &amp; Adornment,
                    Jewellery &amp; Beads, and Clothing &amp; Textiles collections are currently available for viewing.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
                    <button
                      type="button"
                      onClick={() => setActiveFashionSubId('hairstyles')}
                      className="inline-flex items-center px-4 py-2 bg-transparent text-[#171715] border border-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                      style={{ borderRadius: '0px' }}
                    >
                      <span>View Hairstyles &amp; Hair Artistry</span>
                      <span className="ml-2">→</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFashionSubId('headwear')}
                      className="inline-flex items-center px-4 py-2 bg-transparent text-[#171715] border border-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                      style={{ borderRadius: '0px' }}
                    >
                      <span>View Headwear &amp; Adornment</span>
                      <span className="ml-2">→</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFashionSubId('jewellery')}
                      className="inline-flex items-center px-4 py-2 bg-transparent text-[#171715] border border-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                      style={{ borderRadius: '0px' }}
                    >
                      <span>View Jewellery &amp; Beads</span>
                      <span className="ml-2">→</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFashionSubId('clothing')}
                      className="inline-flex items-center px-4 py-2 bg-[#A4401F] text-[#FAF8F4] hover:bg-[#171715] text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                      style={{ borderRadius: '0px' }}
                    >
                      <span>View Clothing &amp; Textiles</span>
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : otherRoom ? (
            /* =====================================================================
               PHOTOGRAPHY, MUSIC, OR DESIGN ROOM PREVIEW
               - Preserves approved room preview layout:
               - Heading and supporting paragraph on left
               - Terracotta accent dot & uppercase preview label on right
               - Exactly 1 representative image spanning content width
               ===================================================================== */
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8 lg:gap-12">
                <div className="w-full md:max-w-md lg:max-w-lg flex flex-col items-start text-left">
                  <h3 className="font-display text-2xl sm:text-[28px] md:text-3xl lg:text-[34px] text-[#171715] leading-[1.12] tracking-tight">
                    {otherRoom.heading}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13.5px] leading-relaxed text-[#6B6B6B] mt-2 sm:mt-2.5 max-w-[500px]">
                    {otherRoom.description}
                  </p>
                </div>

                <div className="w-full md:w-auto flex items-center md:justify-end shrink-0 pt-1 md:pt-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#A4401F] shrink-0" aria-hidden="true" />
                    <span className="font-mono text-xs sm:text-[12.5px] tracking-[0.18em] uppercase text-[#171715] font-semibold">
                      {otherRoom.previewLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* One Representative Archival Image */}
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
    </section>
  );
};
