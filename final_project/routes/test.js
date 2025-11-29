
fetch('http://localhost:3001/api/booking', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
        name: "Ava Goodman",
        email: "avag@ymail.com",
        type: "suite",
        check_in: "2026-04-15",
        check_out:"2026-05-16"
    })
}).then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));