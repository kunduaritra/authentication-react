import { useContext, useRef, useState } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const newPasswordInputRef = useRef();
  const authCntx = useContext(AuthContext);

  const changePasswordHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    setIsLoading(true);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB80meBIiMRQIbEliDq98NfZAp2XC22_9A";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCntx.token,
        password: enteredNewPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Change Password Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        {!isLoading && <button>Change Password</button>}
        {isLoading && <p>Setting Up New Password</p>}
      </div>
    </form>
  );
};

export default ProfileForm;
