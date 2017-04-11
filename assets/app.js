var mockshit = {};
mockshit.sitemap = {
  index: ['header', 'footer', 'view1'],
  intro: ['header', 'footer', 'view2'],
  contact: ['header', 'footer']
};
mockshit.allowed = {
  events: ['click', 'scroll'],
  actions: ['view', 'show', 'hide']
}
mockshit.currentView = null;
mockshit.components = {};
mockshit.actions = {};

// Helpers
function getComponentMap(components) {
  var map = {};
  for (var i = 0; i < components.length; i++) {
    map[components[i].id] = components[i];
  }
  return map;
}

function getComponents() {
  mockshit.components = getComponentMap(document.querySelectorAll('body [id]'));
  console.log('found ' + Object.keys(mockshit.components).length + ' components', mockshit.components);
}

function getActions() {
  mockshit.actions = document.querySelectorAll('body [data-action]');
  console.log('found ' + Object.keys(mockshit.actions).length + ' actions', mockshit.actions);
}

function updateComponents(currentComponents, newComponents) {
  Object.keys(mockshit.components).forEach(function(component) {
    //component = mockshit.components[component];
    var isCurrent = currentComponents && currentComponents.indexOf(component) > -1,
        isNew = newComponents.indexOf(component) > 1;
    if (isCurrent && isNew) {
      // log it
    }
  })
}

function changeView(currentView, newView) {
  var currentComponents = mockshit.sitemap[currentView];
  var newComponents = mockshit.sitemap[newView];
  console.log('changing view: ' + currentView + ' (' + currentComponents + ') > ' + newView + ' (' + newComponents + ')');
  updateComponents(currentComponents, newComponents);
}

// Boot
function bootMockshit() {
  console.log('booting mockshit!');
  // Get all component elements
  getComponents();
  // Get all element actions
  getActions();
  // Load first view in sitemap
  changeView(mockshit.currentView, Object.keys(mockshit.sitemap)[0]);
}

document.addEventListener('DOMContentLoaded', bootMockshit, false);
