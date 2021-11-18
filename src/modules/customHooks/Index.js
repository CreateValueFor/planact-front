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

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return {
    categoryFormatter,
    snsFormatter,
    formatDate,
  };
}

export default useCustomHooks;
