import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for the Language, culture and creativity club web application.",
};

const page = () => {
  return (
    <main className="flex flex-col py-6 prose marker:text-muted-foreground text-foreground md:max-w-4xl md:mx-auto lg:py-12 dark:prose-invert">
      <h1>Terms of Service</h1>
      <p>
        Welcome to the LCC Club web application! These Terms of Service outline
        the rules and regulations for the use of our platform. By accessing this
        website, you accept and agree to be bound by these Terms of Service. If
        you disagree with any part of these terms, please do not use our
        platform.
      </p>

      <h2>Content</h2>
      <ol>
        <li>
          Users of the LCC Club web application may contribute content such as
          articles, thoughts, views, and concepts related to their area of study
          or club membership.
        </li>
        <li>
          By contributing content, you grant the LCC Club and its members a
          non-exclusive, worldwide, royalty-free license to use, reproduce,
          modify, adapt, publish, translate, distribute, and display the
          content.
        </li>
        <li>
          Users are responsible for the content they contribute and should
          ensure that it does not violate any applicable laws or infringe upon
          the rights of third parties.
        </li>
        <li>
          The LCC Club reserves the right to moderate, remove, or reject any
          content that is deemed inappropriate, offensive, or violates these
          Terms of Service.
        </li>
        <li>
          The views expressed in the content contributed by users do not
          necessarily represent the views of the LCC Club or its members.
        </li>
      </ol>

      <h2>Account and Privacy</h2>
      <ol>
        <li>
          Users are responsible for maintaining the confidentiality of their
          account credentials and should not share them with others.
        </li>
        <li>
          Users are solely responsible for all activities that occur under their
          account.
        </li>
        <li>
          The LCC Club collects and stores personal information in accordance
          with its <a href="privacy.html">Privacy Policy</a>. By using our
          platform, you consent to the collection and use of your personal
          information as outlined in the Privacy Policy.
        </li>
      </ol>

      <h2>Intellectual Property</h2>
      <ol>
        <li>
          The LCC Club retains all rights, title, and interest in and to the web
          application and its contents.
        </li>
        <li>
          The LCC Club logo and name may not be reproduced or used without prior
          written permission from the LCC Club.
        </li>
        <li>
          Users may not use the web application or its contents for any
          commercial purposes without obtaining written permission from the LCC
          Club.
        </li>
      </ol>

      <h2>Limitation of Liability</h2>
      <ol>
        <li>
          The LCC Club web application is provided on an "as is" basis, and the
          LCC Club makes no warranties regarding its availability, accuracy, or
          performance.
        </li>
        <li>
          The LCC Club shall not be liable for any direct, indirect, incidental,
          special, or consequential damages arising out of the use or inability
          to use the web application.
        </li>
      </ol>

      <h2>Changes to the Terms of Service</h2>
      <ol>
        <li>
          The LCC Club reserves the right to modify these Terms of Service at
          any time without prior notice. It is the responsibility of users to
          review these terms periodically.
        </li>
        <li>
          By continuing to use the LCC Club web application after any
          modifications, users accept the updated Terms of Service.
        </li>
      </ol>

      <p>
        If you have any questions or concerns about these Terms of Service,
        please contact us at{" "}
        <a href="mailto:moha@elguarir.dev">moha@elguarir.dev</a>.
      </p>
    </main>
  );
};

export default page;
