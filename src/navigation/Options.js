import Header from "./Header";
import { colorCardBackground } from "../styles/Styles";

export const screenOptions = () => {
  return {
    cardStyle: {
      backgroundColor: colorCardBackground,
    },
    header: (props) => <Header {...props} />,
  };
};
