window.addEventListener('DOMContentLoaded', function(){
  var observer = new MutationObserver(function(mx){
    mx.forEach(function(record){
      if(record.target.hasAttribute('versal-id')) {
        var versalId = record.target.getAttribute('versal-id');
        localStorage[versalId] = JSON.stringify(attributesConfig(record.target));
      }
    })
  });

  observer.observe(document.body, { attributes: true, subtree: true });

  [].forEach.call(document.querySelectorAll('[versal-id]'), function(el){
    var versalId = el.getAttribute('versal-id');
    var configJson = localStorage[versalId];
    if(configJson){
      configAttributes(el, JSON.parse(configJson));
    }
  });
});

function attributesConfig(el){
  var config = {};
  [].forEach.call(el.attributes, function(attr){
    if(attr.name.match(/^versal\-/)) return;

    config[attr.name] = attr.value
  })
  return config;
}

function configAttributes(el, attrs) {
  Object.keys(attrs).forEach(function(key){
    el.setAttribute(key, attrs[key]);
  });
}
