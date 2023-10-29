import { LLMChain, OpenAI, PromptTemplate } from "langchain";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env.mjs";
import { Project, Tag } from "~/utils/constants";

export const runtime = "edge";

export default async function runAnalysisHandler(req: NextRequest) {
  const body = await req.json();
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  if (!body.taskTitle || !body.taskDescription) {
    return new NextResponse(JSON.stringify({ error: "Bad Request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const model = new OpenAI({
    temperature: 0.5,
    modelName: "gpt-3.5-turbo",
    maxConcurrency: 10,
    openAIApiKey: env.OPENAI_API_KEY,
  });

  try {
    const template = `
      Take this task with title: {title} and {description}. Now your job is giving me a set of tags that and relevant projects this task can be a part of. You are only allowed to choose between a specified set of tags which are ${Object.values(
        Tag,
      ).join(", ")} and projects which are ${Object.values(Project).join(
        ", ",
      )}. You can also choose to not assign any tags or projects, if according to you task is not relevant. And I want no other text with the response just an object with keys tags and positions whose values will be array containing the relevant tags and projects you think are valid. 
    `;

    const prompt = new PromptTemplate({
      template: template,
      inputVariables: ["title", "description"],
    });
    const chain = new LLMChain({ llm: model, prompt: prompt });

    chain
      .call(
        {
          title: body.taskTitle,
          description: JSON.stringify(body.taskDescription),
        },
        [
          {
            async handleLLMNewToken(token) {
              await writer.ready;
              await writer.write(encoder.encode(`data: ${token}\n\n`));
            },
          },
        ],
      )
      .then((res) => {
        const parsedData: { tags: string[]; projects: string[] } = JSON.parse(
          res.text,
        );

        const tags = parsedData.tags;
        const projects = parsedData.projects;

        return {
          tags,
          projects,
        };
      })
      .then(async (result) => {
        try {
          await writer.ready;
          await writer.write(
            encoder.encode(
              `data: ${JSON.stringify({
                tags: result.tags,
                projects: result.projects,
              })}\n\n`,
            ),
          );
        } catch (error) {
          console.error(error);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          throw new Error(error as any);
        } finally {
          await writer.ready;
          await writer.close();
        }
      });
    return new NextResponse(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (err) {
    console.error(err);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(JSON.stringify({ error: (err as any).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
