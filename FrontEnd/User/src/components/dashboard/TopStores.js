import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400, white, pink600} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import StarRatingComponent from 'react-star-rating-component';
import Star from './Star';
import store from 'material-ui/svg-icons/action/store';

const TopStores = props => {
  const styles = {
    subheader: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      backgroundColor: "#804d00",
      color: white
    }
  };

  const iconButtonElement = (
    <IconButton touch={true} tooltipPosition="bottom-left">
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>View</MenuItem>
    </IconMenu>
  );

  return (
    <Paper>
      <List>
        <Subheader style={styles.subheader}>As Lojas mais bem avaliadas</Subheader>
        {props.data.map(item => (
          <div key={item.title}>
            <ListItem
              leftAvatar={<Avatar backgroundColor={item.relatedIconColor} color={white} icon={<item.relatedIcon />} />}
              primaryText={item.name}
              secondaryText={item.description}
              containerElement={
                <Link to={{
                  pathname: '/store/' + item.store_id,
                  state: {
                    store_id: item.store_id
                  }
                }}
                />
              }
            />
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 m-b-15 ">
              <Star data={{store_id: item.id, rating: item.rating}}/>
            </div>
            <Divider inset={true} />
          </div>
        ))}
      </List>
    </Paper>
  );
};

TopStores.propTypes = {
  data: PropTypes.array
};

export default TopStores;
