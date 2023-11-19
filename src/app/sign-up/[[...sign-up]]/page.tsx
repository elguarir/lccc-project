import AuthLayout from "@/components/auth/AuthLayout";
import AuthLoading from "@/components/auth/AuthLoading";
import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <AuthLoading>
        <SignUp
          routing="path"
          appearance={{
            elements: {
              logoImage: {
                width: "150px",
                height: "auto",
              },
              card: {
                boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
                width: "28rem",
              },
            },
            layout: {
              showOptionalFields: true,
              shimmer: true,
            },
            variables: {
              fontSmoothing: "antialiased",
              fontFamily: "Inter, sans-serif",
              spacingUnit: "0.9rem",
              borderRadius: "8px",
            },
          }}
        />
      </AuthLoading>
    </AuthLayout>
  );
};

export default SignUpPage;
