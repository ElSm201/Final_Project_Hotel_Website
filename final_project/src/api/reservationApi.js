const BASE_URL = 'http://localhost:3000/api'; 

export async function checkAvailability({ roomType, checkIn, checkOut }) {
  const res = await fetch(`${BASE_URL}/availability`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: roomType,
      check_in: checkIn,
      check_out: checkOut,
    }),
  });

  if (res.status === 404) {
    return { available: false, rooms: [] };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Failed to check availability');
  }

  const rows = await res.json(); // array of rooms
  return {
    available: rows.length > 0,
    rooms: rows,
  };
}

export async function createReservation(payload) {
  const res = await fetch(`${BASE_URL}/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || 'Failed to create reservation');
  }
  return res.json();
}