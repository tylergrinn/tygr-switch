import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Logo';

export default {
  mount: (el: Element | DocumentFragment | null) => {
    ReactDOM.render(React.createElement(Logo), el);
  },
};
