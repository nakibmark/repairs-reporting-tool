import { TableRow } from '@/components/ui/table';
import { SelectPartner } from '@/lib/schema';
import PartnerEditMenu from './partner-edit-menu';
import React from 'react';
import PartnerCell from './partner-cell';
import { deletePartner } from './actions';

export function Partner({ partner }: { partner?: SelectPartner }) {
  const [isEditing, setIsEditing] = React.useState(!partner);
  const [editedPartner, setEditedPartner] = React.useState<
    Partial<SelectPartner> | undefined
  >({ ...partner });

  const onInputChange =
    (field: keyof SelectPartner) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditedPartner({ ...editedPartner, [field]: e.target.value });
    };

  return (
    <TableRow>
      <PartnerCell
        onChange={onInputChange('id')}
        isEditing={isEditing}
        value={editedPartner?.id}
      />
      <PartnerCell
        onChange={onInputChange('partnerName')}
        isEditing={isEditing}
        value={editedPartner?.partnerName}
      />
      <PartnerCell
        onChange={onInputChange('emailAddress')}
        isEditing={isEditing}
        value={partner?.emailAddress}
      />
      <PartnerCell
        onChange={onInputChange('phoneNumber')}
        isEditing={isEditing}
        value={editedPartner?.phoneNumber}
      />
      <PartnerCell
        onChange={onInputChange('city')}
        isEditing={isEditing}
        value={editedPartner?.city}
      />
      <PartnerCell
        onChange={onInputChange('state')}
        isEditing={isEditing}
        value={editedPartner?.state}
      />
      <PartnerCell
        onChange={onInputChange('country')}
        isEditing={isEditing}
        value={editedPartner?.country}
      />
      <PartnerCell
        onChange={onInputChange('market')}
        isEditing={isEditing}
        value={editedPartner?.market}
      />
      <PartnerCell
        onChange={onInputChange('region')}
        isEditing={isEditing}
        value={editedPartner?.region}
      />
      <PartnerEditMenu
        isEditing={isEditing}
        handleEditClick={() => setIsEditing(true)}
        handleCancelClick={() => {
          setEditedPartner(partner);
          setIsEditing(false);
        }}
        handleDeleteClick={() => {
          deletePartner(editedPartner?.id);
        }}
        handleSaveClick={() => {}}
      ></PartnerEditMenu>
    </TableRow>
  );
}
export default Partner;
