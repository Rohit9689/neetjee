import React, { Component } from 'react';
import YouTube from 'react-youtube';
class YoutubeVideosSection extends Component {
    videoonReady(event) {
        // access to player in all event handlers via event.target
        //event.target.pauseVideo();
       event.target.playVideoAt(5);
      }
    render() {
        const opts = {
          height: '390',
          width: '100%',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
        };
    
        return <YouTube videoId={this.props.videoid} opts={opts} onReady={this.videoonReady} />;
      }
    
      
}

export default YoutubeVideosSection
