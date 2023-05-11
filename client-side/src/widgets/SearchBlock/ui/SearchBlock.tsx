import React from "react";
import { MainInput } from "@/entities/Input/ui/MainInput/MainInput";
import Button from "@/shared/ui/Button/Button";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import "./SearchBlock.scss";

interface SearchBlockProps {
  onSubmit: () => void;
  onChange: (value: string) => void;
}

export const SearchBlock: React.FC<SearchBlockProps> = React.memo(
  ({ onSubmit, onChange }) => {
    const inputProps = {
      placeholder: "Название статьи",
      onChange: onChange,
      onSubmit: onSubmit,
    };

    return (
      <div className="SearchBlockProps">
        <MainInput {...inputProps} />
        <Button
          variant="primary"
          className="SearchBlockProps__btn"
          onClick={onSubmit}
        >
          <Paragraph colorMode="secondary" size="xl">
            Найти
          </Paragraph>
        </Button>
      </div>
    );
  }
);
