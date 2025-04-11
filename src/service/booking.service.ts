// booking.module.ts
import { admin } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const db = admin.firestore();

// 🔄 Temporary in-memory DB for test mode
const testDB: any[] = [];

const isTest = process.env.NODE_ENV === 'test';

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

  if (isTest) {
    testDB.push(payload);
    return payload;
  }

  await db.collection('bookings').doc(id).set(payload);
  return payload;
};

export const getBooking = async (id: string) => {
  if (isTest) {
    const found = testDB.find(b => b.id === id);
    if (!found) throw new Error('Booking not found');
    return found;
  }

  const doc = await db.collection('bookings').doc(id).get();
  if (!doc.exists) throw new Error('Booking not found');
  return doc.data();
};

export const updateBooking = async (id: string, updates: any) => {
  if (isTest) {
    const booking = testDB.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    Object.assign(booking, updates);
    return booking;
  }

  await db.collection('bookings').doc(id).update(updates);
  const updatedDoc = await db.collection('bookings').doc(id).get();
  return updatedDoc.data();
};

export const deleteBooking = async (id: string) => {
  if (isTest) {
    const index = testDB.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Booking not found');
    testDB.splice(index, 1);
    return { message: `Booking ${id} deleted` };
  }

  await db.collection('bookings').doc(id).delete();
  return { message: `Booking ${id} deleted` };
};
