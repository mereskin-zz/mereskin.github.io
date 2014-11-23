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
    this._ctor = window.VersalGadgetClasses[elementName];
  };

  prototype.attachedCallback = function(){
    this._render();
  }

  prototype.attributeChangedCallback = function(name, old, current) {
    if(name.match(/^data\-/)) {
      this._render();
    }
  };

  prototype._render = function(){
    React.renderComponent(this._ctor(this.dataset), this);
  };

  document.registerElement(elementName, { prototype: prototype });
}

document.querySelector('link[rel=import]').addEventListener('load', parseImport);
