import { LLMChain, OpenAI, PromptTemplate } from "langchain";
import { type NextFetchEvent, type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Project, Tag } from "~/utils/constants";
import { checkCronRouteAuthEdge } from "~/utils/helpers";

export const config = {
  runtime: "edge",
};

async function analyzeTask(taskTitle: string, taskDescription: string) {
  const model = new OpenAI({
    temperature: 0.5,
    modelName: "gpt-3.5-turbo",
    maxConcurrency: 10,
  });

  const template = `
                Take this task with title: ${taskTitle} and description: ${taskDescription}. Now your job is giving me a set of tags that and relevant projects this task can be a part of. You are only allowed to choose between a specified set of tags which are ${Object.values(
                  Tag,
                ).join(", ")} and projects which are ${Object.values(
                  Project,
                ).join(
                  ", ",
                )}. You can also choose to not assign any tags or projects, if according to you task is not relevant. And I want no other text with the response just an object with keys tags and positions whose values will be array containing the relevant tags and positions you think are valid.
            `;

  const prompt = new PromptTemplate({
    template: template,
    inputVariables: [],
  });

  const chain = new LLMChain({ llm: model, prompt: prompt });
  const res = await chain.call({});

  const parsedData: { tags: string[]; positions: string[] } = JSON.parse(
    res.text,
  );

  const tags = parsedData.tags;
  const positions = parsedData.positions;
}

export default async function analyzeTaskHandler(
  req: NextRequest,
  context: NextFetchEvent,
) {
  const body = await req.json();

  const url = req.nextUrl;

  if (
    !body.taskTitle ||
    !body.taskDescription ||
    !checkCronRouteAuthEdge(url)
  ) {
    return NextResponse.json({
      message: "Bad request",
    });
  }

  context.waitUntil(analyzeTask(body.taskTitle, body.taskDescription));

  return NextResponse.json({
    message: "Analysis started",
  });
}
