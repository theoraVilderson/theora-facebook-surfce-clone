import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import icons from "../icons/Icons";
import "./Login.scss";
import PhoneNumberInput from "../components/PhoneNumberInput";
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
  signInWithPopup,
  GoogleAuthProvider,
} from "../firebase";
import { userActionTypes } from "../userReducer";
import Typography from "@mui/material/Typography";
import { parsePhoneNumber } from "react-phone-number-input";

const { FacebookIcon } = icons;

export function ErrorText({ error, children }) {
  return (
    error && (
      <h1 className="font-bold" style={{ color: "var(--danger)" }}>
        {children}
      </h1>
    )
  );
}
function Login() {
  // const [userPhone, setUserPhone] = useState("+989360932966");
  // const [userValidation, setUserValidation] = useState("123456");
  const { user, userId, setUserData } = useUserContextValue();
  const [userPhone, setUserPhone] = useState("+12345678901");
  const [userValidation, setUserValidation] = useState("123456");
  const [phoneStep, setPhoneStep] = useState(0);
  const [buttonText, setButtonText] = useState("Login With Phone");
  const shouldItValidatePhoneNumber = user && !user?.phoneNumber;
  const [shouldValidatePhoneNumber, setShouldValidatePhoneNumber] = useState(
    shouldItValidatePhoneNumber
  );
  const [userErrorNotExistsForPhone, setUserErrorNotExistsForPhone] =
    useState(false);
  const [userErrorExistsForPhone, setUserErrorExistsForPhone] = useState(false);
  const [errorInvalidVerifyCode, setErrorInvalidVerifyCode] = useState(false);
  const [lastPhone, setLastPhone] = useState("");
  const onLogOut = () => {
    if (auth.currentUser) {
      auth.signOut();
    }
    setUserData({ type: userActionTypes.LOGOUT_USER, data: {} });
    destroyCaptcha();
  };
  const cancelAccountHandler = () => {
    onLogOut();
  };

  const stepsActions = [
    () => {
      setButtonText("Login With Phone");
      setPhoneStep(0);
    },
    () => {
      setButtonText("Send Validation Message");
      setPhoneStep(1);
    },
    () => {
      userErrorNotExistsForPhone && setUserErrorNotExistsForPhone(false);
      userErrorExistsForPhone && setUserErrorExistsForPhone(false);
      setButtonText("Verify");
      setPhoneStep(2);
    },
  ];
  const goToStep = (phoneStep) => {
    stepsActions?.[phoneStep]?.();
  };
  const hidePhoneCountryOptions = () => {
    document
      .querySelector(".CountrySelectItem")
      ?.closest?.(".MuiModal-root")
      ?.querySelector?.(".MuiBackdrop-root")
      ?.click?.();
  };
  const onLoginRequest = () => {
    hidePhoneCountryOptions();
    const isValidCaptcha =
      window.recaptchaWidgetId != null && getCaptchaResponse();
    const isRendered = window.recaptchaWidgetId != null;
    if (isValidCaptcha) {
      if (shouldValidatePhoneNumber) {
        resetCaptcha();
        return;
      }
      return goToStep(1);
    }
    !isRendered &&
      (window.recaptchaVerifier = new RecaptchaVerifier(
        "verifier-container",
        {
          size: "normal",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            goToStep(1);

            console.log("done!!");
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            hidePhoneCountryOptions();
            goToStep(0);
            resetCaptcha();
          },
        },
        auth
      ));

    !isRendered &&
      window.recaptchaVerifier
        .render()
        .then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
        })
        .catch((e) => {
          onLoginRequest();
        });
  };
  const resetCaptcha = () => {
    window?.recaptchaVerifier?._reset?.();
  };
  const destroyCaptcha = () => {
    window?.recaptchaVerifier?.clear?.();
    window.recaptchaVerifier = window.recaptchaWidgetId = null;
  };
  const getCaptchaResponse = () => {
    return window?.recaptchaVerifier
      ?.getAssertedRecaptcha?.()
      ?.getResponse?.(window.recaptchaWidgetId ?? 0);
  };
  const validatePhone = () => {
    const parsedData = parsePhoneNumber(userPhone);
    if (!parsedData) {
      return {
        error: true,
        helperText: "Please make sure your phone number is valid",
      };
    } else if (!parsedData?.country) {
      return {
        error: true,
        helperText: "Your phone number is not exactly valid!",
      };
    }

    return {};
  };
  const validateVerification = () => {
    return {};
  };
  const onSendValidationRequest = async () => {
    const appVerifier = window.recaptchaVerifier;

    if (Object.keys(validatePhone()).length) return;
    if (userPhone === lastPhone) {
      return goToStep(2);
    }
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
            goToStep(2);
            setLastPhone(userPhone);
            // ...
          })
          .catch((error) => {
            // Error; SMS not sent
            // ...
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  const googleLoggedInHandler = async (data) => {
    const userToSend = {
      name: data.user.displayName,
      email: data.user.email,
      userImage: data.user.photoURL,
    };
    const user = await saveUser(userToSend, data.user.uid);
    if (!user.user.phoneNumber) setShouldValidatePhoneNumber(true);

    setUserData({ type: userActionTypes.INIT_USER, data: user });
  };
  const phoneLoggedInHandler = async (data) => {
    // it means user is not for validation
    let theUserId = userId;
    if (!theUserId) {
      const users = await getUsersWhere([["phoneNumber", "==", userPhone]]);
      if (users) {
        theUserId = users?.[0]?.userId;
      }
    }

    if (!theUserId)
      return alert("sorry can't verify because this number is not valid");
    const updatedUserData = await saveUser(
      {
        phoneNumber: userPhone,
      },
      theUserId
    );

    setUserData({ type: userActionTypes.INIT_USER, data: updatedUserData });
    errorInvalidVerifyCode && setErrorInvalidVerifyCode(false);
  };
  const onLoggedIn = async (type, data) => {
    switch (type) {
      case "google":
        await googleLoggedInHandler(data);
        destroyCaptcha();
        break;
      case "phone":
        await phoneLoggedInHandler(data);
        destroyCaptcha();
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
        setErrorInvalidVerifyCode(true);
      });
  };

  const stepHandler = (currentStep = phoneStep) => {
    console.log(currentStep);
    switch (currentStep) {
      case 0:
        onLoginRequest();
        break;
      case 1:
        onSendValidationRequest();
        break;
      case 2:
        compareValidation();
        break;
      default:
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
          .catch(() => {
            // user canceled teh login process
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    setShouldValidatePhoneNumber(shouldItValidatePhoneNumber);
  }, [shouldItValidatePhoneNumber]);
  useEffect(() => {
    if (
      shouldValidatePhoneNumber &&
      phoneStep === 0 &&
      window.recaptchaWidgetId == null
    ) {
      stepHandler(0);
    }
  }, [shouldValidatePhoneNumber]);
  // return (
  //   <div className="w-[300px] mx-auto p-2 ">

  //   </div>
  // );
  return (
    <div className="flex min-h-screen h-fit items-center justify-around flex-col ">
      <div className="flex flex-col items-center justify-around gap-3">
        <FacebookIcon className="w-32 h-32" />
        <h1
          className="font-bold text-3xl"
          style={{ color: "var(--primary-button-background)" }}
        >
          Face Book Meta
        </h1>
      </div>
      {shouldValidatePhoneNumber && (
        <Typography
          variant="h4"
          color="#782fd7"
          style={{ fontWeight: "bold", margin: "0.5rem 0" }}
        >
          Please Validate Your Phone
        </Typography>
      )}
      <div className="phoneSteps min-h-[160px] min-w-full xs:min-w-[350px]">
        <div
          className={`phoneStep ${
            phoneStep !== 0 ? "" : "steps__step--active"
          }`}
        >
          <div
            id="verifier-container"
            className="scale-50 xls:scale-75 xs:scale-100"
          ></div>
          {shouldValidatePhoneNumber && (
            <div>
              <Button
                className="min-w-32"
                component="span"
                color="error"
                onClick={cancelAccountHandler}
                id="sign-in-button"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
        <div
          className={`phoneStep ${
            phoneStep !== 1 ? "" : "steps__step--active"
          }`}
        >
          <ErrorText error={userErrorNotExistsForPhone}>
            Phone number is invalid or you haven't signed up before!
          </ErrorText>

          <ErrorText error={userErrorExistsForPhone}>
            Phone number is invalid or you haven't signed up before!
          </ErrorText>

          <div className="self-start justify-self-start flex justify-start w-50">
            <IconButton
              color="primary"
              onClick={() => {
                setButtonText("Login With Phone");
                setPhoneStep((e) => --e);
                console.log(shouldItValidatePhoneNumber, "herer");
                if (shouldItValidatePhoneNumber) stepHandler(0);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
          {/* <TextField
            id="phoneInput"
            label="Your Phone Number"
            className="w-full p-2"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            {...validatePhone()}
            
          /> */}
          <PhoneNumberInput
            id="phoneInput"
            label="Your Phone Number"
            className="w-full p-2"
            value={userPhone}
            onChange={(newPhoneNumber, parsedData) => {
              setUserPhone(newPhoneNumber);
            }}
            {...validatePhone()}
          />
        </div>
        <div
          className={`phoneStep ${
            phoneStep !== 2 ? "" : "steps__step--active"
          }`}
        >
          <div className="self-start justify-self-start flex justify-start w-50">
            <IconButton
              color="primary"
              onClick={() => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                setButtonText("Send Validation Message");
                setPhoneStep((e) => --e);
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
      {!(shouldValidatePhoneNumber && phoneStep === 0) && (
        <Button
          variant="contained"
          className="min-w-32"
          component="span"
          onClick={() => stepHandler()}
          id="sign-in-button"
        >
          {buttonText}
        </Button>
      )}
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
