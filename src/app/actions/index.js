'use server';

import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getAppointments,
  createAppointment,
  updateAppointment,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function createPropertyAction(propertyData) {
  const property = createProperty(propertyData);
  revalidatePath('/[locale]/properties', 'page');
  revalidatePath('/[locale]/owner', 'page');
  revalidatePath('/[locale]/admin', 'page');
  return property;
}

export async function updatePropertyAction(id, data) {
  const property = updateProperty(id, data);
  revalidatePath('/[locale]/properties', 'page');
  revalidatePath('/[locale]/owner', 'page');
  revalidatePath('/[locale]/admin', 'page');
  return property;
}

export async function deletePropertyAction(id) {
  const result = deleteProperty(id);
  revalidatePath('/[locale]/properties', 'page');
  revalidatePath('/[locale]/owner', 'page');
  revalidatePath('/[locale]/admin', 'page');
  return result;
}

export async function verifyPropertyAction(id) {
  const property = updateProperty(id, { verified: true });
  revalidatePath('/[locale]/properties', 'page');
  revalidatePath('/[locale]/admin', 'page');
  return property;
}

export async function createAppointmentAction(appointmentData) {
  const appointment = createAppointment({
    ...appointmentData,
    status: 'pending',
  });
  revalidatePath('/[locale]/appointments', 'page');
  revalidatePath('/[locale]/owner', 'page');
  return appointment;
}

export async function updateAppointmentStatusAction(id, status) {
  const appointment = updateAppointment(id, { status });
  revalidatePath('/[locale]/appointments', 'page');
  revalidatePath('/[locale]/owner', 'page');
  return appointment;
}

export async function updateUserAction(id, data) {
  const user = updateUser(id, data);
  revalidatePath('/[locale]/admin', 'page');
  return user;
}

export async function deleteUserAction(id) {
  const result = deleteUser(id);
  revalidatePath('/[locale]/admin', 'page');
  return result;
}
