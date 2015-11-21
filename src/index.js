var React = require('react');
var ReactDOM = require('react-dom');
var removeClass = require('react-kit/removeClass');
var addClass = require('react-kit/addClass');
var hasClass = require('react-kit/hasClass');
var onEndTransition = require('react-kit/onEndTransition')
var throttle = require('react-kit/throttle');

var win = {width: window.innerWidth, height: window.innerHeight};
var docElem = window.document.documentElement;
function scrollY() { return window.pageYOffset || docElem.scrollTop; }

var Pull = React.createClass({
  // percentage (factor from 0 to 1) of the window width to take in consideration
  winfactor: 0.8,
  // the distance the container needs to be translated
  translateVal: null,
  // friction factor
  friction: 2.5,
  // distance in px needed to push down the menu in order to be able to action
  triggerDistance: 120,
  // position of the current selected share item
  posShareEl: null,
  // touch events: position of the initial touch (y-axis)
  firstTouchY: null,
  initialScroll: null,
  // deviceorientation || touchmove
  triggerOn: 'touchmove',
  componentDidMount: function() {
    this.actionElemsTotal = React.Children.count(this.props.children);
    this.actionEl = ReactDOM.findDOMNode(this.refs.action);
  },
  handleTouchStart: function(ev){
    var contentEl = ReactDOM.findDOMNode(this.refs.container);

    if( this.triggerOn === 'deviceorientation' ) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    var touchobj = ev.changedTouches[0];

    // save the initial position of the touch (y-axis)
    this.firstTouchY = parseInt(touchobj.clientY);
    this.initialScroll = scrollY();
    // get the current height of the action wrapper
    this.actionWrapH = ReactDOM.findDOMNode(this.refs.actionWrap).offsetHeight;

    // make sure the element doesnt have the transition class (added when the user releases the touch)
    removeClass(contentEl, 'container--reset');
  },
  handleTouchMove: function(ev){
    var contentEl = ReactDOM.findDOMNode(this.refs.container);

    var moving = function() {
      var touchobj = ev.changedTouches[0]; // reference first touch point for this event
      var touchY = parseInt(touchobj.clientY);
      var touchYDelta = touchY - this.firstTouchY;

      if ( scrollY() === 0 && touchYDelta > 0  ) {
        ev.preventDefault();
      }

      if ( this.initialScroll > 0 || scrollY() > 0 || scrollY() === 0 && touchYDelta < 0 ) {
        this.firstTouchY = touchY;
        return;
      }

      // change the selected action item when moving to the left/right.
      if( this.triggerOn === 'touchmove' ) {
        this.selectAction(ev);
      }

      // calculate the distance the container needs to be translated
      this.translateVal = -this.actionWrapH + touchYDelta/this.friction;

      // set the transform value for the container
      this.setContentTransform();

      // show the selected sharing item if touchYDelta > triggerDistance
      if( touchYDelta > this.triggerDistance ) {
        addClass(contentEl, 'container--active');
      } else {
        removeClass(contentEl, 'container--active');
      }
    }.bind(this);

    throttle(moving(), 60);
  },
  handleTouchEnd: function(ev){
    var contentEl = ReactDOM.findDOMNode(this.refs.container);

    if( this.triggerOn === 'deviceorientation' ) {
      window.removeEventListener('deviceorientation', this.handleOrientation);
    }

    if( hasClass(contentEl, 'container--active') ) {
      // expanding effect on selected item
      addClass(contentEl, 'container--action');

      onEndTransition(this.actionEl, function() {
        removeClass(contentEl, 'container--action');
        removeClass(contentEl, 'container--active');
      	// after expanding trigger the action functionality
      	this.doAction();
      }.bind(this));
    }

    // reset transform
    contentEl.style.webkitTransform = contentEl.style.transform = '';

    // move back the container (css transition)
    if( this.translateVal !== -this.actionWrapH ) {
      addClass(contentEl, 'container--reset');
      onEndTransition(contentEl, function() {
      	removeClass(contentEl, 'container--reset');
      });
    }
  },
  handleOrientation: function(ev) {
    var y = ev.gamma; // In degree in the range [-90,90]

    // To make computation easier we shift the range of x and y to [0,180]
    y += 90;

    // max degrees divided by the total number of action items
    var winslice = 180 * this.winfactor / this.actionElemsTotal,
    	margins = (180 - 180 * this.winfactor) / 2;

    // calculate which sharing item should be selected depending on the position of the touch/device
    this.posActionEl = Math.max(Math.min(Math.floor((y - margins) / this.winslice), this.actionElemsTotal-1), 0) + 1;
    this.actionEl.className = 'action action--select-' + this.posActionEl;
  },
  setContentTransform: function(){
    var contentEl = ReactDOM.findDOMNode(this.refs.container);

    contentEl.style.webkitTransform = contentEl.style.transform = 'translate3d(0, ' + this.translateVal + 'px, 0)';
  },
  selectAction: function(ev){
    // windows width divided by the total number of action items
    var winslice = win.width * this.winfactor / this.actionElemsTotal;
    var touchpos = parseInt(ev.changedTouches[0].clientX);
    var margins = (win.width - win.width * this.winfactor) / 2;

    // calculate which sharing item should be selected depending on the position of the mouse/touch
    this.posActionEl = Math.max(Math.min(Math.floor((touchpos - margins) / winslice), this.actionElemsTotal-1), 0) + 1;
    this.actionEl.className = 'action action--select-' + this.posActionEl;
  },
  doAction: function(){

    React.Children.toArray(this.props.children)
  },
  render: function(){
    return (
      <div ref="container"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        className="container">
        <div ref="actionWrap" className="action-wrap">
          <div ref="action" className="action">
            {this.props.children}
          </div>
        </div>
        <this.props.component />
      </div>
    )
  }
})

Pull.Action = React.createClass({
  render: function(){
    return React.Children.only(this.props.children)
  }
})

module.exports = Pull;
