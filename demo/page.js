var React = require('react');
var ReactDOM = require('react-dom');
var FaLongArrowDown = require('react-icons/lib/fa/long-arrow-down');
var FaLongArrowRight = require('react-icons/lib/fa/long-arrow-right');
var FaLongArrowLeft = require('react-icons/lib/fa/long-arrow-left');

var Page = React.createClass({
  render: function() {
    return (
      <div style={{textAlign: 'center'}}>
        <p><FaLongArrowDown style={styles.icon}/></p>
        <p><FaLongArrowLeft style={styles.icon}/> <FaLongArrowRight style={styles.icon}/></p>
        <p style={{fontSize: '2rem'}}>PULL then MOVE</p>
			</div>
    )
  }
})

var styles = {
  icon: {
    width: 100,
    height: 100,
    fill: '#222'
  }
}

module.exports = Page;
