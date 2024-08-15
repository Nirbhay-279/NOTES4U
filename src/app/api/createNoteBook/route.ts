// /api/createNoteBook

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse,NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return new NextResponse("unauthorised", { status: 401 });
  }
  const body = await req.json();
  const { name } = body;
  // const image_description = await generateImagePrompt(name);
  // if (!image_description) {
  //   return new NextResponse("failed to generate image description", {
  //     status: 500,
  //   });
  // }
  // const image_url = await generateImage(image_description);
  // if (!image_url) {
  //   return new NextResponse("failed to generate image ", {
  //     status: 500,
  //   });
  // }

  const note_ids = await db
    .insert($notes)
    .values({
      name,
      userId,
      imageUrl: "https://res.cloudinary.com/dbj5s9roc/image/upload/v1721622532/mefch35oacltvszsjlkq.jpg",
    })
    .returning({
      insertedId: $notes.id,
    });

  return NextResponse.json({
    note_id: note_ids[0].insertedId,
  });
}