import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { logoUrl, baseUrl } from "../constants";
type Props = {
  name: string;
  email: string;
};

export const WelcomeEmail = ({ email, name }: Props) => {
  let links = [
    {
      label: "Dashboard",
      url: `${baseUrl}/dashboard`,
    },
    {
      label: "Articles",
      url: `${baseUrl}/articles`,
    },
    {
      label: "Settings",
      url: `${baseUrl}/dashboard/settings`,
    },
  ];

  let steps = [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>Create your first article.</strong>{" "}
          <Link>go ahead to your dashboard</Link>, and create your first
          article.{" "}
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Fill the required details.</strong> after that you can either
          save it as a draft or submit it for review.
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Receive Review.</strong> Once your article is reviewed, you
          will receive an email with the status of your article.
        </li>
      ),
    },
    {
      id: 4,
      Description: (
        <li className="mb-20" key={4}>
          <strong>Revisions.</strong> If your article requires any improvements,
          there will be attached comments to help you improve your article.
        </li>
      ),
    },
    {
      id: 5,
      Description: (
        <li className="mb-20" key={5}>
          <strong>Share.</strong> Once your article is approved, it will be
          published on the platform.
        </li>
      ),
    },
  ];

  return (
    <Html>
      <Head />
      <Preview>
        Hello {name} 👋, we're excited to have you on board. We're here to help
        you get started with your first article.
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#6172c4",
              },
              spacing: {
                0: "0px",
                5: "5px",
                10: "10px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="font-sans text-base">
          <Img
            src={logoUrl}
            width={304.5}
            height={88.5}
            alt="LCC Club"
            className="mx-auto my-20"
          />
          <Container className="px-2 bg-white py-45">
            <Heading className="my-0 leading-8 text-center">
              Welcome to LCC Club!
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Hi <strong>{name}</strong>, we're excited to have you on
                  board. We're here to help you get started with your first
                  article.
                </Text>

                <Text className="text-base">Here's how to get started:</Text>
              </Row>
            </Section>

            <ul>{steps?.map(({ Description }) => Description)}</ul>

            <Section className="text-center">
              <Button className="px-10 py-5 text-white rounded-lg bg-primary">
                Go to your dashboard
              </Button>
            </Section>

            <Section className="mt-45">
              <Row>
                {links?.map((link) => (
                  <Column key={link.label}>
                    <Link
                      href={link.url}
                      className="font-bold text-black underline"
                    >
                      {link.label}
                    </Link>{" "}
                    <span className="text-green-500">→</span>
                  </Column>
                ))}
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Column className="px-20 text-right">
                  <Link href={`${baseUrl}/emails/communication/unsubscribe`}>
                    Unsubscribe
                  </Link>
                </Column>
                <Column className="text-left">
                  <Link href={`${baseUrl}/dashboard/settings`}>
                    Manage Preferences
                  </Link>
                </Column>
              </Row>
            </Section>
            <Text className="text-center text-gray-400 mb-45">
              LCC Club, The higher school of technology, Essaouira, Morocco
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
