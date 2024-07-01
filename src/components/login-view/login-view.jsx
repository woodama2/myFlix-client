import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    

    fetch(`https://stark-eyrie-86274-1237014d10af.herokuapp.com/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token); // Update state in MainView
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      console.error("Login error: ", e);
      alert("Something went wrong");
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="3"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
        type={showPassword ? "text" : "password"}
        id="passwordInput"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength="8"
        />
        <Form.Check
        type="checkbox"
        label="Show Password"
        id="showPasswordCheck"
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
    



    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Username:
    //     <input
    //     type="text"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //     required
    //     />
    //   </label>
    //   <label>
    //     Password:
    //     <input
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     required
    //     />
    //   </label>
    //   <button type="submit">Submit</button>
    // </form>
  );
};