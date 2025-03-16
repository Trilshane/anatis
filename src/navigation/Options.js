import React from "react";

import Header from "./Header";
import { colorCardBackground } from "../styles/Styles";

export const screenOptions = () => {
  return {
    cardStyle: {
      backgroundColor: colorCardBackground,
    },
    // header: Header, // Вот так внутри не работают хуки
    header: (props) => <Header {...props} />,
  };
};
