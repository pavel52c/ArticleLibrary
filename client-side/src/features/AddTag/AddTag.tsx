import React, { useRef, useState } from "react";
import "./AddTag.scss";
import { Input } from "@/shared/ui";
import Button from "@/shared/ui/Button/Button";
import { PlusImg } from "@/shared/public/images";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import { useHandleClickOutside } from "@/shared/hooks/useHandleClickOutside";

interface AddTagProps {
  onAdd: () => void;
}

export const AddTag: React.FC<AddTagProps> = (props) => {
  const [addingTag, setAddingTag] = useState<boolean>(false);

  const stopAdding = () => setAddingTag(false);

  const ref = useRef(null);
  useHandleClickOutside(stopAdding, ref);

  const onKeyDown = (e: any) => {
    if (e.code === "Enter") {
      props.onAdd();
      stopAdding();
    }
  };

  if (addingTag)
    return (
      <div className="AddingTag" ref={ref}>
        <Input onKeyDown={onKeyDown} />
      </div>
    );

  return (
    <Button className="AddTag" onClick={() => setAddingTag(true)}>
      <PlusImg />
      <Paragraph size="m" mode="medium">
        Добавить тег
      </Paragraph>
    </Button>
  );
};
