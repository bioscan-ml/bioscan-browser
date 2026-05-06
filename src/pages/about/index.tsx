import { Footer } from '@/components/footer'
import { PageContent } from '@/components/page-content'
import { buttonVariants } from '@/components/ui/button'
import { PATHS, RESOURCES } from '@/lib/constants'
import { ExternalLinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export const About = () => (
  <>
    <PageContent>
      <article className="max-w-screen-md py-6 space-y-8 md:py-12 md:space-y-16">
        <div>
          <h1 className="text-accent mb-2">BIOSCAN Browser</h1>
          <h2>Visualizing a Multimodal Dataset for Insect Biodiversity</h2>
        </div>
        <div>
          <img
            src="/assets/logos/bioscan-dataset.png"
            className="h-24 w-24 float-left mr-4"
            alt=""
          />
          <h3 className="text-accent mb-2">The Dataset</h3>
          <p className="text-muted-foreground mb-8">
            BIOSCAN-5M is a large-scale multimodal dataset of over 5 million
            insect specimens. Each record links high-resolution images with
            taxonomic labels, raw DNA barcode sequences, Barcode Index Numbers
            (BINs), and geographic information.
          </p>
          <h4 className="mb-4">Resources</h4>
          <div className="flex flex-wrap gap-4">
            <ExternalLink href={RESOURCES.PROJECT_WEBSITE} label="BIOSCAN" />
            <ExternalLink href={RESOURCES.DATASET_WEBSITE} label="BIOSCAN-5M" />
            <ExternalLink href={RESOURCES.DATASET_GITHUB} label="GitHub" />
          </div>
        </div>
        <div>
          <img
            src="/assets/logos/bioscan-browser.png"
            className="h-24 w-24 float-left mr-4"
            alt=""
          />
          <h3 className="text-accent mb-2">The Browser</h3>
          <p className="text-muted-foreground mb-8">
            The BIOSCAN Browser provides a user-friendly interface to navigate
            the BIOSCAN-5M dataset. The idea behind the browser is to lower the
            barrier for users to explore the dataset by presenting data in
            interactive and comprehensive ways. Our long-term goal for the
            browser is to help improve data quality, by making incorrect or
            missing data easier to spot and report.
          </p>
          <h4 className="mb-2">Browsing records</h4>
          <p className="text-muted-foreground mb-2">
            The browser provides various ways for users to explore records. From
            the{' '}
            <Link className="text-link" to={PATHS.TAXONOMY_TREE}>
              Taxonomy tree
            </Link>{' '}
            view, users can browse records using the taxonomic hierarchy as a
            starting point. For the selected taxon, users can choose to explore
            records from a gallery view, a table view or a chart view. The chart
            view is useful for seeing how records are distributed for lower
            taxonomic ranks.
          </p>
          <p className="text-muted-foreground mb-8">
            The{' '}
            <Link className="text-link" to={PATHS.SEARCH}>
              Search & filter
            </Link>{' '}
            view is similar to the taxonomy tree view, except this view has
            custom search and filtering support. Filters can be combined in
            various ways to narrow down the result. We currently support 14
            filter types, for example Country, Province/State and all the 7 main
            taxonomic ranks.
          </p>
          <h4 className="mb-2">Inspecting record details</h4>
          <p className="text-muted-foreground mb-2">
            In the record detail view, we first show some general information
            for the selected record. This information covers taxonomic details,
            collection location and information about who collected the data.
            After this overview, we show the 4 image versions (images with
            different resolution and crop settings), followed by geographical
            information presented as an interactive map. Also, the raw JSON data
            for the specific record can be inspected from this view.
          </p>
          <p className="text-muted-foreground mb-8">
            From the detail view, users can navigate to records with similar
            attributes, as a quick way to apply filtering.
          </p>
          <h4 className="mb-2">Integrations</h4>
          <p className="text-muted-foreground mb-8">
            The{' '}
            <a href={RESOURCES.INATURALIST_API} className="text-link">
              iNaturalist API
            </a>{' '}
            is used to populate views with more details about the current taxa,
            both in the taxonomy tree view and in the record detail view. This
            information includes common names, Wikipedia summaries and uploaded
            photos. Also, the iNaturalist API is used to provide a multi
            language common name search to the taxonomy tree view.
          </p>
        </div>
        <div>
          <h3 className="text-accent mb-2">Copyright and license</h3>
          <p className="text-muted-foreground mb-4">
            The images and metadata included in the BIOSCAN-5M dataset available
            through this tool are subject to following copyright and licensing
            restrictions:
          </p>
          <ul className="list-disc list-inside text-base text-muted-foreground space-y-1">
            <li>
              <span className="font-medium">Copyright holder:</span> CBG
              Photography Group
            </li>
            <li>
              <span className="font-medium">Copyright institution:</span> Centre
              for Biodiversity Genomics (email:{' '}
              <a className="text-link" href="mailto:cbg.analytics@uoguelph.ca">
                cbg.analytics@uoguelph.ca
              </a>
              )
            </li>
            <li>
              <span className="font-medium">Photographer:</span> CBG Robotic
              Imager
            </li>
            <li>
              <span className="font-medium">Copyright license:</span> Creative
              Commons Attribution 3.0 Unported (
              <a
                className="text-link"
                href="https://creativecommons.org/licenses/by/3.0/"
              >
                CC BY 3.0
              </a>
              )
            </li>
            <li>
              <span className="font-medium">Copyright contact:</span>{' '}
              <a
                className="text-link"
                href="mailto:cbg.collections@uoguelph.ca"
              >
                cbg.collections@uoguelph.ca
              </a>
            </li>
            <li>
              <span className="font-medium">Copyright year:</span> 2021
            </li>
          </ul>
        </div>
      </article>
    </PageContent>
    <Footer />
  </>
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
