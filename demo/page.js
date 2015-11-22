var React = require('react');
var ReactDOM = require('react-dom');

var Page = React.createClass({
  render: function() {
    return (
      <div style={{textAlign: 'center', fontSize: '3.5rem'}}>
        <p><i className="fa fa-long-arrow-down" /></p>
        <p><i className="fa fa-long-arrow-left"></i> <i className="fa fa-long-arrow-right"></i></p>
        <p style={{fontSize: '2rem'}}>PULL then MOVE</p>
			</div>
    )
  }
})

module.exports = Page;
