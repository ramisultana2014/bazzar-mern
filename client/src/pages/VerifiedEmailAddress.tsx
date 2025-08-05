import { useEffect, useRef, useState } from "react";
import { Logo } from "../components";
import Wrapper from "../wrapper/VerifiedEmailAddress";
import toast from "react-hot-toast";
import { useAccountActivate } from "../../reactQuery/authentication/useVerifiedEmailAddress";
import { useRequestNewCode } from "../../reactQuery/authentication/useRequestNewCode";
function VerifiedEmailAddress() {
  const { accountActivate, isPending } = useAccountActivate();
  const { requestNewCode } = useRequestNewCode();

  const [showtimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState(Array(6).fill(""));
  //We're creating an array of 6 strings like ["", "", "", "", "", ""] to store the digits the user types.
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  // we write it like const inputsRef = useRef<(HTMLInputElement | null)[]>([]); so we can store each input in the array :
  //This array gives us access to each input box in the DOM, so we can move focus programmatically (like jumping to the next box or going back).
  //When the user types a digit, it moves to the next box.
  // When all boxes are filled, the code is sent to the server.
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value; //here we put the value that user type into newOtp
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus(); // go to next box
    }

    // Optional: auto-submit when all filled
    if (newOtp.every((digit) => digit !== "")) {
      const fullCode = newOtp.join("");
      //here will put the api for validating the code
      // console.log(fullCode);
      accountActivate({ verificationCode: fullCode });
    }
  };
  function handleNewCode() {
    setShowTimer((s) => !s);
    setTimer(30);
    requestNewCode();
  }
  useEffect(
    function () {
      if (showtimer && timer > 0) {
        const interValid = setInterval(() => {
          setTimer((timer) => timer - 1);
        }, 1000);
        return () => clearInterval(interValid);
      } else if (timer === 0) {
        setShowTimer(false);
      }
    },
    [timer, showtimer]
  );
  return (
    <Wrapper>
      <Logo />
      <h1>please Enter your Verification Code </h1>
      <div className="container">
        {otp.map((digit, i) => (
          <input
            disabled={isPending}
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            ref={(el) => {
              inputsRef.current[i] = el;
              //here we:  el is the actual <input> DOM node that just got rendered
              // inputsRef.current[i] = el stores that DOM node in the correct position in the array inputsRef so later we can use the go to next box
              //For example, if you're rendering the third input box (i === 2), then el will be the third <input> DOM node.
              //this part happen first before onChange, onPaste
            }}
            onPaste={(e) => {
              e.preventDefault();
              const pasted = e.clipboardData.getData("text").trim().slice(0, 6);
              if (!/^\d{6}$/.test(pasted)) {
                return toast.error("Please paste a valid 6-digit code");
              }
              //newOtp look [1,2,3,4,5,6]
              const newOtp = pasted.split("");
              setOtp(newOtp);
              //in this forEach we gave each input element value  the digit
              // newOtp.forEach((digit, idx) => {
              //   if (inputsRef.current[idx]) {
              //     inputsRef.current[idx]!.value = digit;
              //     // "Hey, trust me — this isn't null or undefined. I'm sure it's an actual HTMLInputElement and  go ahead and insert the digit into it.”
              //   }
              // });

              inputsRef.current[5]?.focus(); // focus the last box
              const fullCode = newOtp.join("");
              // here: trigger API call to verify fullCode
              accountActivate({ verificationCode: fullCode });
            }}
          />
        ))}
      </div>
      <div className="code">
        <p>
          {showtimer
            ? "please check your email"
            : `if you did't receive your code`}
        </p>
        <button
          onClick={handleNewCode}
          className="act"
          disabled={showtimer || isPending}
        >
          {showtimer
            ? `you can ask for new code after ${timer} s`
            : "click here"}
        </button>
      </div>
    </Wrapper>
  );
}
export default VerifiedEmailAddress;
