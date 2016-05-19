'use strict';
document.getElementById('cart-code').addEventListener('submit', estimateTotal);

function estimateTotal(event) {
  event.preventDefault();

  var html             = parseInt(document.getElementById('txt-q-html').value) || 0,
      css              = parseInt(document.getElementById('txt-q-css').value) || 0,
      js               = parseInt(document.getElementById('txt-q-js').value) || 0,
      sql              = parseInt(document.getElementById('txt-q-sql').value) || 0,
      state            = document.getElementById('s-state').value;

  var methods = document.getElementById('cart-code').r_method,
      shippingMethod;

  for (var i = 0; i < methods.length; i++) {
    if (methods[i].checked == true) {
      shippingMethod = methods[i].value;
    }
  }

  var taxFactor = 1;
  if (state === 'CA') {
    taxFactor = 1.075;
  } else if (state === 'WA') {
    taxFactor = 1.065;
  }

  var shippingCostPer = 0;
  switch (shippingMethod) {
    case 'pickup' :
      shippingCostPer = 0;
      break;
    case 'usps' :
      shippingCostPer = 4;
      break;
    case 'ups' :
      shippingCostPer = 6;
      break;
  }

  var templates = html + css + js + sql,
      shippingCost = templates * shippingCostPer;

  var subTotal = ((html * 10) + (css * 20) + (js * 30) + (sql * 15)) * taxFactor;

  var estimate = "$" + (subTotal + shippingCost).toFixed(2);

  document.getElementById('txt-estimate').value = estimate;

  document.getElementById('results').innerHTML = 'Total template: ' + templates + '<br>';
  document.getElementById('results').innerHTML += 'Total shipping charge: $' + shippingCost.toFixed(2) + '<br>';
  document.getElementById('results').innerHTML += 'Total tax: ' + ((taxFactor - 1) * 100).toFixed(2) + '%';

}

document.addEventListener('DOMContentLoaded',
function() {
  document.getElementById('tab-group').className = 'ready';

  var tabs = document.getElementsByClassName('tab');

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', activateTab)
  }

  function activateTab(event) {
    var myID = this.id,
        bodyID = myID.replace('header', 'body');

        deactivateTabs();

    document.getElementById(myID).className = 'tab active';
    document.getElementById(bodyID).className = 'content active';
  }

  function deactivateTabs() {
    document.getElementById('about-header').className = 'tab';
    document.getElementById('beginnings-header').className = 'tab';
    document.getElementById('why-header').className = 'tab';
    document.getElementById('clients-header').className = 'tab';
    document.getElementById('about-body').className = 'content';
    document.getElementById('beginnings-body').className = 'content';
    document.getElementById('why-body').className = 'content';
    document.getElementById('clients-body').className = 'content';
    // var tabs = document.getElementsByClassName('tab');
    // for (var i = 0; 0 < tabs.length; i++) {
    //   tabs[i].className = 'tab';
    // }
    // var bodies = document.getElementsByClassName('content');
    // for (var i = 0; 0 < bodies.length; i++) {
    //   bodies[i].className = 'content';
    // }
  }

});
