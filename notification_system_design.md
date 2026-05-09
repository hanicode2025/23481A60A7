# Notification System Design

## Stage 1 - Priority Inbox

### Approach
The Priority Inbox displays the top 'n' most important unread notifications based on a combination of weight and recency.

### Priority Weights
- Placement: 3 (highest)
- Result: 2
- Event: 1 (lowest)

### Sorting Logic
Notifications are first sorted by priority weight (Placement > Result > Event). If two notifications have the same priority, the more recent one appears first based on Timestamp.

### Implementation
- Fetched notifications from the AffordMed Notifications API
- Sorted using a comparator function combining weight and timestamp
- Top N notifications displayed in Priority Inbox (user can adjust N)
- Remaining notifications shown in All Notifications section

### Maintaining Top 10 with New Incoming Notifications
Since new notifications keep coming in, the sort runs on every fetch. To handle this efficiently in production, a priority queue (max-heap) data structure would maintain the top 10 in O(log n) time per insertion without re-sorting the entire list.

### Tech Stack
- Frontend: React
- Backend Proxy: Express (Node.js)
- Logging: Custom logging middleware hitting AffordMed Log API
