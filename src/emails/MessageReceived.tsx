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
interface MessageReceivedEmailProps {
  name: string;
  email: string;
  message: string;
}

const MessageReceivedEmail = ({
  name,
  email,
  message,
}: MessageReceivedEmailProps) => {
  // can you please create an email using react-email to inform clients that their message is received along with some more contact information if it's urgent

  return (
    <Html>
      <Head />
      <Preview>
        Hello, we have received your message and will get back to you as soon as
        possible.
      </Preview>
      <Body>
        <Tailwind>
          <Container>
            <Img
              src="https://somacep-2.vercel.app/images/somacep.png"
              width="40"
              height="33"
              alt={siteConfig.name}
            />
            <Section>
              <Text>Hi {name},</Text>
              <Text>
                Thank you for contacting us. We have received your message and
                will get back to you as soon as possible.
              </Text>

              <Text className="mt-4 text-sm text-gray-600">
                If your inquiry is urgent, please call us at +212528826660 or
                reply to this email.
              </Text>

              <Text className="mt-4 text-sm text-gray-600">
                Best regards,
                <br />
                {siteConfig.name}
              </Text>
            </Section>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

export default MessageReceivedEmail;

export const renderEmail = async (props: MessageReceivedEmailProps) => {
  return render(<MessageReceivedEmail {...props} />, {
    pretty: true,
  });
};
