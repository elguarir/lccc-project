import AuthLayout from "@/components/auth/AuthLayout";
import AuthLoading from "@/components/auth/AuthLoading";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <AuthLayout>
      <AuthLoading>
        <SignIn
          routing="path"
          appearance={{
            elements: {
              logoImage: {
                width: "150px",
                height: "auto",
              },
              card: {
                boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
                width: "26rem",
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

export default SignInPage;
