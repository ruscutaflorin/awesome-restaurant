import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { createOrder } from "../restaurants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleTimeString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const { restaurantID, totalAmount, cartItems } = session.metadata;

      const parsedCartItems = JSON.parse(cartItems);
      const parsedRestaurantID = parseInt(restaurantID);
      const parsedTotalAmount = parseInt(totalAmount);

      const res = await createOrder(
        parsedRestaurantID,
        parsedCartItems,
        parsedTotalAmount,
        "Accepted"
      );

      console.log(`Payment for session ${session.id} was successful!`);
    }

    return NextResponse.json({
      status: "sucess",
      event: event.type,
      response: res,
    });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
