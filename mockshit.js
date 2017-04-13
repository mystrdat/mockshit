// Scope brutality
var mockshit = window.mockshit = {
  views: window.views || {
    view1: ['title1', 'content1', 'footer'],
    view2: ['title2', 'content2', 'footer'],
    view3: ['title3', 'content3', 'notice']
  },
  allowed: {
    events: ['click', 'scroll'],
    actions: ['view', 'show', 'hide']
  },
  currentView: null,
  components: {},
  actions: {},

  // Helpers
  addEventListenerOnce: function (target, type, listener) {
    target.addEventListener(type, function fn(event) {
      target.removeEventListener(type, fn);
      listener(event);
    });
  },
  getComponentMap: function (components) {
    var map = {};
    for (var i = 0; i < components.length; i++) {
      map[components[i].id] = components[i];
    }
    return map;
  },
  getComponents: function () {
    this.components = this.getComponentMap(document.querySelectorAll('body [id]'));
    console.log('found ' + Object.keys(this.components).length + ' components', this.components);
  },
  getActions: function () {
    this.actions = document.querySelectorAll('body [data-click]');
    console.log('found ' + Object.keys(this.actions).length + ' actions', this.actions);
  },
  bindActions: function () {
    var _self = this;
    for (var i = 0; i < this.actions.length; i++) {
      this.actions[i].addEventListener('click', function () {
        _self.changeView(this.getAttribute('data-click'));
      })
    }
  },
  manageComponent: function (component, state) {
    var _self = this,
        ref = this.components[component];
    switch(state) {
      case 'in':
        ref.classList.remove('out', 'hidden');
        ref.classList.add('in');
        break;
      case 'out':
        ref.classList.remove('in', 'hidden');
        ref.classList.add('out');
        ['animationend', 'transitionend'].forEach(function (e) {
          _self.addEventListenerOnce(ref, e, function() {
            ref.classList.remove('out');
            ref.classList.add('hidden');
          });
        });
        break;
      case 'hidden':
        ref.classList.remove('in', 'out');
        ref.classList.add('hidden');
        break;
      case 'visible':
        ref.classList.remove('in', 'out', 'hidden');
        break;
    }
  },
  updateComponents: function(currentComponents, newComponents) {
    var _self = this;
    Object.keys(this.components).forEach(function (component) {
      var isCurrent = currentComponents ? currentComponents.indexOf(component) > -1 : false,
          isNew = newComponents.indexOf(component) > - 1;
      if (!isCurrent && isNew) {
        _self.manageComponent(component, 'in');
      } else if (isCurrent && !isNew) {
        _self.manageComponent(component, 'out');
      } else if (isCurrent && isNew) {
        _self.manageComponent(component, 'visible')
      } else if (!isCurrent && !isNew) {
        _self.manageComponent(component, 'hidden')
      }
    })
  },
  changeView: function (newView) {
    var currentComponents = this.views[this.currentView];
    var newComponents = this.views[newView];
    console.info('changing view: ' + this.currentView + ' (' + currentComponents + ') > ' + newView + ' (' + newComponents + ')');
    this.updateComponents(currentComponents, newComponents);
    this.currentView = newView;
  },
  bootMockshit: function () {
    console.info('booting mockshit!');
    // Get all component elements
    this.getComponents();
    // Get all element actions
    this.getActions();
    // Bind actions to elements
    this.bindActions();
    // Load first view
    this.changeView(Object.keys(this.views)[0]);
  }
}

document.addEventListener('DOMContentLoaded', mockshit.bootMockshit.bind(mockshit), false);
