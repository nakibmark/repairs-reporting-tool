'use client'
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateReportByReport } from './actions';
import { getActivePartner } from './actions';
 async function handleCreateClick(partnerId: number) {
  const report = {
      partnerId: Number(await getActivePartner()), 
      reportYear: new Date().getFullYear(), 
      reportMonth: new Date().getMonth(), 
      submissionPeriodClosesAt: new Date(new Date().setMonth(new Date().getMonth() + 1, 0))
    }
    CreateReportByReport(report);
  }

  const ReportCreateButton = () => {
    return (
      <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" onClick={() => handleCreateClick(8)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Report
            </span>
          </Button>
        </div>
    )
  }
  export default ReportCreateButton