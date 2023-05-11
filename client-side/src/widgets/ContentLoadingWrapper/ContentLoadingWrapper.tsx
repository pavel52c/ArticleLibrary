import React from "react";
import { TailSpin } from "react-loader-spinner";
import { isEmpty } from "lodash";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";

interface ContentLoadingWrapperProps {
  children: React.ReactNode;
  error: string;
  isLoading: boolean;
}

export const ContentLoadingWrapper: React.FC<ContentLoadingWrapperProps> = (
  props
) => {
  const { error, isLoading, children } = props;
  switch (true) {
    case !!error:
      return (
        <Paragraph size="xl" colorMode="error" className="ContentLoaderWrapper">
          {error}
        </Paragraph>
      );
    case isLoading:
      return (
        <TailSpin
          width="80"
          color="green"
          wrapperClass="ContentLoaderWrapper"
        />
      );
    case isEmpty(children):
      return (
        <Paragraph size="xl" colorMode="gray" className="ContentLoaderWrapper">
          К сожалению ничего не найдено
        </Paragraph>
      );
    default:
      return <>{children}</>;
  }
};
