var React = require('react');
var ReactDOM = require('react-dom');
var Pull = require('../src/index');
var Page = require('./Page');

var Demo = React.createClass({
  render: function() {

    return (
      <Pull component={Page}>
        <Pull.Action onSelect={null}>
          <a href="#" className="action__item"><i className="fa fa-facebook"></i></a>
        </Pull.Action>
        <Pull.Action>
          <a href="#" className="action__item"><i className="fa fa-twitter"></i></a>
        </Pull.Action>
        <Pull.Action>
          <a href="#" className="action__item"><i className="fa fa-google-plus"></i></a>
        </Pull.Action>
      </Pull>
    )
  }
})

ReactDOM.render(<Demo />, document.getElementById('demo'))
