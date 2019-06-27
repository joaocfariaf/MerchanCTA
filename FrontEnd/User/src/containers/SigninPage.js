import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import { blue900, white } from "material-ui/styles/colors";
import TextField from "material-ui/TextField";
import { browserHistory, Link } from "react-router";
import ThemeDefault from "../theme-default";

const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: "auto",
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    margin: "auto"
  },
  paper: {
    padding: 20,
    overflow: "auto"
  },
  buttonsDiv: {
    textAlign: "center",
    padding: 10
  },
  flatButton: {
    color: blue900
  },
  checkRemember: {
    style: {
      float: "left",
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: blue900
    },
    iconStyle: {
      color: blue900,
      borderColor: blue900,
      fill: blue900
    }
  },
  loginBtn: {
    float: "right"
  },
  btn: {
    background: "#4f81e9",
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  },
  btnSpan: {
    marginLeft: 5
  }
};

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.inputsInfo = {
      email: "",
      password: "",
      confirm_password: ""
    };
    this.state = {
      msg_user: ""
    };
  }

  makingRequest(event) {
    event.preventDefault();

    console.log(this.inputsInfo);

    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        email: this.inputsInfo.email,
        password: this.inputsInfo.password
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch("https://ces22-backend.herokuapp.com/registration", requestInfo)
      .then(res => res.json())
      .then(json => {
        localStorage.setItem("MerchanCTA-UserTokens", json.access_token);
        localStorage.setItem("MerchanCTA-UserId", json.user_id);
        browserHistory.push({
          pathname: "/",
          state: {
            user_email: json.user_email
          }
        });
      })
      .catch(error => {
        this.setState({
          msg_user:
            "Não foi possível realizar o login. Motivo: " + error.message
        });
      });
  }

  handleChange(tag) {
    return event => {
      this.inputsInfo[tag] = event.target.value;
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <h1>Welcome</h1>
              <form onSubmit={this.makingRequest.bind(this)}>
                <TextField
                  hintText="E-mail"
                  floatingLabelText="E-mail"
                  fullWidth={true}
                  onChange={this.handleChange("email")}
                />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  onChange={this.handleChange("password")}
                />
                <TextField
                  hintText="Confirm Password"
                  floatingLabelText="Confirm Password"
                  fullWidth={true}
                  type="password"
                  onChange={this.handleChange("password")}
                />

                <div>
                  <span>{this.state.msg_user}</span>
                  <Link>
                    <RaisedButton
                      label="Sign In"
                      primary={true}
                      type="submit"
                      style={styles.loginBtn}
                    />
                  </Link>
                </div>
              </form>
            </Paper>

            {/* <div style={styles.buttonsDiv}>
              <FlatButton
                label="Register"
                href="/SigninPage.js"
                style={styles.flatButton}
                icon={<PersonAdd />}
              />

              <FlatButton
                label="Esqueceu a Senha?"
                href="/"
                style={styles.flatButton}
                icon={<Help />}
              />
            </div> */}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SigninPage;