var React = require('react');
var ReactDOM = require('react-dom');
var Pull = require('../src/index');
var Page = require('./Page');

var Demo = React.createClass({
  onPullStart: function() {

  },
  onPullMove: function() {

  },
  onPullEnd: function(ev) {
    console.log(ev)
  },
  render: function() {
    return (
      <Pull component={Page} onPullStart={this.onPullStart} onPullMove={this.onPullMove} onPullEnd={this.onPullEnd} onPullCancel={null}>
        <a href="#" style={styles.action}><i className="fa fa-plus"></i></a>
        <a href="#" style={styles.action}><i className="fa fa-refresh"></i></a>
        <a href="#" style={styles.action}><i className="fa fa-close"></i></a>
    </Pull>
    )
  }
})

var styles = {
  action: {
  	position: 'relative',
  	textAlign: 'center',
  	WebkitFlex: '1 1 auto',
  	flex: '1 1 auto',
  	lineHeight: '60px',
  	fontSize: '1.5rem',
  	width: 60,
  	height: 60,
  	zIndex: 100,
  	color: '#757575'
  }
}

ReactDOM.render(<Demo />, document.getElementById('demo'))
