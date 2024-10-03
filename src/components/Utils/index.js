export const formattedDate=function formatDate(dateString) {
    // Parse the date string into a Date object
    var dateObj = new Date(dateString);

    // Extract year, month, and day
    var year = dateObj.getFullYear().toString().substr(-2); // Get last two digits of the year
    var month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    var day = dateObj.getDate().toString().padStart(2, '0');

    // Format the date
    var formattedDate = month + '-' + day + '-' + year;

    return formattedDate;
} 
