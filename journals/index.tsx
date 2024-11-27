import React, { useState, useEffect } from 'react'
import { Layout } from '@/components/custom/layout'
import { Article } from '@/types/article'
import { ArticleCard } from '@/components/ArticleCard'
import { SearchBar } from '@/components/SearchBar'
import { ArticlePagination } from '@/components/ArticlePagination'

export default function Journals() {
  const [searchTerm, setSearchTerm] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const pageSize = 10

  const fetchArticles = async (page = 1) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://aphrc.site/journal_api/api/article/?query=${searchTerm}&page=${page}&page_size=${pageSize}`
      )
      const data = await response.json()
      const articlesWithAbstracts = data.results.map((article: Article) => ({
        ...article,
        abstract: article.abstract || 'This is a sample abstract for the research paper. It provides a brief overview of the study\'s objectives, methodology, and key findings. The research contributes to the existing literature by exploring novel approaches and presenting empirical evidence.'
      }))
      setArticles(articlesWithAbstracts)
      setTotalPages(Math.ceil(data.count / pageSize))
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchArticles(currentPage)
  }, [searchTerm, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchArticles(page)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleRefresh = () => {
    setSearchTerm('')
    setCurrentPage(1)
    fetchArticles(1)
  }

  return (
    <Layout>
      <Layout.Body>
        <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-primary/10 to-primary/5 -z-10">
          <div className="mb-6 flex items-center gap-4 bg-white">
            <SearchBar
              searchTerm={searchTerm}
              onSearch={handleSearch}
              onRefresh={handleRefresh}
            />
          </div>

          <div className="divide-y divide-gray-700 dark:divide-gray-1000 ">
            {isLoading ? (
              <div className="flex items-center justify-center py-12 ">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent "></div>
              </div>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="py-12 text-center text-gray-650 dark:text-gray-800">
                No articles found. Try adjusting your search terms.
              </div>
            )}
          </div>

          {!isLoading && articles.length > 0 && (
            <div className="mt-8 ">
              <ArticlePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}