import React, {PropTypes} from 'react';
import {grey800, transparent} from 'material-ui/styles/colors';
// import {typography} from 'material-ui/styles';

class HeaderLace extends React.Component {

  render() {
    const {title, Icon = "url(" + require("../../images/moldura.png") + ")"} = this.props;

    const styles = {
      content: {
        padding: '5px 10px',
        textAlign: 'center',
        height: 80
      },
      text: {
        fontSize: 30,
        fontWeight: typography.fontWeightLight,
        color: grey800,
      },
      iconSpan: {
        float: 'left',
        height: 90,
        width: 90,
        textAlign: 'center',
        backgroundColor: transparent
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: '100%'

      }
    };

    return (
      <div>
        <span style={styles.iconSpan}>
          <Icon color={white}
                style={styles.icon}
          />
        </span>

        < div style={styles.content}>
          <span style={styles.text}>{title}</span>
        </div>  
        </div>
      )
  }
}

  // render() {
  //   const {title} = this.props;

  //   const styles = {
  //     content: {
  //       textAlign: 'center',
  //       backgroundImage: "url(" + require("../../images/moldura.png") + ")"
  //   },
  //   text: {
  //       fontSize: 80,
  //       color: grey800,
  //     } 
  //   };

  //   return (

  //       <div style={styles.content}>
  //         <span style={styles.text}>{title}</span>
  //       </div>
  //     );
  // }

class InfoBox extends React.Component {

 

  HeaderLace.propTypes = {
    Icon: PropTypes.any, // eslint-disable-line
    title: PropTypes.string,
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
  
