'use client';

import { TableRow } from '@/components/ui/table';
import { SelectReportItem } from '@/lib/schema';
import EditMenu from '@/components/ui/edit-menu';
import React from 'react';
import EditableTableCell from '@/components/ui/editable-table-cell';
import { deleteReportItemAction, updateReportItemAction } from './actions';
import ReportItemDropdown from './report-item-dropdown';
import { ReportItemDatePicker } from './report-item-date-picker';
import { useEditableRow } from '@/components/hooks/use-editable-row';
import useSWR from 'swr';

const API_BASE_URL = '/api';

const RequiredProps = [
  'repairNo',
  'article',
  'serialNo',
  'brandId',
  'warrantyTypeId',
  'serviceLevelTypeId',
] as const;

const areRequiredPropsPresent = (
  item: Partial<SelectReportItem> | undefined
): item is SelectReportItem =>
  !!item &&
  RequiredProps.every(
    (prop) =>
      Object.hasOwn(item, prop) && item[prop] != null && item[prop] !== 0
  );

const ReportItem = ({
  reportItem,
  onCancel,
}: {
  reportItem?: SelectReportItem;
  onCancel?: () => void;
}) => {
  const useOptions = (key: string) =>
    useSWR(`${API_BASE_URL}/${key}`, (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data[key])
    );

  const { data: brands } = useOptions('brands');
  const { data: serviceLevelTypes } = useOptions('serviceLevelTypes');
  const { data: warrantyTypes } = useOptions('warrantyTypes');

  const saveEditedReportItem = (
    editedReportItem: Partial<SelectReportItem> | undefined
  ): void => {
    if (areRequiredPropsPresent(editedReportItem)) {
      updateReportItemAction(editedReportItem);
      onCancel?.();
    }
  };

  const {
    isEditing,
    editedData: editedReportItem,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    onInputChange,
    onDropdownChange,
    onDateChange,
  } = useEditableRow<SelectReportItem>(reportItem, saveEditedReportItem);

  // Custom handler for date changes that converts string to Date
  const handleDateChange =
    (field: keyof SelectReportItem) => (dateString: string) => {
      const date = dateString ? new Date(dateString) : undefined;
      onDateChange(field)(date);
    };

  return (
    <TableRow>
      <ReportItemDatePicker
        isEditing={isEditing}
        value={editedReportItem?.dateIn}
        onChange={handleDateChange('dateIn')}
      />
      <ReportItemDropdown
        isEditing={isEditing}
        options={brands}
        currentValue={editedReportItem?.brandId}
        onChange={(selectedId) => {
          onDropdownChange('brandId')(selectedId);
        }}
      />
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
        options={warrantyTypes}
        currentValue={editedReportItem?.warrantyTypeId}
        onChange={(selectedId) => {
          onDropdownChange('warrantyTypeId')(selectedId);
        }}
      />
      <ReportItemDropdown
        isEditing={isEditing}
        options={serviceLevelTypes}
        currentValue={editedReportItem?.serviceLevelTypeId}
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
            deleteReportItemAction(editedReportItem.id);
          }
        }}
        handleSaveClick={handleSaveClick}
      />
    </TableRow>
  );
};
export default ReportItem;
