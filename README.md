# ember-tree-view

A simple tree view addon for ember

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above

Installation
------------------------------------------------------------------------------

```
ember install member-tree-view
```


Usage
------------------------------------------------------------------------------

```
{{em-tree model=model selected=selected}}
```

Asynchronous loading tree node
```
{{em-tree model=model async=true icons-per-type=iconSet expand-depth=expandDepth children=(action "getChildren")}}
```
controller

```
actions: {
  // return promise for async
  getChildren(node) { 
    
  }
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
