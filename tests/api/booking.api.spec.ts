import { faker } from '@faker-js/faker';
import { test, expect } from '@fixtures/base.fixture';
import { BookingDetails } from '@api/schemas/booking.schema';

test.describe('Booking API - CRUD & Contract Validation @api', () => {
  test('should create, retrieve, validate schema, and delete a booking', async ({ bookingClient }) => {
    // 1. Arrange: Generate dynamic test data
    const newBookingPayload: BookingDetails = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 100, max: 1000 }),
      depositpaid: true,
      bookingdates: {
        checkin: '2026-12-01',
        checkout: '2026-12-05',
      },
      additionalneeds: 'Breakfast',
    };

    // 2. Act: Create booking (automatically validates response schema via Zod)
    const created = await bookingClient.createBooking(newBookingPayload);
    expect(created.bookingid).toBeGreaterThan(0);
    expect(created.booking.firstname).toBe(newBookingPayload.firstname);

    // 3. Assert: Fetch created booking by ID and verify persistence
    const fetched = await bookingClient.getBookingById(created.bookingid);
    expect(fetched).toEqual(newBookingPayload);

    // 4. Cleanup: Authenticate and delete test record
    const authToken = await bookingClient.createToken();
    await bookingClient.deleteBooking(created.bookingid, authToken);
  });
});