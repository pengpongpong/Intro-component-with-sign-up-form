import React, { useRef, useState } from "react";

function Registration_component({ trialDay, subCost }) {
  const inputEmail = useRef();
  const inputFirstName = useRef();
  const inputLastName = useRef();
  const inputPassword = useRef();
  const emailErrorIcon = useRef();
  const emailErrorText = useRef();
  const FnErrorIcon = useRef();
  const FnErrorText = useRef();
  const LnErrorIcon = useRef();
  const LnErrorText = useRef();
  const PwErrorIcon = useRef();
  const PwErrorText = useRef();
  const response = useRef();

  const [message, setMessage] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();

    const validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const firstName = inputFirstName.current.value;
    const lastName = inputLastName.current.value;
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    if (firstName === "") {
      FnErrorIcon.current.style.display = "block";
      FnErrorText.current.style.display = "block";
    } else if (firstName !== "") {
      FnErrorIcon.current.style.display = "none";
      FnErrorText.current.style.display = "none";
    }
    if (lastName === "") {
      LnErrorIcon.current.style.display = "block";
      LnErrorText.current.style.display = "block";
    } else if (lastName !== "") {
      LnErrorIcon.current.style.display = "none";
      LnErrorText.current.style.display = "none";
    }
    if (!email.match(validEmail)) {
      emailErrorIcon.current.style.display = "block";
      emailErrorText.current.style.display = "block";
    } else if (email.match(validEmail)) {
      emailErrorIcon.current.style.display = "none";
      emailErrorText.current.style.display = "none";
    }
    if (password === "") {
      PwErrorIcon.current.style.display = "block";
      PwErrorText.current.style.display = "block";
    } else if (password !== "") {
      PwErrorIcon.current.style.display = "none";
      PwErrorText.current.style.display = "none";
    }
    if (
      firstName !== "" &&
      lastName !== "" &&
      email.match(validEmail) &&
      password !== ""
    ) {
      try {
        const res = await fetch("api/registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        });

        if (!res.ok) {
          console.error(res.status);
        } else {
          inputFirstName.current.value = "";
          inputLastName.current.value = "";
          inputEmail.current.value = "";
          inputPassword.current.value = "";
          
          const data = await res.json();
          setMessage(data.message);

          if (
            data.message ===
            "You have been successfully registered for a free trial"
          ) {
            response.current.style.color = "hsl(154, 59%, 51%)";
          } else {
            response.current.style.color = "hsl(0, 100%, 74%)";
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <section className="registration">
      <div className="trial">
        <p>
          <span>Try it free {trialDay} days</span> then ${subCost}/mo.
          thereafter
        </p>
      </div>
      <form className="registration_form" onSubmit={onSubmit}>
        <div className="input_holder">
          <input
            className="firstName"
            placeholder="First Name"
            type="text"
            ref={inputFirstName}
          />
          <img
            src="/images/icon-error.svg"
            aria-hidden="true"
            ref={FnErrorIcon}
          />
          <p className="error_message" ref={FnErrorText}>
            First Name cannot be empty
          </p>
        </div>
        <div className="input_holder">
          <input
            className="lastName"
            placeholder="Last Name"
            type="text"
            ref={inputLastName}
          />
          <img
            src="/images/icon-error.svg"
            aria-hidden="true"
            ref={LnErrorIcon}
          />
          <p className="error_message" ref={LnErrorText}>
            Last Name cannot be empty
          </p>
        </div>
        <div className="input_holder">
          <input
            className="email"
            placeholder="Email Address"
            // type="email"
            ref={inputEmail}
          />
          <img
            src="/images/icon-error.svg"
            aria-hidden="true"
            ref={emailErrorIcon}
          />
          <p className="error_message" ref={emailErrorText}>
            Looks like this is not an email
          </p>
        </div>
        <div className="input_holder">
          <input
            className="password"
            placeholder="Password"
            type="password"
            ref={inputPassword}
          />
          <img
            src="/images/icon-error.svg"
            aria-hidden="true"
            ref={PwErrorIcon}
          />
          <p className="error_message" ref={PwErrorText}>
            Password cannot be empty
          </p>
        </div>
        <button type="submit">Claim your free trial</button>
        <p className="response_message" ref={response}>
          {message}
        </p>
        <p className="terms">
          By clicking the button, you are agreeing to our{" "}
          <a href="" target="_blank" rel="noopener noreferrer">
            Terms and Services
          </a>
        </p>
      </form>
    </section>
  );
}

export default Registration_component;
