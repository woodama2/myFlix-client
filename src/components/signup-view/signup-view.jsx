import {useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch("https://stark-eyrie-86274-1237014d10af.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.href = "/";
      } else {
        alert("Signup failed");
      }
    });
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <label>
  //       Username:
  //       <input
  //       type="text"
  //       value={username}
  //       onChange={(e) => setUsername(e.target.value)}
  //       required
  //       minLength="3"
  //       />
  //     </label>
  //     <label>
  //       Password:
  //       <input
  //       type="password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //       required
  //       />
  //     </label>
  //     <label>
  //       Email:
  //       <input
  //       type="email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //       required
  //       />
  //     </label>
  //     <button type="submit">Submit</button>
  //   </form>
  // );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength={3}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
        type={showPassword ? "text" : "password"}
        id="passwordInput"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
        />
        <Form.Check
        type="checkbox"
        label="Show Password"
        id="showPasswordCheck"
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
        type="date"
        name="birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
};