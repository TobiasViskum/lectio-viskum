import { getMessages } from "@/api-functions/scrapeFunctions";
import { MessagePageContent } from "../_components/MessagePageContent";

export default async function Messages() {
  const messages = await getMessages({ type: "all" });

  if (messages === null || typeof messages === "string") return <p>Error</p>;

  return <MessagePageContent title={"Alle beskeder"} messages={messages} />;
}
