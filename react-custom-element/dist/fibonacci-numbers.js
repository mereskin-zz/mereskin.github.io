/** @jsx React.DOM */
var FibonacciNumbers = React.createClass({displayName: 'FibonacciNumbers',
  render: function(){
    return React.DOM.p(null,  this.sequence(parseInt(this.props.limit, 10)).join(', ') );
  },

  sequence: function(limit) {
    if(limit <= 0) return [];
    if(limit == 1) return [1];

    var results = [1, 1];
    var max = Math.min(limit, 1001) - 1;
    for(var i=2;i<max;i++) {
      results[i] = results[i-2] + results[i-1];
    }
    return results;
  }
});

versal.registerReactComponent('fibonacci-numbers', FibonacciNumbers);
