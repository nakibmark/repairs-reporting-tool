import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import CsvUpload from '@/components/ui/csv-upload';
import { DiffTabs } from './diff-tabs';
import { ImportResultsAlert } from './import-results-alert';
import { usePartnerBatchImport } from './use-partner-batch-import';

export function BatchImportDialogContent() {
  const {
    csvData,
    importData,
    diffAnalysis,
    isAnalyzing,
    isProcessing,
    importResults,
    error,
    handleFileParsed,
    handleError,
    handleAnalyzeDifferences,
    handleApplyChanges,
    resetForm,
    getTotalChanges,
  } = usePartnerBatchImport();

  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {importResults && <ImportResultsAlert results={importResults} />}

      {!csvData ? (
        <CsvUpload
          onFileParsed={handleFileParsed}
          onError={handleError}
          title="Upload Partner CSV"
          description="Upload a CSV file containing partner data for batch import"
        />
      ) : !diffAnalysis ? (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-blue-50">
            <p className="text-sm font-medium">
              📄 CSV file processed successfully with {importData?.length}{' '}
              partners
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Click &quot;Analyze Differences&quot; to compare with your current
              database
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleAnalyzeDifferences}
              disabled={isAnalyzing}
              size="lg"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Differences'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
            <div>
              <p className="font-medium">Difference Analysis Complete</p>
              <p className="text-sm text-gray-600">
                {getTotalChanges()} total changes detected
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={resetForm}
                disabled={isProcessing}
              >
                Start Over
              </Button>
              <Button
                onClick={handleApplyChanges}
                disabled={isProcessing || getTotalChanges() === 0}
                size="lg"
              >
                {isProcessing
                  ? 'Applying Changes...'
                  : `Apply ${getTotalChanges()} Changes`}
              </Button>
            </div>
          </div>

          <DiffTabs diffAnalysis={diffAnalysis} />
        </div>
      )}
    </>
  );
}
