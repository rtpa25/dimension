import { env } from "~/env.mjs";

class QstashHelper {
  sendJobFetchNotification(taskTitle: string, taskDescription: string) {
    const url = "https://qstash.upstash.io/v1/publish/analyze-task";

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.QSTASH_AUTHORIZATION_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskTitle,
        taskDescription,
      }),
    });
  }
}

const eventBus = new QstashHelper();

export default eventBus;
