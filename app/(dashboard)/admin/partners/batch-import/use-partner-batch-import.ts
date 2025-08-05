import { useState, useCallback, useEffect } from 'react';
import { InsertPartner } from '@/lib/schema';
import {
  analyzeDifferencesAction,
  applyDifferencesAction,
  type PartnerDiffAnalysis,
} from '../actions';

interface CsvRow {
  [key: string]: string;
}

interface PartnerImportData extends InsertPartner {
  id?: number;
  isActive?: boolean;
}

interface ImportResults {
  created: number;
  updated: number;
  deleted: number;
  errors: string[];
}

export function usePartnerBatchImport() {
  const [csvData, setCsvData] = useState<CsvRow[] | null>(null);
  const [importData, setImportData] = useState<PartnerImportData[] | null>(
    null
  );
  const [diffAnalysis, setDiffAnalysis] = useState<PartnerDiffAnalysis | null>(
    null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResults, setImportResults] = useState<ImportResults | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleFileParsed = useCallback((data: CsvRow[]) => {
    setCsvData(data);
    setError(null);
    setDiffAnalysis(null);
    setImportResults(null);
  }, []);

  const handleError = useCallback((error: string) => {
    setError(error);
    setCsvData(null);
    setImportData(null);
    setDiffAnalysis(null);
  }, []);

  // Convert CSV data to partner objects
  useEffect(() => {
    if (csvData) {
      const convertedData: PartnerImportData[] = csvData.map((row) => ({
        partnerNo: row.partnerNo,
        partnerName: row.partnerName,
        emailAddress: row.emailAddress,
        phoneNumber: row.phoneNumber || null,
        city: row.city || null,
        state: row.state || null,
        country: row.country || null,
        market: row.market || null,
        region: row.region || null,
        inclusionGroup: row.inclusionGroup || null,
        partnerType: row.partnerType || null,
        isActive: true,
      }));

      setImportData(convertedData);
    }
  }, [csvData]);

  const handleAnalyzeDifferences = async () => {
    if (!importData) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysis = await analyzeDifferencesAction(importData);
      setDiffAnalysis(analysis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to analyze differences'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyChanges = async () => {
    if (!diffAnalysis) return;

    setIsProcessing(true);
    setImportResults(null);
    setError(null);

    try {
      const result = await applyDifferencesAction(diffAnalysis);

      if (result.success) {
        setImportResults(result.results as ImportResults);
      } else {
        setError(result.error as string);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setCsvData(null);
    setImportData(null);
    setDiffAnalysis(null);
    setImportResults(null);
    setError(null);
  };

  const getTotalChanges = () => {
    if (!diffAnalysis) return 0;
    return (
      diffAnalysis.created.length +
      diffAnalysis.deleted.length +
      diffAnalysis.modified.length
    );
  };

  return {
    // State
    csvData,
    importData,
    diffAnalysis,
    isAnalyzing,
    isProcessing,
    importResults,
    error,

    // Actions
    handleFileParsed,
    handleError,
    handleAnalyzeDifferences,
    handleApplyChanges,
    resetForm,
    getTotalChanges,
  };
}
