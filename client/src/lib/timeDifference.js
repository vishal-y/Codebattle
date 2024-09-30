export default function calculateTimeDifference(startTime, endTime) {
    console.log("i am there")
    const startParts = startTime.split(":");
    const endParts = endTime.split(":");
    const startDate = new Date( 0, 0, 0,
      parseInt(startParts[0]),
      parseInt(startParts[1]),
      parseInt(startParts[2] || 0)
    );
    const endDate = new Date( 0, 0, 0,
      parseInt(endParts[0]),
      parseInt(endParts[1]),
      parseInt(endParts[2] || 0)
    );
    let diff = endDate - startDate;
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000; // Adding 24 hours
    }

    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }