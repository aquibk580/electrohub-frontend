interface FormatDate {
  (isoString: string): string;
}

const formatDate: FormatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formattedDate = formatDate("2025-02-14T15:49:28.815Z");
console.log(formattedDate); // Output: 14/02/2025
