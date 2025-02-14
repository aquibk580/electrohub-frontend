import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useMediaQuery } from "react-responsive";
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}
const SelectorWrapper = ({ children }: WrapperProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <ScrollArea className="w-[calc(100vw-2rem)] max-w-full rounded-md">
        <div className="flex  space-x-4">{children}</div>
        <ScrollBar className="mt-72" orientation="horizontal" />
      </ScrollArea>
    );
  }
  return <>{children}</>;
};

// export { SelectorWrapper };

const TableWrapper = ({ children }: WrapperProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <ScrollArea className="w-[calc(100vw-2rem)] max-w-full rounded-md">
        <div className="min-w-[600px]">{children}</div>
        <ScrollBar className="mt-9" orientation="horizontal" />
      </ScrollArea>
    );
  }
  return <>{children}</>;
};



export { TableWrapper, SelectorWrapper };
