import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReportsTable } from './reports-table'
import { getReports } from '@/lib/data/reports'

export default async function ReportsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>
}) {
  const searchParams = await props.searchParams
  const search = searchParams.q ?? ''
  const offset = searchParams.offset ?? 0
  const { reports, newOffset, totalReports } = await getReports(
    search,
    Number(offset)
  )

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Report
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <ReportsTable
          reports={reports}
          offset={newOffset ?? 0}
          totalReports={totalReports}
          submitted={null}
        />
      </TabsContent>
      <TabsContent value="submitted">
        <ReportsTable
          reports={reports}
          offset={newOffset ?? 0}
          totalReports={totalReports}
          submitted={true}
        />
      </TabsContent>
      <TabsContent value="draft">
        <ReportsTable
          reports={reports}
          offset={newOffset ?? 0}
          totalReports={totalReports}
          submitted={false}
        />
      </TabsContent>
    </Tabs>
  )
}
