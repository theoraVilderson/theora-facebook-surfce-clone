import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import icons from "../icons/Icons";
import "./Login.scss";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import getUsersWhere from "../getUsersWhere";
import saveUser from "../saveUser";
import { useUserContextValue } from "../userContext";
import {
  auth,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from "../firebase";
import { userActionTypes } from "../userReducer";

const { FacebookIcon } = icons;

function Login() {
  // const [userPhone, setUserPhone] = useState("+989360932966");
  // const [userValidation, setUserValidation] = useState("123456");
  const { user, userId, setUserData } = useUserContextValue();
  const [userPhone, setUserPhone] = useState("+12345678901");
  const [userValidation, setUserValidation] = useState("123456");
  const [step, setStep] = useState(0);
  const [buttonText, setButtonText] = useState("Login With Phone");
  const [shouldValidatePhoneNumber, setShouldValidatePhoneNumber] = useState(
    user && !user?.phoneNumber
  );
  const [userErrorNotExistsForPhone, setUserErrorNotExistsForPhone] =
    useState(false);
  const [userErrorExistsForPhone, setUserErrorExistsForPhone] = useState(false);
  const onLoginRequest = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "verifier-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          setButtonText("Send Validation Message");
          setStep((e) => ++e);

          console.log("done!!");
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          window.recaptchaVerifier.reset(window.recaptchaWidgetId);
          setButtonText("Login With Phone");
          setStep(0);
        },
      },
      auth
    );
    window.recaptchaWidgetId == null &&
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
  };
  const onSendValidationRequest = async () => {
    const appVerifier = window.recaptchaVerifier;

    const users = await getUsersWhere([["phoneNumber", "==", userPhone]]);

    if (!shouldValidatePhoneNumber && !users) {
      return setUserErrorNotExistsForPhone(true);
    } else if (shouldValidatePhoneNumber && users) {
      console.log({ users });
      return setUserErrorExistsForPhone(true);
    }
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPhoneNumber(auth, userPhone, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            setButtonText("Validation");
            setStep((e) => ++e);
            // ...
          })
          .catch((error) => {
            // Error; SMS not sent
            // ...
            alert(error);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const onLoggedIn = async (type, data) => {
    switch (type) {
      case "google":
        const userToSend = {
          name: data.user.displayName,
          email: data.user.email,
          userImage: data.user.photoURL,
        };
        const user = await saveUser(userToSend, data.user.uid);
        if (!user.user.phoneNumber) setShouldValidatePhoneNumber(true);

        setUserData({ type: userActionTypes.INIT_USER, data: user });
        break;
      case "phone":
        // TODO fix the userID problem
        const updatedUserData = await saveUser(
          {
            phoneNumber: userPhone,
          },
          userId
        );

        setUserData({ type: userActionTypes.INIT_USER, data: updatedUserData });
        break;
      default:
        break;
    }
  };
  const compareValidation = () => {
    if (userErrorNotExistsForPhone) setUserErrorNotExistsForPhone(false);
    if (userErrorExistsForPhone) setUserErrorExistsForPhone(false);
    window.confirmationResult
      .confirm(userValidation)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        onLoggedIn("phone", { user });
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert("Error Wrong Validation Code");
      });
  };

  const validatePhone = () => {
    return {};
  };
  const validateVerification = () => {
    return {};
  };

  const stepHandler = () => {
    switch (step) {
      case 0:
        onLoginRequest();
        break;
      case 1:
        onSendValidationRequest();
        break;
      case 2:
        compareValidation();
        break;
    }
  };
  const googleHandler = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            onLoggedIn("google", { user, token });

            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="flex h-screen items-center justify-around flex-col ">
      <div className="flex flex-col items-center justify-around gap-3">
        <FacebookIcon className="w-32 h-32" />
        <h1
          className="font-bold text-3xl"
          style={{ color: "var(--primary-button-background)" }}
        >
          Face Book Meta
        </h1>
      </div>
      {shouldValidatePhoneNumber && <h1> Please Validate Your Phone</h1>}
      <div className="steps">
        <div className={`step ${step !== 0 ? "" : "steps__step--active"}`}>
          <div id="verifier-container"></div>
        </div>
        <div className={`step ${step !== 1 ? "" : "steps__step--active"}`}>
          {userErrorNotExistsForPhone && (
            <h1 className="font-bold" style={{ color: "var(--danger)" }}>
              Phone number is invalid or you haven't signed up before!
            </h1>
          )}
          {userErrorExistsForPhone && (
            <h1 className="font-bold" style={{ color: "var(--danger)" }}>
              Please Use an other number this number is exists
            </h1>
          )}
          <div className="self-start justify-self-start flex justify-start w-50">
            <IconButton
              color="primary"
              onClick={() => {
                setButtonText("Login With Phone");
                setStep((e) => --e);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
          <TextField
            id="phoneInput"
            label="Your Phone Number"
            className="w-full p-2"
            value={userPhone}
            onInput={(e) => setUserPhone(e.target.value)}
            onBlur={(e) => setUserPhone(e.target.value)}
            {...validatePhone()}
          />
        </div>
        <div className={`step ${step !== 2 ? "" : "steps__step--active"}`}>
          <div className="self-start justify-self-start flex justify-start w-50">
            <IconButton
              color="primary"
              onClick={() => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                setButtonText("Send Validation Message");
                setStep((e) => --e);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>

          <TextField
            id="VerifyData"
            label="Validation Number"
            className="w-full p-2"
            value={userValidation}
            onInput={(e) => setUserValidation(e.target.value)}
            onBlur={(e) => setUserValidation(e.target.value)}
            {...validateVerification()}
          />
        </div>
      </div>
      <Button
        variant="contained"
        className="min-w-32"
        component="span"
        onClick={stepHandler}
        id="sign-in-button"
      >
        {buttonText}
      </Button>
      <br />
      {!shouldValidatePhoneNumber && (
        <Button
          variant="contained"
          className="min-w-32"
          component="span"
          color="error"
          onClick={googleHandler}
          id="sign-in-button"
        >
          Login With Google
        </Button>
      )}
    </div>
  );
}

export default Login;
