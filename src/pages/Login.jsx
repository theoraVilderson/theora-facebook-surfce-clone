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
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
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

import ThemeToggle, { useThemeHandler } from "../components/ThemeToggle";

const { FacebookIcon } = icons;

export function ErrorText({ error, children }) {
  return (
    error && (
      <h1 className="font-bold p-3" style={{ color: "var(--danger)" }}>
        {children}
      </h1>
    )
  );
}
function Login() {
  // const [userPhone, setUserPhone] = useState("+989360932966");
  // const [userValidation, setUserValidation] = useState("123456");
  const { user, userId, setUserData } = useUserContextValue();
  const [userPhone, setUserPhone] = useState("");
  const [userValidation, setUserValidation] = useState("");
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
  const [theme, onThemeChange] = useThemeHandler();
  const [captchaLoader, setCaptchaLoader] = useState(false);
  const [goggleBtnLoginLoader, setGoggleBtnLoginLoader] = useState(false);
  const [phoneLoginBtnLoader, setPhoneLoginBtnLoader] = useState(false);
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
      window.phoneStep = 0;
      setLastPhone("");
    },
    () => {
      userErrorNotExistsForPhone && setUserErrorNotExistsForPhone(false);
      userErrorExistsForPhone && setUserErrorExistsForPhone(false);
      setButtonText("Send Validation Message");
      setPhoneStep(1);
      window.phoneStep = 1;
    },
    () => {
      errorInvalidVerifyCode && setErrorInvalidVerifyCode(false);
      userErrorNotExistsForPhone && setUserErrorNotExistsForPhone(false);
      userErrorExistsForPhone && setUserErrorExistsForPhone(false);
      setButtonText("Verify");
      setPhoneStep(2);
      window.phoneStep = 2;
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
    console.log("login reuqst");
    hidePhoneCountryOptions();
    const isValidCaptcha =
      window.recaptchaWidgetId != null && getCaptchaResponse();
    const isRendered = window.recaptchaVerifier != null;
    if (isValidCaptcha) {
      if (shouldValidatePhoneNumber) {
        destroyCaptcha();

        return onLoginRequest();
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
            if ((window.phoneStep ?? 0) === 0) goToStep(1);
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            hidePhoneCountryOptions();
            goToStep(0);
            resetCaptcha();
          },
          theme,
        },
        auth
      ));

    if (!isRendered) {
      setCaptchaLoader(true);
      window.recaptchaVerifier
        .render()
        .then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
          setCaptchaLoader(false);
        })
        .catch((e) => {
          onLoginRequest();
        });
    } else {
      if (captchaLoader) {
        alert("just second captcha is loading");
      } else {
        alert("please make sure the captcha is verified");
      }
    }
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
    setPhoneLoginBtnLoader(true);
    if (userPhone === lastPhone) {
      setPhoneLoginBtnLoader(false);
      return goToStep(2);
    }
    const users = await getUsersWhere([["phoneNumber", "==", userPhone]]);

    if (!shouldValidatePhoneNumber && !users) {
      setPhoneLoginBtnLoader(false);
      return setUserErrorNotExistsForPhone(true);
    } else if (shouldValidatePhoneNumber && users) {
      setPhoneLoginBtnLoader(false);
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
            setPhoneLoginBtnLoader(false);
            // ...
          })
          .catch((error) => {
            // Error; SMS not sent
            // ...
            setPhoneLoginBtnLoader(false);
            alert(error);
          });
      })
      .catch((error) => {
        setPhoneLoginBtnLoader(false);
        alert(error);
      });
  };
  const compareValidation = () => {
    setPhoneLoginBtnLoader(true);

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
      .catch(() => {
        // User couldn't sign in (bad verification code?)
        setPhoneLoginBtnLoader(false);
        setErrorInvalidVerifyCode(true);
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
        setGoggleBtnLoginLoader(false);
        break;
      case "phone":
        await phoneLoggedInHandler(data);
        setPhoneLoginBtnLoader(false);
        break;
      default:
        return;
    }
    destroyCaptcha();
  };

  const stepHandler = (currentStep = phoneStep) => {
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
    setGoggleBtnLoginLoader(true);
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
            setGoggleBtnLoginLoader(false);
            // user canceled teh login process
          });
      })
      .catch((error) => {
        alert(error);
        setGoggleBtnLoginLoader(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldValidatePhoneNumber]);

  return (
    <div className="flex min-h-screen h-fit items-center justify-around flex-col ">
      <div className="themeToggler absolute xs:fixed left-1/2 -translate-x-1/2 xs:left-auto xs:translate-x-0 xs:right-5 top-5">
        <ThemeToggle onClick={onThemeChange} isLight={theme === "light"} />
      </div>
      <div className="flex flex-col items-center justify-around gap-3 mt-20 xs:mt-0">
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
            className={`scale-50 xls:scale-75 xs:scale-100${
              captchaLoader ? " hidden" : ""
            }`}
          ></div>
          {captchaLoader ? (
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "var(--hover-overlay)" }}
              variant="rectangular"
              width={"100%"}
              height={90}
            />
          ) : (
            ""
          )}
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
            Phone number used before please use an other number!
          </ErrorText>

          <div className="self-start justify-self-start flex justify-start w-50">
            <IconButton
              color="primary"
              onClick={() => {
                goToStep(0);
                if (shouldItValidatePhoneNumber) stepHandler(0);
                setPhoneLoginBtnLoader(false);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>

          <PhoneNumberInput
            id="phoneInput"
            label="Your Phone Number"
            className="w-full p-2"
            value={userPhone}
            disabled={phoneLoginBtnLoader}
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
                goToStep(1);
                setPhoneLoginBtnLoader(false);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
          <ErrorText error={errorInvalidVerifyCode}>invalid Code !</ErrorText>
          <TextField
            id="VerifyData"
            label="Validation Number"
            className="w-full p-2"
            value={userValidation}
            disabled={phoneLoginBtnLoader}
            onInput={(e) => setUserValidation(e.target.value)}
            onBlur={(e) => setUserValidation(e.target.value)}
            {...validateVerification()}
          />
        </div>
      </div>
      <div className="login__buttons flex flex-col gap-3 items-center">
        {!(shouldValidatePhoneNumber && phoneStep === 0) && (
          <Button
            variant="contained"
            className="min-w-32"
            component="button"
            onClick={() => stepHandler()}
            id="sign-in-button"
            disabled={goggleBtnLoginLoader || phoneLoginBtnLoader}
          >
            {buttonText}
            {phoneLoginBtnLoader && (
              <CircularProgress
                color="inherit"
                className="mx-3"
                style={{ width: "30px", height: "30px" }}
              />
            )}
          </Button>
        )}
        {!shouldValidatePhoneNumber && (
          <Button
            variant="contained"
            className="min-w-32"
            component="button"
            color="error"
            onClick={googleHandler}
            id="sign-in-button"
            disabled={goggleBtnLoginLoader || phoneLoginBtnLoader}
          >
            Login With Google{" "}
            {goggleBtnLoginLoader && (
              <CircularProgress
                color="inherit"
                className="mx-3"
                style={{ width: "30px", height: "30px" }}
              />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Login;
