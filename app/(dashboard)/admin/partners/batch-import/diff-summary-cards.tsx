import { Plus, Edit, Minus, Equal } from 'lucide-react';
import { PartnerDiffAnalysis } from '../actions';

interface DiffSummaryCardsProps {
  diffAnalysis: PartnerDiffAnalysis;
}

export function DiffSummaryCards({ diffAnalysis }: DiffSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Plus className="h-4 w-4 text-green-600" />
          <span className="font-medium">New Partners</span>
        </div>
        <p className="text-2xl font-bold text-green-600">
          {diffAnalysis.created.length}
        </p>
      </div>

      <div className="p-4 border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Edit className="h-4 w-4 text-blue-600" />
          <span className="font-medium">Modified Partners</span>
        </div>
        <p className="text-2xl font-bold text-blue-600">
          {diffAnalysis.modified.length}
        </p>
      </div>

      <div className="p-4 border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Minus className="h-4 w-4 text-red-600" />
          <span className="font-medium">Partners to Delete</span>
        </div>
        <p className="text-2xl font-bold text-red-600">
          {diffAnalysis.deleted.length}
        </p>
      </div>

      <div className="p-4 border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Equal className="h-4 w-4 text-gray-600" />
          <span className="font-medium">Unchanged Partners</span>
        </div>
        <p className="text-2xl font-bold text-gray-600">
          {diffAnalysis.unchanged.length}
        </p>
      </div>
    </div>
  );
}
