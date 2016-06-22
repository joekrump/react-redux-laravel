import React from 'react';

// Dimension prop type
const dimensionPropType = React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]);

const sizePresets = {
  basic: {
    width: 200,
    height: 25,
  },
  detail: {
    width: 300,
    height: 56,
  },
};

const SpotifyUserDetails = React.createClass({

  propTypes: {

    // Spotify User ID
    userId: React.PropTypes.string.isRequired,

    // Size as either a preset or as custom dimensions
    size: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['basic', 'detail']),
      React.PropTypes.shape({
        width: dimensionPropType,
        height: dimensionPropType,
      }),
    ]),

    // View
    view: React.PropTypes.oneOf(['basic', 'detail']),

    // Theme
    theme: React.PropTypes.oneOf(['black', 'white']),
  },

  getDefaultProps() {
    return {
      size: 'large',
      theme: 'black',
      showCount: 0
    };
  },
  render(){

    const { userId, view, theme, showCount } = this.props;
    let { size } = this.props;

    if (typeof size === 'string') {
      size = sizePresets[size];
    }

    return (
      <iframe src={`https://embed.spotify.com/follow/1/?uri=spotify:user:${userId}&size=${view}&theme=${theme}&show-count=${showCount}`} 
        width={size.width} 
        height={size.height}
        scrolling="no" 
        frameBorder="0" 
        style={{border:'none', overflow: 'hidden'}} 
        allowTransparency="true">
      </iframe>
    );
  }
});

export default SpotifyUserDetails;
