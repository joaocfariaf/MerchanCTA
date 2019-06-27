import React from "react";
import { pink600, purple600, orange600, green600 } from "material-ui/styles/colors";
import Assessment from "material-ui/svg-icons/action/card-giftcard";
import Car from "material-ui/svg-icons/maps/directions-car";
import Coffee from "material-ui/svg-icons/maps/local-cafe";
import Store from 'material-ui/svg-icons/action/store'
import InfoBox from "../components/dashboard/InfoBox";
import RecentlyProducts from "../components/dashboard/RecentlyProducts";
import TopStores from "../components/dashboard/TopStores"
import globalStyles from "../styles";
// import HeaderLace from "../components/dashboard/HeaderLace";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentProducts: [],
      topStores: []
    };
  }

  componentDidMount() {
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
        this.setState({ recentProducts: productsWithIcons });
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

  render() {
    return (
      <div>
        <h3 style={globalStyles.navigation} />
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15">
            {/* <HeaderLace title="PAPAPAP"/> */}
          </div>
        </div>
        
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15">
            <InfoBox Icon={Coffee} color={pink600} title="Comidas" />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15 ">
            <InfoBox Icon={Car} color={orange600} title="Transporte" />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15 ">
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