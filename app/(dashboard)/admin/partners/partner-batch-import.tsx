'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { BatchImportDialogContent } from './batch-import';

const PartnerBatchImport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Upload className="mr-2 h-4 w-4" />
          Import Partners
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Batch Import Partners</DialogTitle>
          <DialogDescription>
            Upload a CSV file with partner data. The system will analyze
            differences and show you exactly what will change before applying
            any updates.
          </DialogDescription>
        </DialogHeader>

        <BatchImportDialogContent />
      </DialogContent>
    </Dialog>
  );
};

export default PartnerBatchImport;
