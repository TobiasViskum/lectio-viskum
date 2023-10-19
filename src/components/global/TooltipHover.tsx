import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function TooltipHover({
  children,
  html,
}: {
  children?: React.ReactNode;
  html?: JSX.Element;
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent className="border border-accent bg-background text-muted-foreground">
            {html}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
