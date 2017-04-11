var mockshit = {};
mockshit.sitemap = {
  view1: ['header', 'footer', 'content1'],
  view2: ['header', 'footer', 'content2'],
  view3: ['content3', 'footer'],
  view4: ['content4', 'header']
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
  mockshit.actions = document.querySelectorAll('body [data-click]');
  console.log('found ' + Object.keys(mockshit.actions).length + ' actions', mockshit.actions);
}

function bindActions() {
  for (var i = 0; i < mockshit.actions.length; i++) {
    mockshit.actions[i].addEventListener('click', function() {
      changeView(this.getAttribute('data-click'));
    })
  }
}

function manageComponent(component, state) {
  var ref = mockshit.components[component];
  switch(state) {
    case 'in':
      ref.classList.remove('out', 'hidden');
      ref.classList.add('in');
      break;
    case 'out':
      ref.classList.remove('in', 'hidden');
      ref.classList.add('out');
      break;
    case 'hidden':
      ref.classList.remove('in', 'out');
      ref.classList.add('hidden');
      break;
    case 'visible':
      ref.classList.remove('in', 'out', 'hidden');
      break;
  }
}

function updateComponents(currentComponents, newComponents) {
  Object.keys(mockshit.components).forEach(function(component) {
    var isCurrent = currentComponents ? currentComponents.indexOf(component) > -1 : false,
        isNew = newComponents.indexOf(component) > - 1;
    if (!isCurrent && isNew) {
      manageComponent(component, 'in');
    } else if (isCurrent && !isNew) {
      manageComponent(component, 'out');
    } else if (isCurrent && isNew) {
      manageComponent(component, 'visible')
    } else if (!isCurrent && !isNew) {
      manageComponent(component, 'hidden')
    }
  })
}

function changeView(newView) {
  var currentComponents = mockshit.sitemap[mockshit.currentView];
  var newComponents = mockshit.sitemap[newView];
  console.log('changing view: ' + mockshit.currentView + ' (' + currentComponents + ') > ' + newView + ' (' + newComponents + ')');
  updateComponents(currentComponents, newComponents);
  mockshit.currentView = newView;
}

// Boot
function bootMockshit() {
  console.log('booting mockshit!');
  // Get all component elements
  getComponents();
  // Get all element actions
  getActions();
  // Bind actions to elements
  bindActions();
  // Load first view in sitemap
  changeView(Object.keys(mockshit.sitemap)[0]);
}

document.addEventListener('DOMContentLoaded', bootMockshit, false);
