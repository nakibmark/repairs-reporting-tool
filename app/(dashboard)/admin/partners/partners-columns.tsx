'use client';

import { SelectPartner } from '@/lib/schema';
import { createColumnHelper } from '@tanstack/react-table';
import PartnerFilterHeader from './partner-filter-header';

const columnHelper = createColumnHelper<SelectPartner>();

export const defaultPartnerColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('partnerName', {
    header: 'Name',
  }),
  columnHelper.accessor('partnerNo', {
    header: 'Number',
  }),
  columnHelper.accessor('emailAddress', {
    header: 'Email Address',
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone Number',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('city', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <PartnerFilterHeader column={column} name="City" />
      ) : (
        'City'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: 'equals',
    meta: {
      filterVariant: 'select',
    },
  }),
  columnHelper.accessor('state', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <PartnerFilterHeader column={column} name="State" />
      ) : (
        'State'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: 'equals',
    meta: {
      filterVariant: 'select',
    },
  }),
  columnHelper.accessor('country', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <PartnerFilterHeader column={column} name="Country" />
      ) : (
        'Country'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: 'equals',
    meta: {
      filterVariant: 'select',
    },
  }),
  columnHelper.accessor('market', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <PartnerFilterHeader column={column} name="Market" />
      ) : (
        'Market'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: 'equals',
    meta: {
      filterVariant: 'select',
    },
  }),
  columnHelper.accessor('region', {
    header: ({ column }) =>
      column.getCanFilter() ? (
        <PartnerFilterHeader column={column} name="Region" />
      ) : (
        'Region'
      ),
    cell: (info) => info.getValue() || '-',
    filterFn: 'equals',
    meta: {
      filterVariant: 'select',
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
  }),
];
