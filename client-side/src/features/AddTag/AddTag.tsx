import React, { useState } from "react";
import "./AddTag.scss";
import { Input } from "@/shared/ui";

interface AddTagProps {}

export const AddTag: React.FC<AddTagProps> = (props) => {
  const [addingTag, setAddingTag] = useState<boolean>(false);

  if (addingTag)
    return (
      <div className="AddingTag">
        <Input />
      </div>
    );
};
