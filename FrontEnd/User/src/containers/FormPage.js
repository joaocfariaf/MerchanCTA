import React, { Component } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { grey400 } from "material-ui/styles/colors";
import PageBase from "../components/PageBase";
import Select from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

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
const stores = [
  { label: "Gagá Store", value: 1 },
  { label: "CopITA", value: 2 },
  { label: "Loja do CASD", value: 3 },
  { label: "Candy Shop", value: 4 },
  { label: "NUNOS", value: 5 }
];
class FormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: []
    };

    this.inputsInfo = {
      name: "",
      description: "",
      preco: "",
      label: "",
      store_id: ""
    };
  }

  componentDidMount() {
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
    // console.log(this.inputsInfo);

    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        name: this.inputsInfo.name,
        description: this.inputsInfo.description,
        preco: this.inputsInfo.preco,
        store_id: this.inputsInfo.store_id,
        label: this.inputsInfo.label
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch("http://localhost:5000/product", requestInfo).then(response => {
      if (response.ok) {
        alert("Rapaz, só não deu é pouco");
        return response.text();
      } else {
        throw new Error("não foi possível fazer o login");
      }
    });
    // .catch(error => {
    //   alert("Deu errado");
    //   // console.log(error.message);
    //   //this.setState({msg:error.message});
    // });
  }

  handleChange(tag) {
    return event => {
      this.inputsInfo[tag] = event.target.value;
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
            <Select
              value={this.inputsInfo.store_id}
              onChange={this.handleChange("store_id")}
              floatingLabelText="Selecione a loja"
            >
              {this.state.stores.map(store => (
                <MenuItem
                  key={store.value}
                  value={store.value}
                  primaryText={store.label}
                />
              ))}
            </Select>
          </div>
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

            <RaisedButton
              label="Salvar"
              style={styles.saveButton}
              type="submit"
              primary={true}
            />
          </div>
        </form>
      </PageBase>
    );
  }
}

export default FormPage;
