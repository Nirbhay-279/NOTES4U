import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
// /api/completion
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  // extract the prompt from the body
  // const { prompt } = await req.json();

  // const response = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences
  //           The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
  //       AI is a well-behaved and well-mannered individual.
  //       AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.`,
  //     },
  //     {
  //       role: "user",
  //       content: `
  //       I am writing a piece of text in a notion text editor app.
  //       Help me complete my train of thought here: ##${prompt}##
  //       keep the tone of the text consistent with the rest of the text.
  //       keep the response short and sweet.
  //       `,
  //     },
  //   ],
  //   stream: true,
  // });
  // const stream = OpenAIStream(response);
  // return new StreamingTextResponse(stream);

  // const reqBody = await req.json();
  const { prompt } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });

  try {
    const fullPrompt = `${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({
      text,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
