import { TableRow } from '@/components/ui/table';
import { SelectPartner } from '@/lib/schema';
import PartnerEditMenu from './partner-edit-menu';
import React from 'react';
import PartnerCell from './partner-cell';
import { deletePartner, savePartner } from './actions';

const RequiredProps = ['partnerName', 'emailAddress', 'partnerNo'] as const;

export function Partner({ partner }: { partner?: SelectPartner }) {
  const [isEditing, setIsEditing] = React.useState(!partner);
  const [editedPartner, setEditedPartner] = React.useState<
    Partial<SelectPartner> | undefined
  >({ ...partner });

  const editedPartnerIsSaveable = (
    saveTarget: typeof editedPartner
  ): saveTarget is SelectPartner => {
    return (
      saveTarget !== undefined &&
      RequiredProps.every(
        (prop) => Object.hasOwn(saveTarget, prop) && saveTarget[prop] != null
      )
    );
  };

  const handleSaveClick = () => {
    if (editedPartnerIsSaveable(editedPartner)) {
      editedPartner.phoneNumber = editedPartner.phoneNumber ?? null;
      editedPartner.city = editedPartner.city ?? null;
      editedPartner.state = editedPartner.state ?? null;
      editedPartner.country = editedPartner.country ?? null;
      editedPartner.market = editedPartner.market ?? null;
      editedPartner.region = editedPartner.region ?? null;
      savePartner(editedPartner);
    }
    setIsEditing(false);
  };

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
        onChange={onInputChange('partnerNo')}
        isEditing={isEditing}
        value={editedPartner?.partnerNo}
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
        handleSaveClick={() => {
          handleSaveClick();
        }}
      ></PartnerEditMenu>
    </TableRow>
  );
}
export default Partner;
