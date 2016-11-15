// taken from https://github.com/pedronauck/react-simpletabs

var React = require('react'),
    ClassNames = require('classnames'),
    Utils = require('./utils'),
    Icon = require('./icon');

var Tabs = React.createClass({
  highlight: function(evt) {
    var color = this.props.skinConfig.controlBar.iconStyle.active.color ? 
                this.props.skinConfig.controlBar.iconStyle.active.color : 
                this.props.skinConfig.general.accentColor;
    var opacity = this.props.skinConfig.controlBar.iconStyle.active.opacity;
    Utils.highlight(evt.target, opacity, color);
  },

  removeHighlight: function(evt) {
    var color = this.props.skinConfig.controlBar.iconStyle.inactive.color;
    var opacity = this.props.skinConfig.controlBar.iconStyle.inactive.opacity;
    Utils.removeHighlight(evt.target, opacity, color);
  },

  getInitialState: function() {
    return {
      tabActive: this.props.tabActive
    };
  },

  componentDidMount: function() {
    var index = this.state.tabActive;
    var selectedPanel = this.refs['tab-panel'];
    var selectedMenu = this.refs[("tab-menu-" + index)];

    if (this.props.onMount) {
      this.props.onMount(index, selectedPanel, selectedMenu);
    }
  },

  componentWillReceiveProps: function(newProps) {
    if(newProps.tabActive && newProps.tabActive !== this.props.tabActive){
      this.setState({tabActive: newProps.tabActive});
    }
  },

  setActive: function(index, e) {
    e.preventDefault();

    var onAfterChange = this.props.onAfterChange;
    var onBeforeChange = this.props.onBeforeChange;
    var selectedPanel = this.refs['tab-panel'];
    var selectedTabMenu = this.refs[("tab-menu-" + index)];

    if (onBeforeChange) {
      var cancel = onBeforeChange(index, selectedPanel, selectedTabMenu);
      if(cancel === false){ return }
    }

    this.setState({ tabActive: index }, function()  {
      if (onAfterChange) {
        onAfterChange(index, selectedPanel, selectedTabMenu);
      }
    });
  },

  getMenuItems: function() {
    if (!this.props.children) {
      throw new Error('Tabs must contain at least one Tabs.Panel');
    }

    if (!Array.isArray(this.props.children)) {
      this.props.children = [this.props.children];
    }

    var menuItems = this.props.children
      .map(function(panel)  {return typeof panel === 'function' ? panel() : panel;})
      .filter(function(panel)  {return panel;})
      .map(function(panel, index)  {
        var ref = ("tab-menu-" + (index + 1));
        var title = panel.props.title;
        var activeMenuColor =  "solid ";
        activeMenuColor += this.props.skinConfig.controlBar.iconStyle.active.color ? 
                           this.props.skinConfig.controlBar.iconStyle.active.color : 
                           this.props.skinConfig.general.accentColor;

        var activeTabStyle = { borderBottom: activeMenuColor};

        var classes = ClassNames(
          'tabs-menu-item',
          this.state.tabActive === (index + 1) && 'is-active',
          'tabs-menu-item-' + index
        );

      if ( classes.search("is-active") === -1 ) {
        return (
          <li ref={ref} key={index} className={classes}>
            <a onClick={this.setActive.bind(this, index + 1)} onMouseOver={this.highlight} onMouseOut={this.removeHighlight}>
              {title}
            </a>
          </li>
        );
      } else {
          return (
          <li ref={ref} key={index} className={classes}>
            <a onClick={this.setActive.bind(this, index + 1)} style={activeTabStyle} onMouseOver={this.highlight} onMouseOut={this.removeHighlight}>
              {title}
            </a>
          </li>
        );
      }


      }.bind(this));


    return (
      <nav className='tabs-navigation' ref='tabsNavigation'>
        <ul className='tabs-menu'>{menuItems}</ul>
      </nav>
    );
  },

  getSelectedPanel: function() {
    var index = this.state.tabActive - 1;
    var panel = this.props.children[index];

    return (
      <article ref='tab-panel' className='tab-panel'>
        {panel}
      </article>
    );
  },

  handleLeftChevronClick: function(event) {
    event.preventDefault();
    this.refs.tabsNavigation.scrollLeft -= 30;
  },

  handleRightChevronClick: function(event) {
    event.preventDefault();
    this.refs.tabsNavigation.scrollLeft += 30;
  },

  render: function() {
    var className = ClassNames('tabs', this.props.className);

    var leftScrollButton = ClassNames({
      'oo-left-tab-button': true,
      'oo-left-tab-button-active': this.props.showScrollButtons
    });
    var rightScrollButton = ClassNames({
      'oo-right-tab-button': true,
      'oo-right-tab-button-active': this.props.showScrollButtons
    });

    return (
      <div className={className}>
        {this.getMenuItems()}
        {this.getSelectedPanel()}
        <a className={leftScrollButton} ref="leftChevron" onClick={this.handleLeftChevronClick}>
          <Icon
            {...this.props}
            icon="left"
          />
        </a>
        <a className={rightScrollButton} ref="rightChevron" onClick={this.handleRightChevronClick}>
          <Icon
            {...this.props}
            icon="right"
          />
        </a>
      </div>
    );
  }
});

Tabs.propTypes = {
  className: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  tabActive: React.PropTypes.number,
  onMount: React.PropTypes.func,
  onBeforeChange: React.PropTypes.func,
  onAfterChange: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.element
  ]).isRequired
};

Tabs.defaultProps = {
  tabActive: 1
};

module.exports = Tabs;


Tabs.Panel = React.createClass({
  displayName: 'Panel',
  propTypes: {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]).isRequired
  },

  render: function() {
    return (
      <span>{this.props.children}</span>
    );
  }
});
