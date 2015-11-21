var React = require('react');
var ReactDOM = require('react-dom');

var Page = React.createClass({
  render: function() {
    return (
      <div>
				<ul className="info info--mobile">
					<li>Pull down to reveal the sharing buttons.</li>
					<li><strong>Move or Tilt to change the selection.</strong></li>
					<li>Push back up to cancel.</li>
				</ul>
				<p className="info info--desktop">
					<i className="fa fa-mobile"></i> Please use a mobile phone in order to play with the effect.
				</p>
			</div>
    )
  }
})

module.exports = Page;
