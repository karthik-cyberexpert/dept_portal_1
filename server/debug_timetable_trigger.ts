import jwt from 'jsonwebtoken';

const testPost = async () => {
    try {
        const secret = 'fallback_secret_key_123'; // Matches auth.middleware.ts fallback
        const token = jwt.sign({ id: 1, email: 'admin@admin.com', role: 'admin' }, secret);

        console.log('Generated Self-Signed Token');

        const payload = {
            batch_id: 1, 
            section_id: 1,
            day: 'Monday',
            period: 1,
            subject_code: 'SUB101', 
            faculty_id: 1,
            room: '101',
            type: 'theory'
        };

        const res = await fetch('http://localhost:3007/api/academic/timetable', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(payload)
        });

        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Error Message:', data.message);
        console.log('Detailed Error:', data.error);

    } catch (e) {
        console.error(e);
    }
};

testPost();
