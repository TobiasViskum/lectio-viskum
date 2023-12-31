import { MessagePageContent } from "../_components/MessagePageContent";
import { lectioAPI } from "@/lib/lectio-api";

export default async function Messages() {
  const messages = await lectioAPI.getMessage.newest();

  if (messages === null) return <p>Error</p>;

  return <MessagePageContent title={"Nyeste beskeder"} messages={messages} />;
}
