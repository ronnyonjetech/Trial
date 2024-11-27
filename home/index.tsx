//@ts-ignore
//@ts-nocheck
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [results, setResults] = useState(0)
  const [searchType, setSearchType] = useState('abstract'); // State to track search type selection
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [journals, setJournals] = useState([])
  const pageSize = 10
  const [numberJournals, setNumberJournals] = useState(0)

  const [filters, setFilters] = useState({
    Present_on_ISSN: null,
    african_index_medicus: null,
    directory_of_african_journals: null,
    hosted_on_INASPS: null,
    indexed_on_google_scholar: null,
    member_of_Committee_on_publication_Ethics: null,
    online_publisher_in_africa: null,
    open_access_journal: null,
  })
 // https://aphrc.site/journal_api/journals/search/
  // http://127.0.0.1:8000/
  const baseUrl = "https://aphrc.site/journal_api/journals/search/"

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }))
  }

  const generateUrl = () => {
    const queryParams = Object.entries(filters)
      .filter(([key, value]) => value !== null) // Only include non-null values
      .map(([key, value]) => `${key}=${value}`)
      .join("&")

    const query = searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : ""
    const page = `&page=${currentPage}`
    const pageSizeParam = `&page_size=${pageSize}`

    return `${baseUrl}?${queryParams}${query}${page}${pageSizeParam}`
  }

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        // Generate dynamic URL for search filters
        const url = generateUrl()
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data.results)
        setJournals(data.results)
        setTotalPages(Math.ceil(data.count / pageSize)) // Calculate total pages
        setResults(data.count)
        setNumberJournals(data.count)
      } catch (error) {
        window.location.reload()
      }
    }

    fetchJournals()
  }, [currentPage, searchQuery, filters])

  const handleSearch = () => {
    console.log(`Searching by ${searchType}:`, searchQuery);
    setCurrentPage(1) // Reset to first page when performing a new search
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='flex min-h-screen flex-col'>
          <header className='flex items-center justify-between bg-primary text-primary-foreground'></header>
          <main className='flex-grow'>
            <section className='-z-10 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-20 text-center text-black'>
              <h1 className='mb-4 text-4xl font-bold'>
                Browse our journals that are just right for you
              </h1>
              <p className='mb-8'>
                Choose from over {numberJournals} journals and learning paths,
                with dozens added every week. Top it off with courses that round
                out your skills and enrich your day-to-day.
              </p>
              {/* Search Type Selector */}
              <div className='mb-4 flex items-center justify-center space-x-4 '>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='searchType'
                    value='abstract'
                    checked={searchType === 'abstract'}
                    onChange={() => setSearchType('abstract')}
                    className='mr-2'
                  />
                  Search by abstract
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='searchType'
                    value='keyword'
                    checked={searchType === 'keyword'}
                    onChange={() => setSearchType('keyword')}
                    className='mr-2'
                  />
                  Search by keywords, journal title, discipline, language,
                  country...
                </label>
              </div>

              <div className='relative mx-auto max-w-2xl'>
                <Input
                  className='w-full rounded-full bg-white px-8 py-8'
                  placeholder='Search Article'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type='text'
                />
                <Button
                  className='absolute right-5 top-3 rounded-full'
                  size='icon'
                  variant={'ghost'}
                  onClick={handleSearch}
                >
                  <Search className='h-8 w-8' />
                  <span className='sr-only'>Search</span>
                </Button>
              </div>
            </section>
            <section className='px-4 py-12'>
              <div className='mx-auto max-w-6xl'>
                <div className='mb-8 flex items-center justify-between'>
                  <p>{results} results</p>
                  <div className='fixed right-4 top-1/2 flex -translate-y-1/2 transform flex-col items-center space-y-2'>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      aria-label='Go to previous page'
                    >
                      <ChevronLeft className='h-4 w-4 rotate-90' />
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      aria-label='Go to next page'
                    >
                      <ChevronRight className='h-4 w-4 -rotate-90' />
                    </Button>
                  </div>
                </div>
                <div className='grid gap-8'>
                  <div className='space-y-4'>
                    <ScrollArea className='h-[1200px]'>
                      {journals.map((journal, i) => (
                        <Card key={i} className='mb-4'>
                          <CardContent className='pt-6'>
                            <h2 className='mb-2 text-lg font-semibold text-blue-800'>
                              <Link to={`/journals/${journal.id}`}>
                                {journal.journal_title
                                  ? journal.journal_title
                                  : 'journal title unspecified'}
                              </Link>
                            </h2>
                            <p className='mb-2 text-sm text-gray-600'>
                              {journal.publishers_name
                                ? journal.publishers_name
                                : 'publisher unspecified'}
                            </p>
                            <p className='mb-2 text-sm text-green-800'>
                              {journal.thematic_area
                                ? journal.thematic_area.thematic_area
                                : 'thematic area not specified'}
                            </p>
                            <p className='mb-2 text-sm text-orange-800'>
                              {journal.country
                                ? journal.country.country
                                : 'country unspecified'}
                            </p>
                            <p className='mb-2 text-sm'>
                              {journal.summary
                                ? journal.summary.length > 500
                                  ? `${journal.summary.substring(0, 500)}...`
                                  : journal.summary
                                : 'No summary specified'}
                            </p>
                            {journal.summary &&
                              journal.summary.length > 500 && (
                                <Link to={`/journals/${journal.id}`}>
                                  <button
                                    type='button'
                                    className='mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
                                  >
                                    Read the Journal
                                  </button>
                                </Link>
                              )}
                          </CardContent>
                        </Card>
                      ))}
                    </ScrollArea>
                  </div>
                </div>
                <div className='mt-8 text-center'>
                  {/* <Button className='bg-primary p-6 text-white hover:bg-blue-700'>
                    Show More Results
                  </Button> */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Home',
    href: '/',
    isActive: true,
  },
]

