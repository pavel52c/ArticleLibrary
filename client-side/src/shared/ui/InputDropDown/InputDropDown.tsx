import React, { useRef, useState } from "react";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import Paragraph from "../Paragraph/Paragraph";
import { ArrowDownImg, ArrowUpImg } from "../../public/images";
import Button from "../Button/Button";

export type DropDownItem = { value: string; subValue: string; id: string };

export interface InputDropDownProps<T> {
  items: (T & DropDownItem)[];
  selectedItem?: string;
  onChange: (args: string) => void;
  onSubmit: (args: string) => void;
  label: string;
}

export const InputDropDown = React.memo(
  (props: Partial<InputDropDownProps<unknown>>) => {
    const {
      items = [],
      selectedItem = "",
      onChange = () => {},
      onSubmit = () => {},
      label = "",
    } = props;
    const ref = useRef(null);
    const [value, setValue] = useState<string>(selectedItem);
    const [show, setShow] = useState<boolean>(false);

    useHandleClickOutside(() => setShow(false), ref);

    const handleChange = (value: string) => {
      onChange(value);
      onSubmit(value);
      setValue(value);
      setShow(false);
    };

    const handleInputClick = () => setShow((prev) => !prev);

    return (
      <div className="InputDropDown" ref={ref}>
        <Button
          className="InputDropDown__selectedItem"
          onClick={handleInputClick}
        >
          <Paragraph size="xl" colorMode="gray">
            {items.find((item) => item.value.includes(value))?.value || label}
          </Paragraph>
          {show ? <ArrowDownImg /> : <ArrowUpImg />}
        </Button>
        {show && (
          <div className="InputDropDown__dropDown">
            <ul className="InputDropDown__list">
              {items.map(({ value, subValue, id }) => (
                <li key={id}>
                  <Button
                    onClick={() => handleChange(id)}
                    className="InputDropDown__item"
                  >
                    <Paragraph size="xl" mode="medium">
                      {value}
                    </Paragraph>
                    {subValue && (
                      <Paragraph size="l" colorMode="gray">
                        {subValue}
                      </Paragraph>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);
