// Your express route or data receiver function
async function handleIncomingData(data) {
    console.log("Data received:", data);
    // Send push notification to your phone
    try {
        await fetch(process.env.NTFY_URL, {
            method: 'POST',
            body: `⚠️ New Data Received: ${JSON.stringify(data.message || data)}`,
            headers: {
                'Title': ' App Alert!',
                'Priority': 'high', // Makes it sound/vibrate even on low battery modes
                'Tags': 'warning,database' // Adds emojis automatically
            }
        });
        console.log("Notification sent successfully!");
    } catch (err) {
        console.error("Failed to send notification:", err);
    }
}

module.exports = handleIncomingData;