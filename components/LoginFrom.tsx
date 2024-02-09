"use client";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
type Props = {};

const LoginFrom = (props: Props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  return (
    <div>
      <Input
        label="email"
        onValueChange={(e) =>
          setCredentials((prev) => ({ ...prev, username: e }))
        }
      />
      <Input
        label="password"
        type="password"
        onValueChange={(e) =>
          setCredentials((prev) => ({ ...prev, password: e }))
        }
      />
      <Button
        onPress={() => {
          signIn("credentials", {
            username: credentials.username,
            password: credentials.password,
            callbackUrl: "/dashboard",
          });
        }}
      >
        Log
      </Button>
    </div>
  );
};

export default LoginFrom;
