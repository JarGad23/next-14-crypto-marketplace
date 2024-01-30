import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new NextResponse(`Webhook Error ${error.message}`, { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session?.metadata?.userId;
  const transactionId = session?.metadata?.transactionId;
  const saleId = session?.metadata?.saleId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !saleId || !transactionId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }
    const existingTransaction = await db.transaction.findFirst({
      where: { id: transactionId },
    });

    if (!existingTransaction) {
      return new NextResponse("Failed to find transaction", { status: 404 });
    }

    const existingSale = await db.tokenForSale.findFirst({
      where: { id: saleId },
    });

    if (!existingSale) {
      return new NextResponse("Failed to find sale", { status: 404 });
    }

    const existingTokenInWallet = await db.userWallet.findUnique({
      where: {
        userId_tokenId: {
          userId: existingTransaction.buyerUserId,
          tokenId: existingTransaction.tokenId,
        },
      },
    });

    if (existingTokenInWallet) {
      await db.userWallet.update({
        where: {
          id: existingTokenInWallet.id,
        },
        data: {
          userQuantityOfToken: {
            increment: existingTransaction.quantity,
          },
        },
      });
    } else {
      await db.userWallet.create({
        data: {
          userId,
          tokenId: existingTransaction.tokenId,
          userQuantityOfToken: existingTransaction.quantity,
        },
      });
    }

    let sale;

    if (existingTransaction.quantity === existingSale.quantityForSale) {
      sale = await db.tokenForSale.delete({
        where: {
          id: existingSale.id,
        },
      });

      await db.userWallet.delete({
        where: {
          userId_tokenId: {
            tokenId: sale.tokenId,
            userId: sale.sellerUserId,
          },
        },
      });
    } else {
      sale = await db.tokenForSale.update({
        where: {
          id: existingSale.id,
        },
        data: {
          quantityForSale: {
            decrement: existingTransaction.quantity,
          },
          soldQuantity: {
            increment: existingTransaction.quantity,
          },
        },
      });
    }

    await db.transaction.update({
      where: {
        id: existingTransaction.id,
      },
      data: {
        transactionState: "PAID",
      },
    });
    return new NextResponse(null, { status: 200 });
  } else {
    if (transactionId) {
      await db.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          transactionState: "DENIED",
        },
      });
    }

    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    );
  }
}
