'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Form from 'next/form'
import { setActivePartner } from './actions';
type Option = {
  id: number
  name: string
} 

const ReportDropdown = ({currentValue, options }: { currentValue?: Option, options: Option[] }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  return(
      <Form action={setActivePartner}>
        <Input name='partnerId' placeholder={'Enter Partner Id'}></Input>
        <Button type='submit'>Submit</Button>
      </Form>
  )
}

export default ReportDropdown