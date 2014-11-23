/** @jsx React.DOM */
var FibonacciNumbers = React.createClass({
  render: function(){
    return <p>{ this.sequence(10).join(', ') }</p>;
  },

  sequence: function(max) {
    var results = [];
    for(var i=0;i<max;i++) {
      results.push(fibonacci(i));
    }
    return results;
  }
});

function fibonacci(n) {
  if(n <= 1) return 1;
  return fibonacci(n-1) + fibonacci(n-2);
}

versal.registerReactComponent('fibonacci-numbers', FibonacciNumbers);
