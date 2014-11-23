function registerReactComponent(elementName, ReactComponent) {
  document.registerElement(elementName, { prototype: customElement(ReactComponent) });
  console.log('registered ', elementName, 'with', ReactComponent);
};

function customElement(ReactComponent) {
  var prototype = Object.create(HTMLElement.prototype);

  prototype.attachedCallback = function(){
    this._render();
  }

  prototype.attributeChangedCallback = function(name, old, current) {
    if(name.match(/^data\-/)) {
      this._render();
    }
  };

  prototype._render = function(){
    React.renderComponent(ReactComponent(this.dataset), this);
  };

  return prototype;
};

window.versal = { registerReactComponent: registerReactComponent };
