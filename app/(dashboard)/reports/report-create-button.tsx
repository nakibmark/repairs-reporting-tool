'use client'
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateReport } from './actions';
import { getActivePartner } from './actions';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/icons';


export const ReportCreateButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleCreateClick() {
    const report = {
      partnerId: Number(await getActivePartner()),
      reportYear: new Date().getFullYear(),
      reportMonth: new Date().getMonth(),
      submissionPeriodClosesAt: new Date(new Date().setMonth(new Date().getMonth() + 1, 0))
    }
    const createdId = await CreateReport(report);
    startTransition(() => {
      router.replace(`/reports/${createdId}`);
    });

  }

  return (
    <div className="ml-auto flex items-center gap-2">
      <Button size="sm" className="h-8 gap-1" onClick={() => handleCreateClick()}>
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add Report
        </span>
      </Button>
      {isPending && <Spinner />}
    </div>
  )
}
export default ReportCreateButton