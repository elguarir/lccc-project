import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/server/routers/emails";
import { PrismaClient } from "@prisma/client";
import db from "@/prisma";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }
  const { id } = evt.data;
  const eventType = evt.type;
  if (eventType === "user.created") {
    const primaryEmailAddressId = evt.data.primary_email_address_id;
    const primaryEmailAddress = evt.data.email_addresses.find(
      (email) => email.id === primaryEmailAddressId,
    );
    // create the user
    const user = await db.user.create({
      data: {
        id: id,
        email: primaryEmailAddress?.email_address!,
        first_name: evt.data.first_name,
        last_name: evt.data.last_name,
        username: evt.data.username!,
        avatar_url: evt.data.image_url,
      },
    });
    if (!user) {
      return NextResponse.json({ status: "error" }, { status: 500 });
    }

    await db.user.update({
      where: {
        id: id,
      },
      data: {
        profile: {
          create: {
            userId: user.id,
          },
        },
      },
    });

    // send welcome email
    try {
      await sendWelcomeEmail({
        name: user.first_name,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
    }

    return NextResponse.json("OK", { status: 200 });
  }
  if (eventType === "user.updated") {
    const primaryEmailAddressId = evt.data.primary_email_address_id;
    const primaryEmailAddress = evt.data.email_addresses.find(
      (email) => email.id === primaryEmailAddressId,
    );
    await db.user
      .update({
        where: {
          id: id,
        },
        data: {
          email: primaryEmailAddress?.email_address!,
          first_name: evt.data.first_name,
          last_name: evt.data.last_name,
          username: evt.data.username!,
          avatar_url: evt.data.image_url,
        },
      })
      .catch((err) => {
        return NextResponse.json({ status: "error" }, { status: 500 });
      });

    return NextResponse.json("OK", { status: 200 });
  }
  if (eventType === "user.deleted") {
    await db.user
      .delete({
        where: {
          id: id,
        },
      })
      .catch((err) => {
        return NextResponse.json({ status: "error" }, { status: 500 });
      });

    return NextResponse.json("OK", { status: 200 });
  }
  return new Response("", { status: 200 });
}
