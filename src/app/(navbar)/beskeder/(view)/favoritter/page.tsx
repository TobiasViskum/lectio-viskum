import { MessagePageContent } from "../_components/MessagePageContent";
import { lectioAPI } from "@/lib/lectio-api";

export default async function Messages() {
  const messages = await lectioAPI.getMessage.favorites();

  if (messages === null) return <p>Error</p>;

  return <MessagePageContent title={"Favoritbeskeder"} messages={messages} />;
}
