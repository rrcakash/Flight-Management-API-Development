import { admin } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const db = admin.firestore();
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

export const updateBooking = async (id: string, updates: any, user: { uid: string, role: string }) => {
  if (isTest) {
    const booking = testDB.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');

    if (user.role !== 'admin' && user.role !== 'staff' && booking.userId !== user.uid) {
      throw new Error('Forbidden: Cannot update other user\'s booking');
    }

    Object.assign(booking, updates);
    return booking;
  }

  const docRef = db.collection('bookings').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) throw new Error('Booking not found');
  const booking = doc.data();

  if (user.role !== 'admin' && user.role !== 'staff' && booking?.userId !== user.uid) {
    throw new Error('Forbidden: Cannot update other user\'s booking');
  }

  await docRef.update(updates);
  const updatedDoc = await docRef.get();
  return updatedDoc.data();
};

export const deleteBooking = async (id: string, user: { uid: string, role: string }) => {
  if (isTest) {
    const index = testDB.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Booking not found');
    const booking = testDB[index];

    if (user.role !== 'admin' && user.role !== 'staff' && booking.userId !== user.uid) {
      throw new Error('Forbidden: Cannot delete other user\'s booking');
    }

    testDB.splice(index, 1);
    return { message: `Booking ${id} deleted` };
  }

  const docRef = db.collection('bookings').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) throw new Error('Booking not found');
  const booking = doc.data();

  if (user.role !== 'admin' && user.role !== 'staff' && booking?.userId !== user.uid) {
    throw new Error('Forbidden: Cannot delete other user\'s booking');
  }

  await docRef.delete();
  return { message: `Booking ${id} deleted` };
};
