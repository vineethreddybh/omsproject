const apiUrl = 'http://localhost:8080/orders';
const authUrl = 'http://localhost:8080/auth';

// SIGN UP
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const user = {
    username: document.getElementById('signupUsername').value,
    password: document.getElementById('signupPassword').value
  };

  fetch(`${authUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  .then(response => {
    if (response.ok) {
      alert("✅ Signup successful! You can now log in.");
      document.getElementById('signupForm').reset();
    } else {
      throw new Error("Signup failed");
    }
  })
  .catch(err => alert(err.message));
});

// SIGN IN
document.getElementById('signinForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const user = {
    username: document.getElementById('signinUsername').value,
    password: document.getElementById('signinPassword').value
  };

  fetch(`${authUrl}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(user)
  })
  .then(response => {
    if (response.ok) {
      alert("✅ Login successful!");
      document.getElementById('signinForm').reset();

      // Hide auth forms
      document.getElementById('signinSection').style.display = 'none';
      document.getElementById('signupSection').style.display = 'none';

      // Show orders and logout
      document.getElementById('orderSection').style.display = 'block';
      document.getElementById('logoutBtn').style.display = 'inline-block';

      // 👉 Show admin section only for "admin" user
        if (user.username === 'admin') {
          document.getElementById('adminSection').style.display = 'block';
          fetchAllOrders();
        }

    } else {
      throw new Error("Invalid credentials");
    }

  })
  .catch(err => alert(err.message));
});

// LOGOUT
document.getElementById('logoutBtn').addEventListener('click', function() {
  fetch(`${authUrl}/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  .then(() => {
    alert('🚪 Logged out');

    // Hide order section, show login/signup again
    document.getElementById('orderSection').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';

    document.getElementById('signinSection').style.display = 'block';
    document.getElementById('signupSection').style.display = 'block';

    // ❌ Hide and clear admin content
    document.getElementById('adminSection').style.display = 'none';

  });
});


//create order
document.getElementById('createOrderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const order = {
    productName: document.getElementById('productName').value,
    quantity: document.getElementById('quantity').value
    // Note: no customerId sent from frontend
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // important to send session cookies
    body: JSON.stringify(order)
  })
  .then(response => response.json())
  .then(data => {
    alert("📦 Order Created! ID: " + data.id);
    document.getElementById('createOrderForm').reset();
  })
  .catch(err => console.error('Error:', err));
});

// GET ORDER
function getOrder() {
  const orderId = document.getElementById('getOrderId').value;
  if (!orderId) return alert("Please enter an Order ID");

  fetch(`${apiUrl}/${orderId}`, {
    credentials: 'include'
  })
  .then(response => {
    if (!response.ok) throw new Error("Order not found");
    return response.json();
  })
  .then(data => {
    document.getElementById('orderResult').textContent = JSON.stringify(data, null, 2);
  })
  .catch(err => {
    document.getElementById('orderResult').textContent = err.message;
  });
}

// UPDATE STATUS
function updateOrderStatus() {
  const orderId = document.getElementById('updateOrderId').value;
  const newStatus = document.getElementById('newStatus').value;

  fetch(`${apiUrl}/${orderId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'text/plain' },
    credentials: 'include',
    body: newStatus
  })
  .then(response => {
    if (!response.ok) throw new Error("Update failed");
    return response.json();
  })
  .then(data => {
    alert("✅ Order status updated to: " + data.status);
  })
  .catch(err => alert(err.message));
}

function fetchAllOrders() {
  fetch(apiUrl, {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => {
    if (!response.ok) throw new Error("Not authorized or failed to fetch orders");
    return response.json();
  })
  .then(data => {
    const list = data.map(order => `ID: ${order.id}, Customer: ${order.customerId}, Product: ${order.productName}, Qty: ${order.quantity}, Status: ${order.status}`).join('\n');
    document.getElementById('allOrdersList').textContent = list || "No orders found.";
  })
  .catch(err => {
    document.getElementById('allOrdersList').textContent = err.message;
  });
}

function getOrdersByUser() {
    const username = document.getElementById("adminSearchUsername").value;
    fetch(`/orders/user/${username}`, {
        method: "GET",
        credentials: "include"
    })
    .then(res => {
        if (!res.ok) throw new Error("Access denied or user not found");
        return res.json();
    })
    .then(data => {
        if (data.length === 0) {
            document.getElementById("adminUserOrders").innerText = "No orders found for user.";
            return;
        }

        let output = "Orders for " + username + ":\n\n";
        data.forEach(order => {
           output += `🆔 Order ID: ${order.id}\n📦 Product: ${order.productName}\n📊 Quantity: ${order.quantity}\n📍 Status: ${order.status}\n--------------------------\n`;
        });

        document.getElementById("adminUserOrders").innerText = output;
    })
    .catch(err => {
        document.getElementById("adminUserOrders").innerText = "Error: " + err.message;
    });
}


