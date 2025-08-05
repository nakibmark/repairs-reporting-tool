import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

interface ImportResults {
  created: number;
  updated: number;
  deleted: number;
  errors: string[];
}

interface ImportResultsAlertProps {
  results: ImportResults;
}

export function ImportResultsAlert({ results }: ImportResultsAlertProps) {
  const hasErrors = results.errors.length > 0;

  return (
    <Alert variant={hasErrors ? 'destructive' : 'default'}>
      <div className="flex items-center gap-2">
        {hasErrors ? (
          <XCircle className="h-4 w-4" />
        ) : (
          <CheckCircle className="h-4 w-4" />
        )}
        <AlertTitle>Import Complete</AlertTitle>
      </div>
      <AlertDescription>
        <div className="mt-2 space-y-1">
          <p>✅ Created: {results.created} partners</p>
          <p>📝 Updated: {results.updated} partners</p>
          <p>🗑️ Deleted: {results.deleted} partners</p>
          {hasErrors && (
            <div className="mt-2">
              <p className="font-medium">Errors:</p>
              <ul className="list-disc list-inside text-sm">
                {results.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}
