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
import {grey400, white} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';

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
        <Subheader style={styles.subheader}>Anúncios Recentes</Subheader>
        {props.data.map(item => (
          <div key={item.title}>
            <ListItem
              leftAvatar={<Avatar backgroundColor={item.relatedIconColor} color={white} icon={<item.relatedIcon />} />}
              primaryText={item.name}
              secondaryText={item.description}
              rightIconButton={rightIconMenu}
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
            <Divider inset={false} />
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
