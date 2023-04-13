export const getFocusableElement = (
  element: HTMLElement,
  shouldIncludeTabIndex: boolean,
  shouldOnlyIncludeVisible: boolean,
) => {
  const tabbableList: string[] = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'button:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[contenteditable=true]',
    ...(shouldIncludeTabIndex ? ['*[tabindex]'] : []),
  ];

  const visibleTabbableList = shouldOnlyIncludeVisible
    ? tabbableList.map(sel => `${sel}:visible`)
    : tabbableList;

  const tababbleSelector = visibleTabbableList.join(', ');

  return element.querySelector(tababbleSelector) as HTMLElement | undefined;
};

export type FocusOptions = {
  shouldFocusSelf?: boolean;
  shouldIncludeTabIndex?: boolean;
  shouldOnlyIncludeVisible?: boolean;
};

export const setFocus = (element: HTMLElement | undefined, options?: FocusOptions) => {
  const {
    shouldFocusSelf = true,
    shouldIncludeTabIndex = false,
    shouldOnlyIncludeVisible = false,
  } = options ?? ({} as FocusOptions);

  // If no element passed in, early return
  if (!element) {
    return;
  }

  // If focus self is set, focus the current element
  if (shouldFocusSelf) {
    element.focus();
    return;
  }

  // Else find focusable elements in element provided
  const focusElement = getFocusableElement(
    element,
    shouldIncludeTabIndex,
    shouldOnlyIncludeVisible,
  );

  // Focus any element found
  if (focusElement) {
    focusElement.focus();
    return;
  }

  // If not children were found, just focus self by default
  element.focus();
};
