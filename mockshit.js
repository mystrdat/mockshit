// Scope brutality
var mockshit = window.mockshit = {};
mockshit.views = window.views || {
  view1: ['title1', 'content1', 'footer'],
  view2: ['title2', 'content2', 'footer'],
  view3: ['title3', 'content3', 'notice']
};
mockshit.allowed = {
  events: ['click', 'scroll'],
  actions: ['view', 'show', 'hide']
}
mockshit.currentView = null;
mockshit.components = {};
mockshit.actions = {};

// Helpers
mockshit.getComponentMap = function (components) {
  var map = {};
  for (var i = 0; i < components.length; i++) {
    map[components[i].id] = components[i];
  }
  return map;
}

mockshit.getComponents = function () {
  mockshit.components = mockshit.getComponentMap(document.querySelectorAll('body [id]'));
  console.log('found ' + Object.keys(mockshit.components).length + ' components', mockshit.components);
}

mockshit.getActions = function () {
  mockshit.actions = document.querySelectorAll('body [data-click]');
  console.log('found ' + Object.keys(mockshit.actions).length + ' actions', mockshit.actions);
}

mockshit.bindActions = function () {
  for (var i = 0; i < mockshit.actions.length; i++) {
    mockshit.actions[i].addEventListener('click', function () {
      mockshit.changeView(this.getAttribute('data-click'));
    })
  }
}

mockshit.manageComponent = function (component, state) {
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

mockshit.updateComponents = function(currentComponents, newComponents) {
  Object.keys(mockshit.components).forEach(function (component) {
    var isCurrent = currentComponents ? currentComponents.indexOf(component) > -1 : false,
        isNew = newComponents.indexOf(component) > - 1;
    if (!isCurrent && isNew) {
      mockshit.manageComponent(component, 'in');
    } else if (isCurrent && !isNew) {
      mockshit.manageComponent(component, 'out');
    } else if (isCurrent && isNew) {
      mockshit.manageComponent(component, 'visible')
    } else if (!isCurrent && !isNew) {
      mockshit.manageComponent(component, 'hidden')
    }
  })
}

mockshit.changeView = function (newView) {
  var currentComponents = mockshit.views[mockshit.currentView];
  var newComponents = mockshit.views[newView];
  console.log('changing view: ' + mockshit.currentView + ' (' + currentComponents + ') > ' + newView + ' (' + newComponents + ')');
  mockshit.updateComponents(currentComponents, newComponents);
  mockshit.currentView = newView;
}

// Boot
mockshit.bootMockshit = function () {
  console.log('booting mockshit!');
  // Get all component elements
  mockshit.getComponents();
  // Get all element actions
  mockshit.getActions();
  // Bind actions to elements
  mockshit.bindActions();
  // Load first view
  mockshit.changeView(Object.keys(mockshit.views)[0]);
}

document.addEventListener('DOMContentLoaded', mockshit.bootMockshit, false);
