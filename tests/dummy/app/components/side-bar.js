import Component from '@glimmer/component';

export default class SideBar extends Component {
  constructor() {
    super(...arguments);
    this.items = [
      { route: 'gettingstarted', text: 'Getting Started' },
      { route: 'simple', text: 'Simple' },
      { route: 'async', text: 'Async' },
      { route: 'hoveredactions', text: 'Hovered Actions' },
      { route: 'expand', text: 'Expand' },
      { route: 'multiselection', text: 'Multi Selection' },
      { route: 'noderefresh', text: 'Node Refresh' },
    ];
  }
}
