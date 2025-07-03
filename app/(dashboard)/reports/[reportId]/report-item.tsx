'use client';

import { TableRow } from '@/components/ui/table';
import { ReportItemWithNames } from '@/lib/data/reportItems';
import ReportItemCell from './report-item-cell';
import ReportItemEditMenu from './report-item-edit-menu';
import React from 'react';
import { deleteReportItem, saveReportItem } from './actions';
import ReportItemDropdown from './report-item-dropdown';
import ReportItemDatePicker from './report-item-date-picker';
import { DropdownOption } from './report-items-table';
import { useParams } from 'next/navigation';

const RequiredProps = [
  'dateIn',
  'repairNo',
  'brand',
  'reportId',
  'serviceLevelType',
  'warrantyType',
] as const;

const ReportItem = (props: {
  item?: ReportItemWithNames;
  brands: DropdownOption[];
  serviceLevelTypes: DropdownOption[];
  warrantyTypes: DropdownOption[];
}) => {
  const { item, brands, serviceLevelTypes, warrantyTypes } = props;

  const { reportId: reportIdParam } = useParams();
  const [isEditing, setIsEditing] = React.useState(!item);
  const [editedItem, setEditedItem] = React.useState<
    Partial<ReportItemWithNames> | undefined
  >({ reportId: Number(reportIdParam), ...item });

  const editedItemIsSaveable = (
    saveTarget: typeof editedItem
  ): saveTarget is ReportItemWithNames => {
    return (
      saveTarget !== undefined &&
      RequiredProps.every(
        (prop) => Object.hasOwn(saveTarget, prop) && saveTarget[prop] != null
      )
    );
  };

  const handleSaveClick = () => {
    if (editedItemIsSaveable(editedItem)) {
      editedItem.serialNo = editedItem.serialNo ?? null;
      editedItem.comments = editedItem.comments ?? null;
      editedItem.article = editedItem.article ?? null;
      saveReportItem(editedItem);
    }
    setIsEditing(false);
  };

  const findNameById = (id: number, items: DropdownOption[]) =>
    items.find((item) => item.id === id)?.name || '';

  const onInputChange =
    (field: keyof ReportItemWithNames) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditedItem({ ...editedItem, [field]: e.target.value });
    };

  const onDropdownChange =
    (field: 'brand' | 'serviceLevelType' | 'warrantyType') =>
    (selectedId: string) =>
      setEditedItem({
        ...editedItem,
        [field]: {
          id: Number(selectedId),
          name: findNameById(Number(selectedId), props[`${field}s`]),
        },
      });

  const onDateChange =
    (field: 'dateOut' | 'dateIn') => (selectedDate: string) => {
      setEditedItem({ ...editedItem, [field]: selectedDate });
    };

  return (
    <TableRow>
      <ReportItemDatePicker
        onChange={onDateChange('dateIn')}
        isEditing={isEditing}
        value={editedItem?.dateIn}
      />
      <ReportItemDropdown
        isEditing={isEditing}
        currentValue={editedItem?.brand?.name}
        options={brands}
        onChange={onDropdownChange('brand')}
      />
      <ReportItemCell
        onChange={onInputChange('repairNo')}
        isEditing={isEditing}
        value={editedItem?.repairNo}
      />
      <ReportItemCell
        onChange={onInputChange('article')}
        isEditing={isEditing}
        value={editedItem?.article}
      />
      <ReportItemCell
        onChange={onInputChange('serialNo')}
        isEditing={isEditing}
        value={editedItem?.serialNo}
      />
      <ReportItemDropdown
        isEditing={isEditing}
        currentValue={editedItem?.warrantyType?.name}
        options={warrantyTypes}
        onChange={onDropdownChange('warrantyType')}
      />
      <ReportItemDropdown
        isEditing={isEditing}
        currentValue={editedItem?.serviceLevelType?.name}
        options={serviceLevelTypes}
        onChange={onDropdownChange('serviceLevelType')}
      />
      <ReportItemDatePicker
        onChange={onDateChange('dateOut')}
        isEditing={isEditing}
        value={editedItem?.dateOut}
      />
      <ReportItemCell
        onChange={onInputChange('comments')}
        isEditing={isEditing}
        value={editedItem?.comments}
      />
      <ReportItemEditMenu
        isEditing={isEditing}
        handleEditClick={() => setIsEditing(true)}
        handleCancelClick={() => {
          setEditedItem(item);
          setIsEditing(false);
        }}
        handleDeleteClick={() => deleteReportItem(item?.id)}
        handleSaveClick={handleSaveClick}
      />
    </TableRow>
  );
};

export default ReportItem;
