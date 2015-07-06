/********************************************************************
  UP NEXT PANEL
*********************************************************************/
/**
* The screen used while the video is playing.
*
* @class UpNextPanel
* @constructor
*/

var UpNextPanel = React.createClass({
  componentDidMount: function() {
    this.state.radius = this.getDOMNode().clientHeight * 0.4;
    this.state.width = 20;
  },
    
  handleDismissButtonClick: function(event) {
    console.log("Up next panel dismiss button clicked");
    event.stopPropagation(); // W3C
    event.cancelBubble = true; // IE
  },

  render: function() {
    var panelStyle = upNextPanelStyle.panelStyle;

    var contentImageContainerStyle = upNextPanelStyle.contentImageContainer;
    var contentImageStyle = upNextPanelStyle.contentImage;

    var playButtonClass = upNextPanelStyle.playButton.icon;
    var playButtonStyle = upNextPanelStyle.playButton.style;


    var contentMetadataContainerStyle = upNextPanelStyle.contentMetadataContainer;
    var upNextTitleStyle = upNextPanelStyle.upNextTitle;

    var clockContainerStyle = upNextPanelStyle.clockContainerStyle;
    var upNextTitleTextStyle = upNextPanelStyle.upNextTitleText;
    var contentTile = this.props.upNextInfo.upNextData.name;


    var contentDescriptionStyle = upNextPanelStyle.contentDescription;
    var contentDescription = "There is a lot going on in space. More than you can imagine. This movie for example. This movie happens in space. It’s pretty ama....";//this.props.upNextInfo.upNextData.description;
    
    var dismissButtonStyle = upNextPanelStyle.dismissButton;
    var dismissButtonTextStyle = upNextPanelStyle.dismissButtonText;

    document.getElementsByClassName("discovery_toaster")[0].style.display="none"; 
    return (
      <div style={panelStyle}>
        <div style={contentImageContainerStyle}>
          <img style={contentImageStyle} src={this.props.upNextInfo.upNextData.preview_image_url}></img>          
          <span className={playButtonClass} style={playButtonStyle} aria-hidden="true" onClick={this.handleClick}></span>
        </div>

        <div style={contentMetadataContainerStyle}>
          <div style={upNextTitleStyle}>
            <div style={upNextTitleTextStyle}>
              Up Next: {contentTile}
            </div>

            <CountDownClock {...this.props} 
            radius={16}
            width={38}/>
          </div>

          <div style={contentDescriptionStyle}>
            {contentDescription}
          </div>
        </div>

        <div style={dismissButtonStyle} onClick={this.handleDismissButtonClick}>
          <div style={dismissButtonTextStyle}>
           Dismiss
          </div>
        </div>

      </div>
    );
  }
});