import { useState, useEffect } from "react";
import Router from "next/router";
import { loginUser } from "../../../lib/auth";
import { removeToken } from "../../../lib/token";
import Link from "next/link";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [point, setPoint] = useState(0);
  const [point_, setPoint_] = useState(0);

  useEffect(() => {
    // Remove the User's token which saved before.
    removeToken();
  }, []);

  useEffect(() => {
    let point_r = 0;
    if (username.length >= 6) {
      let arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
      arrayTest.forEach((item) => {
        if (item.test(username)) {
          point_r += 1;
        }
      });
    }
    setPoint(point_r);
  }, [username]);

  useEffect(() => {
    let point_r = 0;
    if (password.length >= 6) {
      let arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
      arrayTest.forEach((item) => {
        if (item.test(password)) {
          point_r += 1;
        }
      });
    }
    setPoint_(point_r);
  }, [password]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      // API call:
      const data = await loginUser(username, password);
      if (data.payload && data.payload.token) {
        if (rememberMe) {
          window.localStorage.setItem("token", data.payload.token);
        } else {
          window.sessionStorage.setItem("token", data.payload.token);
        }
        setTimeout(() => {
          Router.push("/dashboard");
        }, 1000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="form-main-content">
          <div>
            <div className="form-title">Reset Password</div>
            <div className="form-subtitle">
              Enter your new password and confirm it below to reset your account password.
            </div>
          </div>
          <div className="input-form-container">
            <label htmlFor="usernameInput" className="input-form-label">
              Enter new Password
            </label>
            <div class="input-icon-container">
              <img src="/images/icon.svg"></img>
              <input
                type="password"
                id="passwordInput"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="New Password"
              />
              <div className="input-security">
                <span className={`${point >= 1 ? "minus" : "minus active"}`}></span>
                <span className={`${point >= 2 ? "minus" : "minus active"}`}></span>
                <span className={`${point >= 3 ? "minus" : "minus active"}`}></span>
                <span>strong</span>
              </div>
            </div>
          </div>
          <div className="input-form-container">
            <label htmlFor="passwordInput" className="input-form-label">
              Confirm Password
            </label>
            <div class="input-icon-container">
              <img src="/images/icon.svg"></img>
              <input
                type="password"
                id="passwordInput"
                placeholder="Confirm Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-security">
                <span className={`${point_ >= 1 ? "minus" : "minus active"}`}></span>
                <span className={`${point_ >= 2 ? "minus" : "minus active"}`}></span>
                <span className={`${point_ >= 3 ? "minus" : "minus active"}`}></span>
                <span>strong</span>
              </div>
            </div>
          </div>
          <div className="action-form">
            <button type="submit" className="confirm-btn" disabled={isLoading}>
              Confirm
            </button>
            <div className="cancel-btn">
              <Link href="/" className="cancel-btn">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
