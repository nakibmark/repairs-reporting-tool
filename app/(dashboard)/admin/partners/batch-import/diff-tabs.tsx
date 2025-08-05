import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PartnerDiffAnalysis } from '../actions';
import { DiffSummaryCards } from './diff-summary-cards';
import { PartnerTable } from './partner-table';
import { ModifiedPartnersView } from './modified-partners-view';

interface DiffTabsProps {
  diffAnalysis: PartnerDiffAnalysis;
}

export function DiffTabs({ diffAnalysis }: DiffTabsProps) {
  return (
    <Tabs defaultValue="summary">
      <TabsList>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="created" className="relative">
          Created
          {diffAnalysis.created.length > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
              {diffAnalysis.created.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="modified" className="relative">
          Modified
          {diffAnalysis.modified.length > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
              {diffAnalysis.modified.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="deleted" className="relative">
          Deleted
          {diffAnalysis.deleted.length > 0 && (
            <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
              {diffAnalysis.deleted.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="unchanged" className="relative">
          Unchanged
          {diffAnalysis.unchanged.length > 0 && (
            <Badge variant="outline" className="ml-1 h-5 w-5 p-0 text-xs">
              {diffAnalysis.unchanged.length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="summary" className="space-y-4">
        <DiffSummaryCards diffAnalysis={diffAnalysis} />
      </TabsContent>
      <TabsContent value="created">
        <PartnerTable
          partners={diffAnalysis.created}
          headerClass="bg-green-50"
          emptyMessage="No new partners to create"
        />
      </TabsContent>
      <TabsContent value="modified">
        <ModifiedPartnersView modifiedPartners={diffAnalysis.modified} />
      </TabsContent>
      <TabsContent value="deleted">
        <PartnerTable
          partners={diffAnalysis.deleted}
          headerClass="bg-red-50"
          rowClass="bg-red-50"
          emptyMessage="No partners to delete"
        />
      </TabsContent>
      <TabsContent value="unchanged">
        <PartnerTable
          partners={diffAnalysis.unchanged}
          headerClass="bg-gray-50"
          emptyMessage="No unchanged partners"
        />
      </TabsContent>
    </Tabs>
  );
}
