function eventFunction() {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return {
    stopPropagation,
  };
}

export default eventFunction;
