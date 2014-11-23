var pragma = '/** @jsx React.DOM */\r\n';
window.VersalGadgetClasses = {};

function parseImport(evt) {
  var template = evt.target.import.querySelector('template');

  var elementName = template.getAttribute('name');
  var source = pragma + 'window.VersalGadgetClasses["' + elementName + '"] = React.createClass({ render: function(){ return (' + template.innerHTML +') } });';

  var trustedReactCode = JSXTransformer.transform(source).code;
  // Instead of eval, it can be generated server-side
  eval(trustedReactCode);

  var prototype = Object.create(HTMLElement.prototype);

  prototype.createdCallback = function(){
    var ctor = window.VersalGadgetClasses[elementName](this.dataset);
    this._component = React.renderComponent(ctor, this);
  };

  prototype.attributeChangedCallback = function(name, old, current) {
    if(name.match(/^data\-/)) {
      this._component.setProps(this.dataset);
    }
  };

  document.registerElement(elementName, { prototype: prototype });
}

document.querySelector('link[rel=import]').addEventListener('load', parseImport);
