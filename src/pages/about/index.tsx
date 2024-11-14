import { PageContent } from '@/components/page-content'
import { buttonVariants } from '@/components/ui/button'
import { ExternalLinkIcon } from 'lucide-react'

export const About = () => (
  <PageContent>
    <article className="max-w-screen-md py-12 space-y-12">
      <div>
        <h1 className="text-primary mb-2">BIOSCAN Browser</h1>
        <h2>Visualizing A Multimodal Dataset for Insect Biodiversity</h2>
      </div>
      <div>
        <h3 className="text-primary mb-2">The Dataset</h3>
        <p className="text-muted-foreground mb-8">
          BIOSCAN-5M is a dataset containing multi-modal information for
          5,150,850 insect specimens. Except for images, the dataset includes
          taxonomic labels, raw nucleotide barcode sequences, assigned barcode
          index numbers, and geographical information. The dataset includes
          specimens collected from 1,650 sites across 47 countries.
        </p>
        <h4 className="mb-2">Resources</h4>
        <div className="flex gap-4">
          <ExternalLink
            href="https://biodiversitygenomics.net/projects/5m-insects/"
            label="Website"
          />
          <ExternalLink
            href="https://github.com/bioscan-ml/BIOSCAN-5M/"
            label="GitHub"
          />
        </div>
      </div>
      <div>
        <h3 className="text-primary mb-2">The Browser</h3>
        <p className="text-muted-foreground mb-8">
          The BIOSCAN Browser provides a user-friendly interface to navigate the
          BIOSCAN-5M dataset. The idea behind the browser is to lower the threshold for users to
          explore the dataset by presenting data in interactive and
          comprehensive ways. Our long-term goal for the tool is to help improve
          data quality, by making incorrect or missing data easier to spot
          and report.
        </p>
        <h4 className="mb-2">Browsing records</h4>
        <p className="text-muted-foreground mb-2">
          The browser provides various ways for users to explore records. From
          the Taxonomy viewer, users can browse records using the taxonomic
          hierarchy as a starting point. For the selected taxon, users can
          choose to explore records from a gallery view, a table view or a chart
          view. The chart view is useful for seeing how records are distributed
          for lower taxonomic ranks.
        </p>
        <p className="text-muted-foreground mb-8">
          The Asset querier is similar to the Taxonomy viewer, except this view
          has custom filtering support. Filters can be combined in various ways
          to narrow down the result. The Asset querier currently has 14 filter
          types, for example Country, Province/State and all the 7 main
          taxonomic ranks.
        </p>
        <h4 className="mb-2">Inspecting record details</h4>
        <p className="text-muted-foreground mb-2">
          In the record detail view, we first show some general information for
          the selected record. This information covers taxonomic details,
          collection location and information about who collected the data. After this overview, we show the 4 image
          versions (images with different resolution and crop settings),
          followed by geographical information presented as an interactive map.
          Also, the raw JSON data for the specific record can be inspected from
          this view.
        </p>
        <p className="text-muted-foreground mb-8">
          From the detail view, users can navigate to records with similar
          attributes, as a quick way to apply filtering.
        </p>
        <h4 className="mb-2">Integrations</h4>
        <p className="text-muted-foreground mb-8">
          The iNaturalist API is used to populate views with more details about
          the current taxa, both in the Taxonomy viewer and in the record detail
          view. This information includes common names, Wikipedia summaries and
          uploaded photos. Also, the iNaturalist API is used to provide a multi
          language common name search to the taxonomy viewer.
        </p>
        <h4 className="mb-2">Resources</h4>
        <div className="flex gap-4">
          <ExternalLink
            href="https://github.com/bioscan-ml/bioscan-browser/"
            label="GitHub"
          />
          <ExternalLink
            href="https://api.inaturalist.org/v1/docs/"
            label="iNaturalist API"
          />
        </div>
      </div>
    </article>
  </PageContent>
)

const ExternalLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={buttonVariants({
      variant: 'outline',
    })}
  >
    {label}
    <ExternalLinkIcon className="h-4 w-4 ml-3" />
  </a>
)
