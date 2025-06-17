import { TableCell} from '@/components/ui/table';
import { ReportItemWithNames} from '@/lib/data/reportItems';
import React from 'react';
type handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ReportItemWithNames) => void;
export const ReportItemCell = ({editState, handleChange, cellName, editedItem, item}: {editState:boolean, handleChange:handleChange, cellName:string, editedItem:any, item:ReportItemWithNames}) => {
    if (editState){
    return(
        <TableCell className="hidden md:table-cell">
                  <input
                    value={editedItem.dateIn?.toLocaleDateString('en-US') || ''}
                    onChange={(e) => handleChange(e, cellName as keyof ReportItemWithNames)}
                  />
        </TableCell>
    )
  }else{
    return(
        <TableCell className="hidden md:table-cell">
                  
        </TableCell>
    )
  }
}