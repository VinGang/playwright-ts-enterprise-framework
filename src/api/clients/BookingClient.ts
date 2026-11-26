import { APIRequestContext, expect } from '@playwright/test';
import {
  BookingDetails,
  BookingDetailsSchema,
  CreateBookingResponse,
  CreateBookingResponseSchema,
} from '../schemas/booking.schema';

export class BookingClient {
  private readonly baseUrl = 'https://restful-booker.herokuapp.com';

  constructor(private readonly request: APIRequestContext) {}

  async createToken(username = 'admin', password = 'password123'): Promise<string> {
    const response = await this.request.post(`${this.baseUrl}/auth`, {
      data: { username, password },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy();
    return body.token;
  }

  async createBooking(payload: BookingDetails): Promise<CreateBookingResponse> {
    const response = await this.request.post(`${this.baseUrl}/booking`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    expect(response.status(), 'Expected 200 OK when creating booking').toBe(200);
    const body = await response.json();

    // Validates JSON contract & data types automatically
    return CreateBookingResponseSchema.parse(body);
  }

  async getBookingById(bookingId: number): Promise<BookingDetails> {
    const response = await this.request.get(`${this.baseUrl}/booking/${bookingId}`, {
      headers: { Accept: 'application/json' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    return BookingDetailsSchema.parse(body);
  }

  async deleteBooking(bookingId: number, token: string): Promise<void> {
    const response = await this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status()).toBe(201);
  }
}