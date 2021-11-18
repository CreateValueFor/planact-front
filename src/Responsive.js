import { useMediaQuery } from "react-responsive";

function useResponsive() {
  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:798px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:797px)",
  });
  return {
    isPc,
    isTablet,
    isMobile,
  };
}

export default useResponsive;
