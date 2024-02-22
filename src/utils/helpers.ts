const formatTime = (totalSeconds: number) => {
  if (totalSeconds <= 60) {
    return `${totalSeconds} secs`;
  } else {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} min ${seconds} sec`;
  }
};

export { formatTime };
