import { admin } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const db = admin.firestore();

export const createBooking = async (data: any, userId: string) => {
  const id = uuidv4();
  const payload = {
    id,
    userId,
    flightId: data.flightId,
    seatNumber: data.seatNumber,
    status: 'confirmed',
    location: data.location || null,
    createdAt: new Date().toISOString(),
  };
  await db.collection('bookings').doc(id).set(payload);
  return payload;
};

export const getBooking = async (id: string) => {
  const doc = await db.collection('bookings').doc(id).get();
  if (!doc.exists) throw new Error('Booking not found');
  return doc.data();
};

export const updateBooking = async (id: string, updates: any) => {
  await db.collection('bookings').doc(id).update(updates);
  const updatedDoc = await db.collection('bookings').doc(id).get();
  return updatedDoc.data();
};

export const deleteBooking = async (id: string) => {
  await db.collection('bookings').doc(id).delete();
  return { message: `Booking ${id} deleted` };
};
