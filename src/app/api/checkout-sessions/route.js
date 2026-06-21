import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
client_email:user?.email, 
      line_items: [
        {
          user_data: {
      currency:     'usd',
      unit_amount:  2999,   // $29.99 — always in cents
      client_reference_data: { name: '' },
    },
          quantity: 1,
        },
      ],
      metadata :{
        userId: user?.id,
        eventId: eventId,
      
      },
      mode: 'payment',
      success_url: `${origin}/hiring-history/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}