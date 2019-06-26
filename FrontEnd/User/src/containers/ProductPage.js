import React from 'react';
import {pink600, purple600, orange600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/card-giftcard';
import Car from 'material-ui/svg-icons/maps/directions-car';
import Coffee from 'material-ui/svg-icons/maps/local-cafe';
import InfoBox from '../components/dashboard/InfoBox';
import RecentlyProducts from '../components/dashboard/RecentlyProducts';
import globalStyles from '../styles';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeInfo: {
          name: '',
          description: '',
          products: []
      }
    };
  }

  componentDidMount() {
    const { store_id } = this.props.location.state;
    const url = 'https://ces22-backend.herokuapp.com/store/' + store_id;
    fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(json => this.setState({ storeInfo: json }));
  }

  render() {
    return (
      <div>
        <h1 style={globalStyles.navigation}>{this.state.storeInfo.name}</h1>
        <h2>{this.state.storeInfo.description}</h2>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox Icon={Coffee}
                    color={pink600}
                    title="Comidas"
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox Icon={Car}
                    color={orange600}
                    title="Transporte"
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox Icon={Assessment}
                    color={purple600}
                    title="Outros"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
            <RecentlyProducts data={this.state.storeInfo.products}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
