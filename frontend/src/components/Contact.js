import styles from "./Contact.module.scss";
import { useState } from "react";

function Contact(props) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const send = (e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_BACKEND + "public_api/message";
    const options = {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: mail,
        message: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
        alert(data);
      })
      .catch((err) => {
        console.warn(err);
        alert(err);
      });
  };

  return (
    <form id="contact-form" onSubmit={send} method="POST">
      <div className="form-group">
        <label htmlFor="name" className={styles.lorem}>
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Mail address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          required
          aria-describedby="emailHelp"
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          className="form-control"
          rows="5"
          required
          id="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Contact;
