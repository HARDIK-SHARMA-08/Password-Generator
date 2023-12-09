import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState("8");
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) string += "0123456789";
    if (char) string += "`~!@#$%^&*(){}[]<>,.?/|;:";

    for (let i = 0; i < length; i++) {
      let character = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(character);
    }

    setPassword(pass);
  }, [length, number, char, setPassword]);

  const copyPassword = useCallback(() => {
    //useRef is only use to give this select effect in UI
    //That when we select COPY it selects the password field
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, setPassword, passwordGenerator]);

  return (
    <>
      <div className="items-center">
        <h1 className="text-center font-bold text-4xl p-8">
          Password Generator
        </h1>

        <div className="flex justify-center overflow-hidden my-6">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            ref={passwordRef}
            className="bg-white outline-none text-gray-900 rounded-l-xl text-sm block w-1/4 p-2.5"
          />
          <button
            className="bg-red-500 rounded-r-xl p-3"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        <div className="flex justify-center my-6">
          <label className="pr-2">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={40}
            value={length}
            className="w-1/4"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center">
          <label className="pr-2">Number</label>
          <input
            type="checkbox"
            defaultValue={number}
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label className="pr-2 pl-6">Character</label>
          <input
            type="checkbox"
            defaultValue={char}
            onChange={() => {
              setChar((prev) => !prev);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
