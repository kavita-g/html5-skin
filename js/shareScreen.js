/********************************************************************
  SHARING SCREEN
*********************************************************************/
/**
* The screen used while the video is playing.
*
* @class PlayingScreen
* @constructor
*/
var ShareScreen = React.createClass({
  getInitialState: function() {
    return {
      controlBarVisible: true
    };
  },

  closeSharePanel: function() {
    this.props.controller.closeShareScreen();
  },

  componentDidMount: function () {
    this.setState({controlBarWidth: this.getDOMNode().clientWidth});
  },

  render: function() {
    //Fill in all the dynamic style values we need
    var controlBarHeight = 32;

    return (
      <div onMouseOver={this.showControlBar} onMouseOut={this.hideControlBar} onMouseUp={this.handlePlayerMouseUp} style={{height: "100%", width: "100%"}}>
        <SharePanel {...this.props}/>
        <ScrubberBar {...this.props} controlBarVisible={this.state.controlBarVisible}
          controlBarWidth={this.state.controlBarWidth} controlBarHeight={controlBarHeight} />
        <ControlBar {...this.props} controlBarVisible={this.state.controlBarVisible}
          controlBarWidth={this.state.controlBarWidth} controlBarHeight={controlBarHeight}
          playerState={this.state.playerState} />
        <div onClick={this.closeSharePanel} style={{position: "absolute", top:0, right: 0, height: "25px", width: "25px", backgroundColor: "#4389ff", color: "white", textAlign: "center", lineHeight: "25px"}}>X</div>
      </div>
    );
  }
});