import React from "react";
import {
  InputDropDown,
  InputDropDownProps,
} from "@/shared/ui/InputDropDown/InputDropDown";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import "./DropDownBlock.scss";

export const DropDownBlock = (props: Partial<InputDropDownProps<unknown>>) => (
  <div className="DropDownBlock">
    <Paragraph size="xl" colorMode="gray">
      Выбор источника
    </Paragraph>
    <InputDropDown label="Все библиотеки" {...props} />
  </div>
);
