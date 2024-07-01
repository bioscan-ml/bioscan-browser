export const CONTENT = {
  title: 'BIOSCAN-5M Insect Dataset',
  subTitle:
    'Cataloging insect biodiversity with a new large dataset of hand-labelled insect images',
  resources: [
    { href: 'https://github.com/zahrag/BIOSCAN-5M', label: 'Code' },
    {
      href: 'https://arxiv.org/abs/2406.12723',
      label: 'Paper',
    },
  ],
  sections: [
    {
      title:
        'Towards a Taxonomy Machine – A Training Set of 5.6 Million Arthropod Images',
      paragraphs: [
        'This dataset comprises of 5,675,731 images of mostly terrestrial arthropod specimens. The dataset contains images for specimens sampled from 1,698 sites in 48 countries. The image size is 2880 x 2160 pixels before cropping. This translates into an average size of 17.9MB for a tif-file and 1.88 MB for a jpg-file.',
      ],
    },
    {
      title: 'BIOSCAN-5M: A Multimodal Dataset for Insect Biodiversity',
      paragraphs: [
        'BIOSCAN-5M is a comprehensive dataset containing multi-modal information for over 5 million insect specimens, and it significantly expands existing image-based biological datasets by including taxonomic labels, raw nucleotide barcode sequences, assigned barcode index numbers, and geographical information. We propose three benchmark experiments to demonstrate the impact of the multi-modal data types on the classification and clustering accuracy.',
        'First, we pretrain a masked language model on the DNA barcode sequences of the BIOSCAN-5M dataset and demonstrate the impact of using this large reference library on species- and genus-level classification performance.',
        'Second, we propose a zero-shot transfer learning task applied to images and DNA barcodes to cluster feature embeddings obtained from self-supervised learning, to investigate whether meaningful clusters can be derived from these representation embeddings.',
        'Third, we benchmark multi-modality by performing contrastive learning on DNA barcodes, image data, and taxonomic information. This yields a general shared embedding space enabling taxonomic classification using multiple types of information and modalities.',
      ],
    },
  ],
}
