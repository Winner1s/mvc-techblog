module.exports = {
  format_date: date => {
      if (!(date instanceof Date) || isNaN(date)) {
          return "Invalid Date";
      }

      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();

      return `${month}/${day}/${year}`;
  }
};
