import { setPageState } from "./page-state";
import { PageContent } from "./_components/PageContent";
import { AnimateWrapper } from "@/components/global/AnimateWrapper";
import { Suspense } from "react";

type Props = {
  params: { ids: string };
  searchParams: {
    title?: string;
    class?: string;
    subject?: string;
    dueTo?: string;
  };
};

export default function AssignmentPage({ params, searchParams }: Props) {
  return (
    <AnimateWrapper>
      <Suspense fallback={<></>}>
        <PageContent searchParams={searchParams} params={params} />
      </Suspense>
    </AnimateWrapper>
  );
}
