import React, { useState } from "react";
import { socialIcons } from "../Animation/animation";
import { motion } from "motion/react";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    fetch("https://formcarry.com/s/7QUL_hSw7b6", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          alert("We received your submission, thank you!");
        } else if (response.code === 422) {
          // Field validation failed
          setError(response.message);
        } else {
          // other error from formcarry
          setError(response.message);
        }
      })
      .catch((error) => {
        // request related error.
        setError(error.message ? error.message : error);
      });
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Your name"
          className="input w-full border-2 border-primary"
        />
      </div>

      <div>
        <label htmlFor="email">Your Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="john@doe.com"
          className="input w-full border-2 border-primary"
        />
      </div>

      <div>
        <label htmlFor="message">Your message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          placeholder="Enter your message..."
          className="textarea w-full border-2 border-primary"
        ></textarea>
      </div>

      <div>
        <motion.button
          variants={socialIcons()}
          initial="initial"
          whileTap="onClick"
          className="btn bg-primary hover:rounded-full text-white"
          type="submit"
        >
          Send
        </motion.button>
      </div>
    </form>
  );
};

export default ContactForm;
