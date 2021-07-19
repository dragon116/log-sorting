// Function to find the insert position of new element in sorted array
module.exports = (array, element) => {
  let low = 0, high = array.length;
   while (low < high) {
      let mid = (low + high) >>> 1;
      if (array[mid].log.date < element.log.date) {
         low = mid + 1;
      } else {
         high = mid
      }
   };
   return low;
}