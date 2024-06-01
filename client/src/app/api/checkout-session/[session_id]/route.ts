import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.pathname.split("/")[3];
  try {
    if (typeof session_id === "string") {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      return NextResponse.json(session, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
