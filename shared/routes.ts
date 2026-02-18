import { z } from 'zod';
import { insertUserSchema, insertCarSchema, insertBookingSchema, users, cars, bookings } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  cars: {
    list: {
      method: 'GET' as const,
      path: '/api/cars' as const,
      responses: {
        200: z.array(z.custom<typeof cars.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/cars/:id' as const,
      responses: {
        200: z.custom<typeof cars.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  users: {
    get: {
        method: 'GET' as const,
        path: '/api/users/:id' as const,
        responses: {
            200: z.custom<typeof users.$inferSelect>(),
            404: errorSchemas.notFound,
        },
    },
    // For demo purposes, a way to switch users
    list: {
        method: 'GET' as const,
        path: '/api/users' as const,
        responses: {
            200: z.array(z.custom<typeof users.$inferSelect>()),
        },
    }
  },
  bookings: {
    list: {
      method: 'GET' as const,
      path: '/api/bookings' as const, // Can filter by carId or userId via query params
      input: z.object({
        carId: z.string().optional(),
        userId: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof bookings.$inferSelect & { car?: typeof cars.$inferSelect, user?: typeof users.$inferSelect }>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/bookings' as const,
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/bookings/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
