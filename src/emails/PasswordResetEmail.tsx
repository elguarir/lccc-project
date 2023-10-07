import { siteConfig } from "@/config/site";
import { env } from "@/lib/env/server";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import { render } from "@react-email/render";
interface ResetPasswordEmailProps {
  fullName?: string;
  resetPasswordLink?: string;
}

const ResetPasswordEmail = ({
  fullName,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        You recently requested a password change for your {siteConfig.name}{" "}
        account. follow the link below to reset your password.
      </Preview>
      <Body style={main}>
        <Tailwind>
          <Container style={container}>
            <Img
              src="https://este.elguarir.dev/images/logo.png"
              width="40"
              height="33"
              alt={siteConfig.name}
            />
            <Section>
              <Text style={text}>Hi {fullName},</Text>
              <Text style={text}>
                You recently requested a password change for your{" "}
                {siteConfig.name} account. If this was you, you can set a new
                password here:
              </Text>
              <Button
                className="px-4 py-1 text-base font-medium text-white bg-red-500 rounded-md"
                href={resetPasswordLink}
              >
                Reset password
              </Button>
              <Text style={text}>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text style={text}>Have a great day!</Text>
            </Section>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "5px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "20px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "400",
  color: "#404040",
  lineHeight: "26px",
};

export const renderEmail = async (props: ResetPasswordEmailProps) => {
  return render(<ResetPasswordEmail {...props} />, {
    pretty: true,
  });
};
