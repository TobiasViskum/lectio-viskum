import { SidebarWrapper } from "../_components/SidebarWrapper";

type Props = { children: React.ReactNode };

export default function SmallScreen({ children }: Props) {
  return (
    <SidebarWrapper>
      <div className="w-full">{children}</div>
    </SidebarWrapper>
  );
}
