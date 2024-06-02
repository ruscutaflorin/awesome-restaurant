import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export const POST = async (req: NextRequest) => {
  try {
    const { cartItems, restaurantUUID, restaurantID, totalAmount } =
      await req.json();
    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // const cartItemsData = cartItems.map((item: any) => ({
    //   quantity: item.quantity,
    //   name: item.name,
    // }));
    // TODO:buba e aici ca eu pe succes iau din metadate un obiect orderItem si ma cam sparge

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${restaurantUUID}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${restaurantUUID}/order/failed`,
      metadata: {
        restaurantID,
        totalAmount,
        // cartItems: JSON.stringify(cartItemsData),
        cartItems: JSON.stringify(cartItems),
      },
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json({ paymentLink: checkoutSession.url });
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
