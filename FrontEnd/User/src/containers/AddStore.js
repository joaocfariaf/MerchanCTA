/**********  AINDA  PRECISA EDITAR*************************/

import React, { Component } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { grey400 } from "material-ui/styles/colors";
import PageBase from "../components/PageBase";

//import InputLabel from "material-ui/InputLabel";
const styles = {
  toggleDiv: {
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5
  },
  toggleLabel: {
    color: grey400,
    fontWeight: 100
  },
  buttons: {
    marginTop: 30,
    float: "right"
  },
  saveButton: {
    marginLeft: 5
  }
};
// const stores = [
//   { label: "Gagá Store", value: 1 },
//   { label: "CopITA", value: 2 },
//   { label: "Loja do CASD", value: 3 },
//   { label: "Candy Shop", value: 4 },
//   { label: "NUNOS", value: 5 }
// ];
class AddStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      name: "",
      description: "",
      preco: "",
      label: "",
      store_id: ""
    };
  }

  componentDidMount() {
    console.log(
      "https://ces22-backend.herokuapp.com/getStores/" +
        localStorage.getItem("MerchanCTA-UserId")
    );
    fetch(
      "https://ces22-backend.herokuapp.com/getStores/" +
        localStorage.getItem("MerchanCTA-UserId"),
      { method: "GET" }
    )
      .then(res => res.json())
      .then(json => {
        this.setState({ stores: json });
      });
  }

  makingRequest(event) {
    event.preventDefault();

    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        endereco: this.state.endereco
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
      //this.setState({ value: store_id }),
    };

    fetch("https://ces22-backend.herokuapp.com/getStores", requestInfo).then(
      response => {
        if (response.ok) {
          alert("Rapaz, só não deu é pouco");
          return response.text();
        } else {
          throw new Error("não foi possível fazer o login");
        }
      }
    );
    // .catch(error => {
    //   alert("Deu errado");
    //   // console.log(error.message);
    //   //this.setState({msg:error.message});
    // });
  }

  handleChange() {
    return event => {
      this.setState({ tag: event.target.value });
    };
  }

  render() {
    return (
      <PageBase title="Adicionar Loja" navigation="Admin / Forms">
        <form onSubmit={this.makingRequest.bind(this)}>
          <TextField
            hintText="Nome"
            floatingLabelText="Nome"
            fullWidth={true}
            onChange={this.handleChange("name")}
          />
          <TextField
            label="Text"
            floatingLabelText="Endereco"
            fullWidth={true}
            hintText="Rua H8B apt. 241, CTA, São José dos Campos - SP"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="filled"
            onChange={this.handleChange("endereco")}
          />
          <TextField
            hintText="Descrição"
            floatingLabelText="Descrição"
            fullWidth={true}
            onChange={this.handleChange("description")}
          />

          <div style={styles.buttons}>
            <Link to="/">
              <RaisedButton label="Cancelar" />
            </Link>

            <Link to="/form">
              <RaisedButton
                label="Salvar"
                style={styles.saveButton}
                type="submit"
                primary={true}
              />
            </Link>
          </div>
        </form>
      </PageBase>
    );
  }
}

export default AddStore;
