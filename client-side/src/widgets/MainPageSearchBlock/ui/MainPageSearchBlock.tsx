import React from "react";
import "./MainPageSearchBlock.scss";
import { MainInput } from "@/entities/Input/ui/MainInput/MainInput";
import Button from "@/shared/ui/Button/Button";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import { SearchActions } from "@/shared/Store/reducers";
import { useAppDispatch } from "@/shared/Store/hooks/reduxHooks";

interface MainPageSearchBlockProps {
  onSubmit: () => void;
}

export const MainPageSearchBlock: React.FC<MainPageSearchBlockProps> =
  React.memo(({ onSubmit }) => {
    console.log("render");
    const dispatch = useAppDispatch();
    const onChange = (value: string) => {
      dispatch(SearchActions.setSearch(value));
    };
    const inputProps = {
      placeholder: "Название статьи",
      onChange: onChange,
      onSubmit: onSubmit,
    };

    return (
      <div className="MainPageSearchBlockProps">
        <MainInput {...inputProps} />
        <Button
          variant="primary"
          className="MainPageSearchBlockProps__btn"
          onClick={onSubmit}
        >
          <Paragraph colorMode="secondary" size="xl">
            Найти
          </Paragraph>
        </Button>
      </div>
    );
  });
