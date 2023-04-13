import {useRef} from 'react';
import {setFocus} from '@utils';

export const useScroll = <T extends HTMLElement>(
  shouldFocusSelfDefault: boolean = false,
  id?: string,
) => {
  const ref = useRef<T>(null);

  const executeScroll = (shouldFocusSelf: boolean = shouldFocusSelfDefault) => {
    if (!ref.current) {
      return;
    }
    if (id && !document.getElementById(id)) {
      return;
    }
    const element: T = id ? (document.getElementById(id) as T) : ref.current;

    element.scrollIntoView();
    setFocus(element, {shouldFocusSelf});
  };

  return {ref, executeScroll};
};
