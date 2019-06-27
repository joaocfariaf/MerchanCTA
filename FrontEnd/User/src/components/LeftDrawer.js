import React, { PropTypes } from "react";
import Drawer from "material-ui/Drawer";
import { spacing, typography } from "material-ui/styles";
import { white } from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";
import { Link } from "react-router";
import Avatar from "material-ui/svg-icons/action/account-box";

const LeftDrawer = props => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: "pointer",
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: "#804d00",
      paddingLeft: 40,
      height: 56
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: "15px 0 20px 15px",
        height: 20
      },
      icon: {
        float: "left",
        display: "block",
        marginRight: 15,
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)"
      },
      span: {
        paddingTop: 12,
        display: "block",
        color: "white",
        fontWeight: 300,
        textShadow: "1px 1px #444"
      }
    }
  };

  return (
    <Drawer docked={true} open={navDrawerOpen}>
      <div style={styles.logo}>MerchanCTA</div>
      <div style={styles.avatar.div}>
        <Avatar
          src="http://www.material-ui.com/images/uxceo-126.jpg"
          size={300}
          style={styles.avatar.icon}
        />
        <span style={styles.avatar.span}>{props.username}</span>
      </div>
      <div>
        {props.menus.map((menu, index) => (
          <MenuItem
            key={index}
            style={styles.menuItem}
            primaryText={menu.text}
            leftIcon={menu.icon}
            containerElement={<Link to={menu.link} />}
          />
        ))}
      </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string
};

export default LeftDrawer;
