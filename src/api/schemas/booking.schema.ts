import { z } from 'zod';

export const BookingDetailsSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: z.object({
    checkin: z.string(),
    checkout: z.string(),
  }),
  additionalneeds: z.string().optional(),
});

export const CreateBookingResponseSchema = z.object({
  bookingid: z.number(),
  booking: BookingDetailsSchema,
});

export type BookingDetails = z.infer<typeof BookingDetailsSchema>;
export type CreateBookingResponse = z.infer<typeof CreateBookingResponseSchema>;