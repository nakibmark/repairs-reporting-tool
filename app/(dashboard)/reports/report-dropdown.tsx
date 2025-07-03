'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Form from 'next/form';
import { setActivePartner } from './actions';

const ReportDropdown = () => (
  <Form action={setActivePartner}>
    <Input name="partnerId" placeholder={'Enter Partner Id'}></Input>
    <Button type="submit">Submit</Button>
  </Form>
);

export default ReportDropdown;
