'use client';

import { TableRow } from '@/components/ui/table';
import { SelectReportItem } from '@/lib/schema';
import EditMenu from '../../../../components/ui/edit-menu';
import React from 'react';
import EditableTableCell from '../../../../components/ui/editable-table-cell';
import { deleteReportItem, saveReportItem } from './actions';
import ReportItemDropdown, { DropdownOption } from './report-item-dropdown';
import { ReportItemDatePicker } from './report-item-date-picker';
import { useEditableRow } from '../../hooks/use-editable-row';

const RequiredProps = [
  'repairNo',
  'article',
  'serialNo',
  'brandId',
  'warrantyTypeId',
  'serviceLevelTypeId',
] as const;

export function ReportItem({
  reportItem,
  reportId,
  dropdownOptions,
  onCancel,
}: {
  reportItem?: SelectReportItem;
  reportId: number;
  dropdownOptions: {
    brandOptions: DropdownOption[];
    warrantyTypeOptions: DropdownOption[];
    serviceLevelTypeOptions: DropdownOption[];
  };
  onCancel?: () => void;
}) {
  const {
    isEditing,
    editedData: editedReportItem,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    onInputChange,
    onDropdownChange,
    onDateChange,
  } = useEditableRow<SelectReportItem>(
    reportItem
      ? { ...reportItem, reportId }
      : {
          reportId,
          repairNo: '',
          article: '',
          serialNo: '',
          dateIn: '',
          dateOut: null,
          comments: null,
          brandId: 0,
          warrantyTypeId: 0,
          serviceLevelTypeId: 0,
          id: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    (editedReportItem) => {
      if (
        editedReportItem &&
        RequiredProps.every((prop) => {
          return (
            Object.hasOwn(editedReportItem, prop) &&
            editedReportItem[prop] != null &&
            editedReportItem[prop] !== 0
          );
        })
      ) {
        editedReportItem.comments = editedReportItem.comments ?? null;
        editedReportItem.dateOut = editedReportItem.dateOut ?? null;

        // Convert SelectReportItem to ReportItemWithNames format for the save action
        const brandOption = dropdownOptions.brandOptions.find(
          (b) => b.id === editedReportItem.brandId
        );
        const warrantyOption = dropdownOptions.warrantyTypeOptions.find(
          (w) => w.id === editedReportItem.warrantyTypeId
        );
        const serviceOption = dropdownOptions.serviceLevelTypeOptions.find(
          (s) => s.id === editedReportItem.serviceLevelTypeId
        );

        if (brandOption && warrantyOption && serviceOption) {
          const reportItemWithNames = {
            ...editedReportItem,
            brand: brandOption,
            warrantyType: warrantyOption,
            serviceLevelType: serviceOption,
          };
          saveReportItem(reportItemWithNames);
          onCancel?.();
        }
      }
    }
  );

  // Custom handler for date changes that converts string to Date
  const handleDateChange =
    (field: keyof SelectReportItem) => (dateString: string) => {
      const date = dateString ? new Date(dateString) : undefined;
      onDateChange(field)(date);
    };

  return (
    <TableRow>
      <EditableTableCell
        onChange={onInputChange('repairNo')}
        isEditing={isEditing}
        value={editedReportItem?.repairNo}
      />
      <EditableTableCell
        onChange={onInputChange('article')}
        isEditing={isEditing}
        value={editedReportItem?.article}
      />
      <EditableTableCell
        onChange={onInputChange('serialNo')}
        isEditing={isEditing}
        value={editedReportItem?.serialNo}
      />
      <ReportItemDropdown
        isEditing={isEditing}
        options={dropdownOptions.brandOptions}
        currentValue={
          dropdownOptions.brandOptions.find(
            (b) => b.id === editedReportItem?.brandId
          )?.name
        }
        onChange={(selectedId) => {
          onDropdownChange('brandId')(selectedId);
        }}
      />
      <ReportItemDropdown
        isEditing={isEditing}
        options={dropdownOptions.warrantyTypeOptions}
        currentValue={
          dropdownOptions.warrantyTypeOptions.find(
            (w) => w.id === editedReportItem?.warrantyTypeId
          )?.name
        }
        onChange={(selectedId) => {
          onDropdownChange('warrantyTypeId')(selectedId);
        }}
      />
      <ReportItemDropdown
        isEditing={isEditing}
        options={dropdownOptions.serviceLevelTypeOptions}
        currentValue={
          dropdownOptions.serviceLevelTypeOptions.find(
            (s) => s.id === editedReportItem?.serviceLevelTypeId
          )?.name
        }
        onChange={(selectedId) => {
          onDropdownChange('serviceLevelTypeId')(selectedId);
        }}
      />
      <ReportItemDatePicker
        isEditing={isEditing}
        value={editedReportItem?.dateOut}
        onChange={handleDateChange('dateOut')}
      />
      <EditableTableCell
        onChange={onInputChange('comments')}
        isEditing={isEditing}
        value={editedReportItem?.comments}
      />
      <EditMenu
        isEditing={isEditing}
        handleEditClick={handleEditClick}
        handleCancelClick={() => {
          handleCancelClick();
          onCancel?.();
        }}
        handleDeleteClick={() => {
          if (editedReportItem?.id) {
            deleteReportItem(editedReportItem.id);
          }
        }}
        handleSaveClick={handleSaveClick}
      />
    </TableRow>
  );
}
export default ReportItem;
