import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {white, grey800} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';

class InfoBox extends React.Component {

  render() {
    const {color, title, Icon} = this.props;

    const styles = {
      content: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        textAlign: 'center',
        height: 60
      },
      text: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 30,
        fontWeight: typography.fontWeightLight,
        color: grey800,
      },
      iconSpan: {
        float: 'left',
        height: 90,
        width: 90,
        textAlign: 'center',
        backgroundColor: color
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: '100%'

      }
    };

    return (
      <Paper>
        <span style={styles.iconSpan}>
          <Icon color={white}
                style={styles.icon}
          />
        </span>

        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
        </div>  
      </Paper>
      );
  }
}

InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
};

export default InfoBox;