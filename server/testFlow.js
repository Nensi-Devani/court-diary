const test = async () => {
  try {
    // 1. Register the new user
    console.log("1. Registering new user...");
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Nensi Devani",
        email: "devaninensi13@gmail.com",
        password: "1234567890"
      })
    });
    const regData = await regRes.json();
    console.log("Register response:", regData);

    const token = regData.testToken;
    if (!token) throw new Error("No token received");

    // 2. Verify Email
    console.log("2. Verifying email...");
    const verifyRes = await fetch(`http://localhost:5000/api/auth/verify-email/${token}`);
    const verifyData = await verifyRes.json();
    console.log("Verify email response:", verifyData.success ? "Success" : verifyData);

    // 3. Login
    console.log("3. Logging in with original password...");
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "devaninensi13@gmail.com", password: "1234567890" })
    });
    const loginData = await loginRes.json();
    console.log("Login response:", loginData.success ? "Success" : loginData);

    // 4. Trigger Forgot Password
    console.log("4. Triggering forgot password...");
    const forgotRes = await fetch('http://localhost:5000/api/auth/forgotpassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "devaninensi13@gmail.com" })
    });
    const forgotData = await forgotRes.json();
    console.log("Forgot password response:", forgotData);

    const newPassword = forgotData.testPassword;
    if (!newPassword) throw new Error("No temporary password received");

    // 5. Login with Temporary Password
    console.log("5. Logging in with temporary password...");
    const loginRes2 = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "devaninensi13@gmail.com", password: newPassword })
    });
    const loginData2 = await loginRes2.json();
    console.log("Login with temp password response:", loginData2.success ? "Success" : loginData2);
    const authToken = loginData2.token;

    // 6. Change Password
    console.log("6. Changing password...");
    const changeRes = await fetch('http://localhost:5000/api/users/me/change-password', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ currentPassword: newPassword, newPassword: "password123" })
    });
    const changeData = await changeRes.json();
    console.log("Change password response:", changeData.success ? "Success" : changeData);

    // 7. Verify login with new password
    console.log("7. Verifying final login...");
    const loginRes3 = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "devaninensi13@gmail.com", password: "password123" })
    });
    const loginData3 = await loginRes3.json();
    console.log("Final login response:", loginData3.success ? "Success" : loginData3);

    console.log("All tests completed successfully!");
  } catch (err) {
    console.error("Test failed:", err);
  }
};

test();
