import type { UseFormReturn } from 'react-hook-form';

import { FormProvider as RHFForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export type FormProps = {
  onSubmit?: () => void;
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  style?: any;
  id?: string;
};

export default function Form({ children, onSubmit, methods, style, id }: FormProps) {
  return (
    <RHFForm {...methods}>
      <form style={{ ...style }} onSubmit={onSubmit} noValidate autoComplete="off" id={id}>
        {children}
      </form>
    </RHFForm>
  );
}
