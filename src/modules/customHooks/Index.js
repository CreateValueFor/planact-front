function useCustomHooks() {
  const categoryFormatter = (category) => {
    switch (category) {
      case "health":
        return "운동";
      case "diet":
        return "식단";
      default:
        return "일반";
    }
  };

  const snsFormatter = (sns) => {
    switch (sns) {
      case "instagram":
        return "인스타그램";
      case "naver":
        return "네이버블로그";
      default:
        return "일반";
    }
  };

  return {
    categoryFormatter,
    snsFormatter,
  };
}

export default useCustomHooks;
