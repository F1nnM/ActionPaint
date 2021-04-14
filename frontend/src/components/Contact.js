import SectionFrame from "./SectionFrame";

import styles from "./Contact.module.css";

function Contact() {
  var state = {};

  return (
    <SectionFrame title="Contact Us">
      <form id="contact-form" onSubmit={handleSubmit.bind(this)} method="POST">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={state.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={state.mail}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control"
            rows="5"
            id="message"
            value={state.message}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </SectionFrame>
  );
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(event);

  alert(event);
}

export default Contact;
