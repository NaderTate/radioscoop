"use client";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
type Props = {};

const LoginFrom = (props: Props) => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("CredentialsSignin"));
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
    });
  };
  return (
    <div className="p-10 bg-content1 rounded-md flex flex-col gap-y-5 w-96">
      <Input
        variant="bordered"
        label="email"
        onValueChange={(e) => setCredentials((prev) => ({ ...prev, email: e }))}
      />
      <Input
        variant="bordered"
        label="password"
        type="password"
        onValueChange={(e) =>
          setCredentials((prev) => ({ ...prev, password: e }))
        }
      />
      <Button onPress={handleLogin}>Log</Button>
      {searchParams.get("error") === "CredentialsSignin" && (
        <div className="text-red-500">Invalid email or password</div>
      )}
    </div>
  );
};

export default LoginFrom;
