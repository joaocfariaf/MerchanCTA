import React, {PropTypes} from 'react';
import {grey800, transparent} from 'material-ui/styles/colors';
// import {typography} from 'material-ui/styles';

class HeaderLace extends React.Component {

  render() {
    const {title, Moldura} = this.props;

    const styles = {
      content: {
        textAlign: 'center',
        height: 180,
    },
    moldura: {
        height: 180,
        width: 200,
        margintop: 20,
        maxWidth: '100%'
    },
    text: {
        fontSize: 80,
        color: grey800,
      } 
    };

    return (

        
        <div style={styles.content}>
          <Moldura
            style={styles.moldura}
          />
          <span style={styles.text}>{title}</span>
        </div>
      );
  }
}

HeaderLace.propTypes = {
  title: PropTypes.string,
  Moldura: PropTypes.any
};

export default HeaderLace;



// const LeftDrawer = props => {
//     let { navDrawerOpen } = props;
  
//     const styles = {
//       logo: {
//         cursor: "pointer",
//         fontSize: 46,
//         color: typography.textDarkBlack,
//         lineHeight: `${spacing.desktopKeylineIncrement}px`,
//         fontWeight: typography.fontWeightLight,
//         backgroundColor: white,
//         paddingLeft: 40,
//         height: 56
        
//       },
//       menuItem: {
//         color: white,
//         fontSize: 14
//       },
//       avatar: {
//         div: {
//           padding: "15px 0 20px 15px",
//           backgroundImage: "url(" + require("../images/CEU.png") + ")",
//           height: 20
//         },
//         icon: {
//           float: "left",
//           display: "block",
//           marginRight: 15,
//           boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)"
//         },
//         span: {
//           paddingTop: 12,
//           display: "block",
//           color: "white",
//           fontWeight: 300,
//           textShadow: "1px 1px #444",
//           textAlign = 'center'
//         }
//       }
//     };
  
//     return (
//       <Drawer docked={true} open={navDrawerOpen}>
//         <div style={styles.logo}>MerchanCTA</div>
//         <div style={styles.avatar.div}>
//           <Avatar
//             src="http://www.material-ui.com/images/uxceo-126.jpg"
//             size={300}
//             style={styles.avatar.icon}
//           />
//           <span style={styles.avatar.span}>{props.username}</span>
//         </div>
//         <div>
//           {props.menus.map((menu, index) => (
//             <MenuItem
//               key={index}
//               style={styles.menuItem}
//               primaryText={menu.text}
//               leftIcon={menu.icon}
//               containerElement={<Link to={menu.link} />}
//             />
//           ))}
//         </div>
//       </Drawer>
//     );
//   };
  
//   LeftDrawer.propTypes = {
//     navDrawerOpen: PropTypes.bool,
//     menus: PropTypes.array,
//     username: PropTypes.string
//   };
  
//   export default LeftDrawer;
  
