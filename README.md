# @gorner/ember-tree-view

A slightly-improved simple tree view addon for Ember, forked from [ember-tree-view](https://github.com/systembugtj/ember-tree-view)

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v12 or above

Installation
------------------------------------------------------------------------------

```
ember install @gorner/ember-tree-view
```


Usage
------------------------------------------------------------------------------

```
<EmTree @model={{@model}} @selected={{@selected}} />
```

Asynchronous loading tree node
```
<EmTree @model={{this.model}} @async={{true}} @icons-per-type={{@iconSet}} @expand-depth={{@expandDepth}} @children={{this.getChildren}} />
```
controller

```
@action
getChildren(node) {

}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
