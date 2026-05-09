const axios = require('axios');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYW5lZXNodGFkZXBhbGxpQGdtYWlsLmNvbSIsImV4cCI6MTc3ODMwNTMxNiwiaWF0IjoxNzc4MzA0NDE2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNWRhZWE5Y2ItZTczZS00NzU4LTk2ZDMtZDI4ZTJhYTRmNzkyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGFkZXBhbGxpIGhhbmVlc2giLCJzdWIiOiI5NTcwNzU0OC1jZDVlLTRhNWMtOGQzYy0yY2Q2N2E0MTIxOGYifSwiZW1haWwiOiJoYW5lZXNodGFkZXBhbGxpQGdtYWlsLmNvbSIsIm5hbWUiOiJ0YWRlcGFsbGkgaGFuZWVzaCIsInJvbGxObyI6IjIzNDgxYTYwYTciLCJhY2Nlc3NDb2RlIjoiZUpkQ3VDIiwiY2xpZW50SUQiOiI5NTcwNzU0OC1jZDVlLTRhNWMtOGQzYy0yY2Q2N2E0MTIxOGYiLCJjbGllbnRTZWNyZXQiOiJlRmJTeHRmelJId2RyR1loIn0.GVWAGC-n4_tHdb_uDPZpVTOlcujOV3Dor1AdUV5sLDM";

async function Log(stack, level, package_name, message) {
    try {
        const response = await axios.post(
            'http://4.224.186.213/evaluation-service/logs',
            {
                stack: stack,
                level: level,
                package: package_name,
                message: message
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Log created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Logging failed:', error.message);
    }
}

module.exports = { Log };
Log("frontend", "info", "middleware", "Logger initialized successfully");