export const CONTENT = {
  title: 'BIOSCAN Browser',
  subTitle: 'Visualizing A Multimodal Dataset for Insect Biodiversity',
  sections: [
    {
      title: 'The Dataset',
      paragraphs: [
        'BIOSCAN-5M is a dataset containing multi-modal information for 5,150,850 insect specimens, and it significantly expands existing image-based biological datasets by including taxonomic labels, raw nucleotide barcode sequences, assigned barcode index numbers, and geographical information. The dataset includes specimens collected from 1,650 sites across 47 countries.',
      ],
      resources: [
        {
          href: 'https://biodiversitygenomics.net/projects/5m-insects/',
          label: 'Website',
        },
        { href: 'https://github.com/zahrag/BIOSCAN-5M', label: 'GitHub' },
      ],
    },
    {
      title: 'The Browser',
      paragraphs: [
        'The BIOSCAN Browser provides a user-friendly interface to navigate the BIOSCAN-5M dataset. The goal is to lower the threshold for users to explore the dataset by presenting data in interactive and comprehensive ways. A long term goal for the tool is to improve data quality, by making incorrect or missing data easier to spot and report.',
        '[Section about browsing records?]',
        '[Section about record details?]',
        '[Section about similarity search?]',
      ],
      resources: [
        {
          href: 'https://github.com/bioscan-ml/bioscan-browser/',
          label: 'GitHub',
        },
      ],
    },
  ],
}
