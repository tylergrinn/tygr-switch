import { useState } from 'react';

interface SwitchOptions {
  name: string;
  initialIndex?: number;
}

/**
 *
 * @param {Object} options Required options object
 * @param {string} options.name Required. The base name of the switch.
 * Use the data-[name] attribute to conditionally show or hide content
 * @param {number} options.initialIndex index of the initial state
 * @param {...string} states Specify all the different states this switch can be in
 */
export default function useSwitch<State extends string>(
  options: SwitchOptions,
  ...states: State[]
): [any, (s: State) => () => void, ...boolean[]] {
  const { name } = options;
  const initialIndex = options.initialIndex || 0;
  const [currentState, setState] = useState(states[initialIndex]);

  return [
    // Attributes object: spread over the rooat element of your switch container
    { [`data-${name}-state`]: currentState },
    // Using a higher order function to clean up syntax in jsx
    (s) => () => setState(s),
    // Maps each tab name to a boolean value if it is the current tab
    ...states.map((s) => s === currentState),
  ];
}
