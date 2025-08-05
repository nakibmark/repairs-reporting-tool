'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Upload, FileText } from 'lucide-react';
import { parse } from 'papaparse';

interface CsvRow {
  [key: string]: string;
}

interface CsvUploadProps {
  onFileParsed: (data: CsvRow[]) => void;
  onError: (error: string) => void;
  acceptedColumns?: string[];
  title?: string;
  description?: string;
}

const CsvUpload: React.FC<CsvUploadProps> = ({
  onFileParsed,
  onError,
  acceptedColumns = [
    'partnerNo',
    'partnerName',
    'emailAddress',
    'phoneNumber',
    'city',
    'state',
    'country',
    'market',
    'region',
    'inclusionGroup',
    'partnerType',
  ],
  title = 'Upload CSV File',
  description = 'Upload a CSV file containing partner data',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        onError('Please upload a CSV file');
        return;
      }

      setIsProcessing(true);
      setFileName(file.name);

      try {
        const text = await file.text();

        parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              onError(`CSV parsing error: ${results.errors[0].message}`);
              return;
            }

            const data = results.data as CsvRow[];

            // Validate required columns
            const headers = Object.keys(data[0] || {});
            const missingColumns = acceptedColumns.filter(
              (col) => !headers.includes(col)
            );

            if (missingColumns.length > 0) {
              onError(`Missing required columns: ${missingColumns.join(', ')}`);
              return;
            }

            onFileParsed(data);
          },
          error: (error: Error) => {
            onError(`Failed to parse CSV: ${error.message}`);
          },
        });
      } catch (error) {
        onError(
          `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [acceptedColumns, onError, onFileParsed]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              <p className="text-sm text-gray-600">Processing {fileName}...</p>
            </div>
          ) : fileName ? (
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-8 w-8 text-green-500" />
              <p className="text-sm font-medium text-gray-900">{fileName}</p>
              <p className="text-xs text-gray-500">
                File processed successfully
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag and drop your CSV file here, or click to browse
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                Browse Files
              </Button>
            </div>
          )}
        </div>

        <input
          id="file-input"
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="mt-4 text-xs text-gray-500">
          <p className="font-medium mb-1">Required columns:</p>
          <div className="flex flex-wrap gap-1">
            {acceptedColumns.map((col) => (
              <span key={col} className="px-2 py-1 bg-gray-100 rounded text-xs">
                {col}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CsvUpload;
