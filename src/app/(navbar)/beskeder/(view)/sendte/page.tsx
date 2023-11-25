import { MessagePageContent } from "../_components/MessagePageContent";
import { lectioAPI } from "@/lib/lectio-api";

export default async function Messages() {
  const messages = await lectioAPI.getMessage.sent();

  if (messages === null) return <p>Error</p>;

  return <MessagePageContent title={"Sendte beskeder"} messages={messages} />;
}
