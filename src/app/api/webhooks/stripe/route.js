// /app/api/webhooks/stripe/route.js
import { NextResponse } from 'next/server'
import { stripe }        from '@/lib/stripe'

// CRITICAL: disable body parsing — Stripe needs raw bytes to verify the signature
export const config = { api: { bodyParser: false } }

export async function POST(req) {
  const body      = await req.text()                       // raw string, NOT JSON
  const signature = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    // Signature mismatch — reject the request (could be a forgery)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // ── Route by event type ────────────────────────────────────────
  switch (event.type) {

    case 'checkout.session.completed': {
      const session = event.data.object
      if (session.payment_status === 'paid') {
        await fulfillOrder(session)     // your function: save booking to DB
      }
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object
      await renewSubscription(invoice) // e.g. extend user's plan expiry in DB
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object
      await cancelSubscription(sub)    // revoke user's access
      break
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object
      await notifyUser(pi)             // email user about the failure
      break
    }

    default:
      // Safely ignore events you don't handle
  }

  return NextResponse.json({ received: true })
}

// ── Example fulfillment function ──────────────────────────────────
async function fulfillOrder(session) {
  // session.metadata contains everything you stored at checkout creation
  const { userId, eventId, quantity, amount } = session.metadata
  // ... insert booking to MongoDB, send confirmation email, etc.
}