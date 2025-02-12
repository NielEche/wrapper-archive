import { NextResponse } from "next/server";
import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // Initialize PayloadCMS
    const payload = await getPayloadHMR({ config: configPromise });

    // Save the message in PayloadCMS
    const savedMessage = await payload.create({
      collection: "contactMessages", // Ensure this matches your Payload collection name
      data: { name, email, message },
    });

    return NextResponse.json({ success: true, data: savedMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
