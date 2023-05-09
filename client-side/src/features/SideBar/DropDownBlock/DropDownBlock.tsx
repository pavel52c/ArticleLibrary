import React from "react";
import "./DropDownBlock.scss";
import Paragraph from "../../../shared/ui/Paragraph/Paragraph";
import {
  InputDropDown,
  InputDropDownProps,
} from "../../../shared/ui/InputDropDown/InputDropDown";

export const DropDownBlock = (props: Partial<InputDropDownProps<unknown>>) => (
  <div className="DropDownBlock">
    <Paragraph size="xl" colorMode="gray">
      Выбор источника
    </Paragraph>
    <InputDropDown label="Все библиотеки" {...props} />
  </div>
);
