import { useEffect, useState } from "react";

export const MAX_MD_QUERY = "(min-width: 768px)";

export const MAX_LG_QUERY = "(min-width: 1024px)";

export const useMediaQuery = (query: string) => {
  const [value, setValue] = useState<boolean>();

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches);
    };

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
};
