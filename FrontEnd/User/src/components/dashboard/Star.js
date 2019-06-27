import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Star extends React.Component {
    constructor(props) {
      super(props);
   
      this.state = {
        store_id: this.props.data.store_id,
        rating: this.props.data.rating
      };
    }
   
    onStarClick(nextValue, prevValue, name) {
      console.log(nextValue)
      console.log(this.props.data)

      const requestInfo = {
        method: "POST",
        body: JSON.stringify({
          store_id: this.props.data.store_id,
          rating: nextValue
        }),
        headers: new Headers({
          "Content-type": "application/json"
        })
      };

      console.log(requestInfo)
      console.log("https://ces22-backend.herokuapp.com/rate/" + localStorage.getItem('MerchanCTA-UserId'))

      fetch("https://ces22-backend.herokuapp.com/rate/" + localStorage.getItem('MerchanCTA-UserId'), requestInfo)
      .then(res => res.json())
      .then(json => {
        console.log(json)
      });

      this.setState({rating: nextValue});
    }
   
    render() {
      const { rating } = this.state;
      
      return (                
        <div>
          <StarRatingComponent 
            name="rate1" 
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </div>
      );
    }
  }

export default Star;
