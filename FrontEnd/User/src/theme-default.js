import getMuiTheme from "material-ui/styles/getMuiTheme";
import { brown100, blue600, brown900 } from "material-ui/styles/colors";

const themeDefault = getMuiTheme({
  palette: {},
  appBar: {
    height: 57,
    color: "#cc7a00"
  },
  drawer: {
    width: 230,
    color: brown900
  },
  raisedButton: {
    primaryColor: "#804d00"
  }
});

export default themeDefault;
