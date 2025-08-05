import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { InsertPartner, SelectPartner } from '@/lib/schema';

interface PartnerTableProps {
  partners: (InsertPartner | SelectPartner)[];
  headerClass?: string;
  rowClass?: string;
  emptyMessage: string;
}

export function PartnerTable({
  partners,
  headerClass = 'bg-gray-50',
  rowClass = '',
  emptyMessage,
}: PartnerTableProps) {
  if (partners.length === 0) {
    return <p className="text-center text-gray-500 py-8">{emptyMessage}</p>;
  }

  return (
    <div className="border rounded-md max-h-96 overflow-y-auto">
      <Table>
        <TableHeader className={`${headerClass} sticky top-0`}>
          <TableRow>
            <TableHead>Partner No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner, index) => (
            <TableRow key={index} className={rowClass}>
              <TableCell className="font-mono">{partner.partnerNo}</TableCell>
              <TableCell>{partner.partnerName}</TableCell>
              <TableCell>{partner.emailAddress}</TableCell>
              <TableCell>{partner.phoneNumber || '-'}</TableCell>
              <TableCell>{partner.city || '-'}</TableCell>
              <TableCell>{partner.state || '-'}</TableCell>
              <TableCell>{partner.country || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
