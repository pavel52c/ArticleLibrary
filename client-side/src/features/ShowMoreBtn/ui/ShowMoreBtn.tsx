import React from "react";
import Button from "@/shared/ui/Button/Button";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";

interface ShowMoreBtnProps {
  visible: boolean;
  onClick: () => void;
}

export const ShowMoreBtn: React.FC<ShowMoreBtnProps> = ({ visible, onClick }) =>
  visible ? (
    <Button variant="primary" fullWidth={true} onClick={onClick}>
      <Paragraph colorMode="secondary" size="xl">
        Показать ещё
      </Paragraph>
    </Button>
  ) : null;
