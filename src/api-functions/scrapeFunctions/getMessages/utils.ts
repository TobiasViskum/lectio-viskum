export function getMessageInformation($elem: cheerio.Cheerio) {
  const message: Message = {
    title: "",
    latestSender: "",
    sender: "",
    receivers: "",
    latestChange: "",
    isUnread: false,
    id: "",
    eventArgument: {},
  };
  const title = $elem.children().eq(3).children().eq(0).children().eq(0).text();
  const latestSender = $elem.children().eq(4).children().eq(0).attr("title");
  const sender = $elem.children().eq(5).children().eq(0).attr("title");
  const receivers = $elem.children().eq(6).children().eq(0).attr("title");
  const latestChange = $elem.children().eq(7).text();

  const onClickStr = $elem.find(".buttonlink > a").attr("onclick") || "";
  const idMatch = onClickStr.match(/_([0-9]+)/);
  const eArgMatch = onClickStr.match(/'(.*)','(.*)'/);

  if (latestSender && sender && receivers && idMatch && eArgMatch) {
    message.title = title;
    message.latestSender = latestSender.replaceAll("\n", ", ");
    message.sender = sender.replaceAll("\n", ", ");
    message.receivers = receivers.replaceAll("\n", ", ");
    message.latestChange = latestChange;
    message.isUnread = $elem.hasClass("unread");
    message.id = idMatch[1];
    message.eventArgument[eArgMatch[1]] = eArgMatch[2];
    return message;
  } else {
    return null;
  }
}
