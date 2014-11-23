/** @jsx React.DOM */

var HelloWorld = React.createClass({
  render: function(){
    return <h1>Hello, { this.props.name }</h1>;
  }
});

versal.registerReactComponent('hello-world', HelloWorld);
