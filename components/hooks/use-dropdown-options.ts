'use client';

import { useMemo } from 'react';
import {
  SelectBrand,
  SelectServiceLevelType,
  SelectWarrantyType,
} from '@/lib/schema';
import useSWR from 'swr';

type DropdownOptions = {
  brands: SelectBrand[];
  serviceLevelTypes: SelectServiceLevelType[];
  warrantyTypes: SelectWarrantyType[];
};

type UseDropdownOptionsReturn = {
  data: DropdownOptions | null;
  isLoading: boolean;
  error: string | null;
  mutate: () => void;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return res.json();
};

export const useDropdownOptions = (): UseDropdownOptionsReturn => {
  const {
    data: brandsData,
    error: brandsError,
    isLoading: brandsLoading,
    mutate: mutateBrands,
  } = useSWR('/api/brands', fetcher);
  const {
    data: serviceLevelTypesData,
    error: serviceLevelTypesError,
    isLoading: serviceLevelTypesLoading,
    mutate: mutateServiceLevelTypes,
  } = useSWR('/api/serviceLevelTypes', fetcher);
  const {
    data: warrantyTypesData,
    error: warrantyTypesError,
    isLoading: warrantyTypesLoading,
    mutate: mutateWarrantyTypes,
  } = useSWR('/api/warrantyTypes', fetcher);

  const isLoading =
    brandsLoading || serviceLevelTypesLoading || warrantyTypesLoading;
  const error = brandsError || serviceLevelTypesError || warrantyTypesError;

  const data = useMemo(() => {
    if (!brandsData || !serviceLevelTypesData || !warrantyTypesData) {
      return null;
    }

    return {
      brands: brandsData.brands || [],
      serviceLevelTypes: serviceLevelTypesData.serviceLevelTypes || [],
      warrantyTypes: warrantyTypesData.warrantyTypes || [],
    };
  }, [brandsData, serviceLevelTypesData, warrantyTypesData]);

  const mutate = () => {
    mutateBrands();
    mutateServiceLevelTypes();
    mutateWarrantyTypes();
  };

  return {
    data,
    isLoading,
    error: error?.message || null,
    mutate,
  };
};
