import { Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PartnerDiffAnalysis } from '../actions';

interface ModifiedPartnersViewProps {
  modifiedPartners: PartnerDiffAnalysis['modified'];
}

export function ModifiedPartnersView({
  modifiedPartners,
}: ModifiedPartnersViewProps) {
  if (modifiedPartners.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">No partners to modify</p>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {modifiedPartners.map((item, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Edit className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{item.partner.partnerName}</span>
            <Badge variant="outline" className="font-mono text-xs">
              {item.partner.partnerNo}
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {item.diff.changes.map((change, changeIndex) => (
              <div
                key={changeIndex}
                className="flex items-center gap-4 text-sm"
              >
                <span className="font-medium w-20 capitalize">
                  {change.field}:
                </span>
                <span className="text-red-600 line-through">
                  {change.oldValue || '(empty)'}
                </span>
                <span>→</span>
                <span className="text-green-600 font-medium">
                  {change.newValue || '(empty)'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
