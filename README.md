# ember-tree-view

A simple tree view addon for ember

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

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

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
