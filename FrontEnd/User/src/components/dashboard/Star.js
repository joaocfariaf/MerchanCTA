import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Star extends React.Component {
    constructor() {
      super();
   
      this.state = {
        rating: 1
      };
    }
   
    onStarClick(nextValue) {
      console.log(nextValue)
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
