import React from "react";
import { pink600, purple600, orange600, green600 } from "material-ui/styles/colors";
import Assessment from "material-ui/svg-icons/action/card-giftcard";
import Car from "material-ui/svg-icons/maps/directions-car";
import Coffee from "material-ui/svg-icons/maps/local-cafe";
import Store from 'material-ui/svg-icons/action/store'
import InfoBox from "../components/dashboard/InfoBox";
import RecentlyProducts from "../components/dashboard/RecentlyProducts";
import TopStores from "../components/dashboard/TopStores";
import globalStyles from "../styles";
import HeaderLace from "../components/dashboard/HeaderLace";
import TopStores from "../components/dashboard/TopStores";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentProducts: [],
      backup_recentProducts: [],
      topStores: [],
      clicked: {
        comidas: false,
        transporte: false,
        outros: false
      }
    };
  }

  componentDidMount() {
    this.buscarDB()
  }

  buscarDB() {
    fetch("https://ces22-backend.herokuapp.com/product", { method: "GET" })
      .then(res_product => res_product.json())
      .then(json_product => {
        const productsWithIcons = json_product.map((element) => {
          let relatedIcon;
          let relatedIconColor;
          if (element.label === "COMIDAS") 
          {
            relatedIcon = Coffee;
            relatedIconColor = pink600;
          }
          else if (element.label === "TRANSPORTE")
          {
            relatedIcon = Car;
            relatedIconColor = orange600;
          }
          else if (element.label === "OUTROS")
          {
            relatedIcon = Assessment;
            relatedIconColor = purple600;
          }

          element.relatedIcon = relatedIcon;
          element.relatedIconColor = relatedIconColor;
          return element;
        });
        console.log(productsWithIcons[0]);
        this.setState(
        { 
          recentProducts: productsWithIcons, 
          backup_recentProducts: productsWithIcons, 
          clicked: {
            comidas: false,
            transporte: false,
            outros: false
          } 
        });
      });

    fetch("https://ces22-backend.herokuapp.com/store", { method: "GET" })
      .then(res_stores => res_stores.json())
      .then(json_stores => {
        const storesWithIcons = json_stores.map((element) => {
          const relatedIcon = Store;
          const relatedIconColor = green600;

          element.relatedIcon = relatedIcon;
          element.relatedIconColor = relatedIconColor;
          return element;
        })
        this.setState({ topStores: storesWithIcons });
      });
  }

  clickComidas(event){
    console.log(this.state.clicked)
    const new_clicked = {
      comidas: false,
      transporte: false,
      outros: false
    } 
    new_clicked['comidas'] = !this.state.clicked['comidas']
    if (!this.state.clicked['comidas']) 
    {
      this.setState({ recentProducts: this.state.backup_recentProducts.filter((element) => element.label === "COMIDAS"), clicked: new_clicked });
    }
    else 
    {
      this.setState({ recentProducts: this.state.backup_recentProducts, clicked: new_clicked  });
    }
  }

  clickTransporte(event){
    console.log(this.state.clicked)
    const new_clicked = {
      comidas: false,
      transporte: false,
      outros: false
    } 
    new_clicked['transporte'] = !this.state.clicked['transporte']
    if (!this.state.clicked['transporte']) 
    {
      this.setState({ recentProducts: this.state.backup_recentProducts.filter((element) => element.label === "TRANSPORTE"), clicked: new_clicked });
    }
    else 
    {
      this.setState({ recentProducts: this.state.backup_recentProducts, clicked: new_clicked  });
    }
  }

  clickOutros(event){
    console.log(this.state.clicked)
    const new_clicked = {
      comidas: false,
      transporte: false,
      outros: false
    } 
    new_clicked['outros'] = !this.state.clicked['outros']
    if (!this.state.clicked['outros']) 
    {
      this.setState({ recentProducts: this.state.backup_recentProducts.filter((element) => element.label === "OUTROS"), clicked: new_clicked });
    }
    else 
    {
      this.setState({ recentProducts: this.state.backup_recentProducts, clicked: new_clicked  });
    }
  }

  render() {
    return (
      <div>
        <h3 style={globalStyles.navigation} />
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15">
            <HeaderLace title="PAPAPAP"/>
          </div>
        </div>
        
        <div className="row">
          <div onClick={this.clickComidas.bind(this)} className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15">
            <InfoBox Icon={Coffee} color={pink600} title="Comidas" />
          </div>

          <div onClick={this.clickTransporte.bind(this)} className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15 ">
            <InfoBox Icon={Car} color={orange600} title="Transporte" />
          </div>

          <div onClick={this.clickOutros.bind(this)} className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15 ">
            <InfoBox Icon={Assessment} color={purple600} title="Outros" />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 m-b-15 ">
            <TopStores data={this.state.topStores.sort((a,b)=> b.rating - a.rating).slice(0,10)} />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15 ">
            <RecentlyProducts data={this.state.recentProducts.sort((a,b)=> b.id - a.id).slice(0,10)} />            
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
