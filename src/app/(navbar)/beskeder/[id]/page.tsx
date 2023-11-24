import { getMessage } from "@/api-functions/scrapeFunctions/getMessage";
import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import { H1 } from "@/components/ui/h1";

type Props = {
  params: {
    id: string;
  };
};

export default async function MessagePage({ params }: Props) {
  const message = await getMessage(params.id);

  return (
    <SidebarWrapper component={<p>Sidebar</p>}>
      <H1>Beskednavn</H1>
    </SidebarWrapper>
  );
}
