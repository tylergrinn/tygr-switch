import { useState } from 'react';

export default function useTabs<Tab extends string>(
  ...tabs: Tab[]
): [any, (tab: Tab) => () => void, ...boolean[]] {
  const [currentTab, setTab] = useState(tabs[0]);

  /**
   * Creates a single key-value pair corresponding to the current tab in the form of:
   *
   * <div data-[currentTab]="true">
   *
   * If the current tab is 'login', the object will be:
   * {
   *   'data-login': true,
   * }
   *
   * Add these attributes to your tab container:
   *
   * <div class="tab-container" {...attributes}>
   *   ... tab content
   * </div>
   */
  const attributes = tabs.reduce((attrs, t) => {
    if (currentTab === t) {
      attrs[`data-${t}`] = true;
    }
    return attrs;
  }, {} as any);

  // Maps each tab name to a boolean value if it is the current tab
  const flags = tabs.map((t) => t === currentTab);

  return [
    attributes,
    // Using a higher order function to clean up syntax in jsx
    (t) => () => setTab(t),
    ...flags,
  ];
}
