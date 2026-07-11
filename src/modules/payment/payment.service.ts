import Stripe from 'stripe';
import config from '../../config';
import prisma from "../../shared/prisma";

// Lazy initialization - only created when first used, not at module load time
let _stripe: Stripe | null = null;
const getStripe = () => {
  if (!_stripe) {
    const key = config.stripe_secret_key as string;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
    _stripe = new Stripe(key, { apiVersion: '2026-06-24.dahlia' });
  }
  return _stripe;
};

const createPaymentIntent = async (tenantId: string, payload: { rentalRequestId: string }) => {
  const rental = await prisma.rentalRequest.findUnique({
    where: { id: payload.rentalRequestId },
    include: { property: true }
  });

  if (!rental) {
    throw new Error('Rental request not found');
  }

  if (rental.tenantId !== tenantId) {
    throw new Error('Unauthorized');
  }

  if (rental.status !== 'APPROVED') {
    throw new Error('Can only pay for APPROVED rental requests');
  }

  const existingPayment = await prisma.payment.findUnique({
    where: { rentalRequestId: rental.id }
  });
  if (existingPayment && existingPayment.status === 'COMPLETED') {
    throw new Error('Payment already completed');
  }

  // Create Stripe payment intent
  const paymentIntent = await getStripe().paymentIntents.create({
    amount: Math.round(rental.property.price * 100), // Stripe takes amounts in cents
    currency: 'usd',
    metadata: {
      rentalRequestId: rental.id,
      tenantId,
    }
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
};

const confirmPayment = async (payload: { transactionId: string, rentalRequestId: string, method: string }) => {
  const { transactionId, rentalRequestId, method } = payload;
  
  // Verify with Stripe (simplified for this assignment, normally handled by webhook)
  // Here we just accept the client's word that payment succeeded to update our DB.
  // In a real scenario, we'd verify the PaymentIntent status on Stripe directly or use a webhook.
  const paymentIntent = await getStripe().paymentIntents.retrieve(transactionId);
  if (paymentIntent.status !== 'succeeded') {
    throw new Error('Payment not successful according to Stripe');
  }

  const payment = await prisma.payment.create({
    data: {
      transactionId,
      rentalRequestId,
      amount: paymentIntent.amount / 100,
      method,
      status: 'COMPLETED',
      paidAt: new Date(),
    }
  });

  await prisma.rentalRequest.update({
    where: { id: rentalRequestId },
    data: { status: 'ACTIVE' }
  });

  return payment;
};

const getPaymentHistory = async (tenantId: string) => {
  return await prisma.payment.findMany({
    where: {
      rentalRequest: {
        tenantId
      }
    },
    include: {
      rentalRequest: {
        include: { property: true }
      }
    }
  });
};

const getPaymentDetails = async (id: string, userId: string, role: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      rentalRequest: {
        include: { property: true }
      }
    }
  });

  if (!payment) throw new Error('Payment not found');

  if (role === 'TENANT' && payment.rentalRequest.tenantId !== userId) {
    throw new Error('Unauthorized');
  }
  if (role === 'LANDLORD' && payment.rentalRequest.property.landlordId !== userId) {
    throw new Error('Unauthorized');
  }

  return payment;
};

export const PaymentService = {
  createPaymentIntent,
  confirmPayment,
  getPaymentHistory,
  getPaymentDetails,
};
