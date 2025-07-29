import { TableRow } from '@/components/ui/table';
import { SelectPartner } from '@/lib/schema';
import EditMenu from '../../../../components/ui/edit-menu';
import React from 'react';
import EditableTableCell from '../../../../components/ui/editable-table-cell';
import { setPartnerInactive, savePartner } from './actions';
import { useEditableRow } from '../../hooks/use-editable-row';

const RequiredProps = ['partnerName', 'emailAddress', 'partnerNo'] as const;

export function Partner({
  partner,
  displayInactive,
}: {
  partner?: SelectPartner;
  displayInactive: boolean;
}) {
  const {
    isEditing,
    editedData: editedPartner,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    onInputChange,
  } = useEditableRow<SelectPartner>(partner, (editedPartner) => {
    if (
      editedPartner &&
      RequiredProps.every(
        (prop) =>
          Object.hasOwn(editedPartner, prop) && editedPartner[prop] != null
      )
    ) {
      editedPartner.phoneNumber = editedPartner.phoneNumber ?? null;
      editedPartner.city = editedPartner.city ?? null;
      editedPartner.state = editedPartner.state ?? null;
      editedPartner.country = editedPartner.country ?? null;
      editedPartner.market = editedPartner.market ?? null;
      editedPartner.region = editedPartner.region ?? null;
      savePartner(editedPartner as SelectPartner);
    }
  });

  return (
    <TableRow
      className={!editedPartner?.isActive ? 'bg-zinc-300' : ''}
      hidden={!displayInactive && !editedPartner?.isActive}
    >
      <EditableTableCell
        onChange={onInputChange('id')}
        isEditing={isEditing}
        value={editedPartner?.id}
      />
      <EditableTableCell
        onChange={onInputChange('partnerName')}
        isEditing={isEditing}
        value={editedPartner?.partnerName}
      />
      <EditableTableCell
        onChange={onInputChange('partnerNo')}
        isEditing={isEditing}
        value={editedPartner?.partnerNo}
      />
      <EditableTableCell
        onChange={onInputChange('emailAddress')}
        isEditing={isEditing}
        value={editedPartner?.emailAddress}
      />
      <EditableTableCell
        onChange={onInputChange('phoneNumber')}
        isEditing={isEditing}
        value={editedPartner?.phoneNumber}
      />
      <EditableTableCell
        onChange={onInputChange('city')}
        isEditing={isEditing}
        value={editedPartner?.city}
      />
      <EditableTableCell
        onChange={onInputChange('state')}
        isEditing={isEditing}
        value={editedPartner?.state}
      />
      <EditableTableCell
        onChange={onInputChange('country')}
        isEditing={isEditing}
        value={editedPartner?.country}
      />
      <EditableTableCell
        onChange={onInputChange('market')}
        isEditing={isEditing}
        value={editedPartner?.market}
      />
      <EditableTableCell
        onChange={onInputChange('region')}
        isEditing={isEditing}
        value={editedPartner?.region}
      />
      <EditMenu
        isEditing={isEditing}
        handleEditClick={handleEditClick}
        handleCancelClick={handleCancelClick}
        handleDeleteClick={() => {
          setPartnerInactive(editedPartner?.id);
        }}
        handleSaveClick={handleSaveClick}
      />
    </TableRow>
  );
}
export default Partner;
