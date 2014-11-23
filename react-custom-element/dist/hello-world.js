/** @jsx React.DOM */

var HelloWorld = React.createClass({displayName: 'HelloWorld',
  render: function(){
    return React.DOM.h1(null, "Hello, ",  this.props.name );
  }
});

versal.registerReactComponent('hello-world', HelloWorld);
