import React from "react";
import { pink600, purple600, orange600 } from "material-ui/styles/colors";
import Assessment from "material-ui/svg-icons/action/card-giftcard";
import Car from "material-ui/svg-icons/maps/directions-car";
import Coffee from "material-ui/svg-icons/maps/local-cafe";
import InfoBox from "../components/dashboard/InfoBox";
import RecentlyProducts from "../components/dashboard/RecentlyProducts";
import globalStyles from "../styles";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentProducts: []
    };
  }

  componentDidMount() {
    fetch("https://ces22-backend.herokuapp.com/product", { method: "GET" })
      .then(res => res.json())
      .then(json => this.setState({ recentProducts: json }));
  }

  render() {
    return (
      <div>
        <h3 style={globalStyles.navigation} />
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox Icon={Coffee} color={pink600} title="Comidas" />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox Icon={Car} color={orange600} title="Transporte" />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox Icon={Assessment} color={purple600} title="Outros" />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 m-b-15 ">
            <RecentlyProducts data={this.state.recentProducts} />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <RecentlyProducts data={this.state.recentProducts} />
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
