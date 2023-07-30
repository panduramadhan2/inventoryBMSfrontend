// // Login.js

// import React, { useState } from "react";
// import { initializeApp } from "firebase/app";
// import "firebase/auth";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { firebaseConfig } from "../../firebase/firebaseConfig";

// const app = initializeApp(firebaseConfig);

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // Sign in with email and password using Firebase Auth service
//       const auth = getAuth();
//       await signInWithEmailAndPassword(auth, email, password);

//       // Handle successful login (e.g., redirect to the inventory list)
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//         {error && <p>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../../firebase/firebaseConfig";

const app = initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password using Firebase Auth service
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Handle successful login (e.g., redirect to the inventory list)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa", // Light gray background color
      }}
    >
      {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="../../../images/bimasakti.png"
          
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "50%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div> */}
      <div
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <i
            className="bi bi-person"
            style={{
              fontSize: "48px",
              color: "#007bff", // Blue primary color
              marginBottom: "10px",
            }}
          ></i>
        </div>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "#007bff", // Blue primary color
              cursor: "pointer",
            }}
          >
            Login
          </button>
          {error && (
            <p
              style={{
                color: "#dc3545", // Red color for error message
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
