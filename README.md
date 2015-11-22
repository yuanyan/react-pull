# PULL

![screenshot](https://raw.githubusercontent.com/yuanyan/react-pull/master/screenshot/screenshot.gif)

### Usage

```
var React = require('react');
var Pull = require('react-pull');
var Page = require('./Page');

var Demo = React.createClass({
  render: function() {
    return (
      <Pull component={Page}>
        <a href="#" style={styles.action}><i className="fa fa-plus"></i></a>
        <a href="#" style={styles.action}><i className="fa fa-refresh"></i></a>
        <a href="#" style={styles.action}><i className="fa fa-close"></i></a>
    </Pull>
    )
  }
})
```
