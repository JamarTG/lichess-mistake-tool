const formatDate = (date: Date) => {
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export default formatDate;
