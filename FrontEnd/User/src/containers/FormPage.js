import React, { Component } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
//import Input from "material-ui/Input"
import { grey400 } from "material-ui/styles/colors";
import PageBase from "../components/PageBase";
import Select from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

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
class FormPage extends Component {
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
        if (json.message == undefined) this.setState({ stores: json });
      });
  }

  makingRequest(event) {
    event.preventDefault();

    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        name: this.state.inputsInfo["name"],
        description: this.state.inputsInfo["description"],
        preco: this.state.inputsInfo["preco"],
        store_id: this.state.inputsInfo["store_id"],
        label: this.state.inputsInfo["label"]
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
      //this.setState({ value: store_id }),
    };

    console.log(requestInfo);

    fetch("https://ces22-backend.herokuapp.com/product", requestInfo).then(
      response => {
        if (response.ok) {
          alert("Item inserido com sucesso!");
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

  handleChange(tag) {
    return event => {
      const newInputsInfo = this.state.inputsInfo;
      newInputsInfo[tag] = event.target.value;
      this.setState({ inputsInfo: newInputsInfo });
    };
  }

  render() {
    return (
      <PageBase title="Adicionar Produto" navigation="Admin / Forms">
        <form onSubmit={this.makingRequest.bind(this)}>
          <TextField
            hintText="Nome"
            floatingLabelText="Nome"
            fullWidth={true}
            onChange={this.handleChange("name")}
          />
          <TextField
            id="filled-number"
            label="Number"
            floatingLabelText="Preço"
            hintText="Exemplo: 10.23"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="filled"
            onChange={this.handleChange("preco")}
          />
          <div>
            {this.state.stores.map(store => (
              <MenuItem key={store.id}>
                {" Id: " + store.id + " - " + store.name}
              </MenuItem>
            ))}
          </div>
          <TextField
            hintText="Id de sua loja (lista a cima)"
            floatingLabelText="Id"
            fullWidth={true}
            onChange={this.handleChange("store_id")}
          />
          <TextField
            hintText="Descrição"
            floatingLabelText="Descrição"
            fullWidth={true}
            onChange={this.handleChange("description")}
          />
          <TextField
            hintText="Escolha uma: COMIDAS, TRANSPORTE e OUTROS"
            floatingLabelText="Label"
            fullWidth={true}
            onChange={this.handleChange("label")}
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

export default FormPage;