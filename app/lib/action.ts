'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const invoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.date(),
});

const CreateInvoice = invoiceSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // validate the form data
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    await sql`INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
  } catch (error) {
    return { message: 'Database Error: Failed to create invoice.' };
  }

  revalidatePath('/dashboard/invoices'); // Revalidate the invoices page, clear client-side router cache, trigger request to server
  redirect('/dashboard/invoices'); // Redirect to the invoices page
}

// Use Zod to update the expected types
const UpdateInvoice = invoiceSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
  WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to update invoice.' };
  }

  // clear client-side router cache, trigger request to server
  revalidatePath(`/dashboard/invoices`);
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('failed to delete invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to delete invoice.' };
  }

  // clear client-side router cache, trigger new request to server
  // re-render the invoices page
  revalidatePath(`/dashboard/invoices`);
}
