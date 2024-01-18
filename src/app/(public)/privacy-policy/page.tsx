import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for the Language, culture and creativity club web application.",
};

const page = () => {
  return (
    <main className="flex flex-col py-6 prose marker:text-muted-foreground text-foreground md:max-w-4xl md:mx-auto lg:py-12 prose-indigo dark:prose-invert">
      <h1>Privacy policy</h1>
      <p>We collect the following personal information from users:</p>
      <ul>
        <li>First and last name</li>
        <li>Username</li>
        <li>Email address</li>
      </ul>
      <h2>How We Collect Your Information</h2>
      <p>
        We collect personal information when you register on our website. The
        information is provided voluntarily by users when creating an account or
        updating their account settings.
      </p>

      <h2>Use of Personal Information</h2>
      <p>
        We use the collected personal information for the following purposes:
      </p>
      <ul>
        <li>
          To send notifications and important updates regarding your account and
          the LCC Club
        </li>
        <li>
          To allow you to receive emails and communications related to the LCC
          Club, including event invitations, newsletters, and announcements
        </li>
        <li>
          To gather feedback and improve our services, including conducting
          surveys and analysis of user preferences
        </li>
        <li>
          To generate statistical analysis for internal administration purposes,
          such as understanding user demographics and engagement levels
        </li>
      </ul>

      <h2>Sharing of Personal Information</h2>
      <p>
        We do not share your personal information with any third parties. Your
        information is strictly used for internal purposes and to provide you
        with a personalized experience within the LCC Club web application.
      </p>
      <p>
        However, please note that any content you contribute to the LCC Club web
        application, such as articles or comments, may be visible to other club
        members and users of the platform, depending on the privacy settings you
        choose when sharing your content.
      </p>

      <h2>Data Security</h2>
      <p>
        We take the security and confidentiality of your data seriously. We
        implement industry-standard security measures to protect your personal
        information from unauthorized access, use, or disclosure. These measures
        include encryption, secure browsing protocols, restricted access to user
        data, and regular security assessments.
      </p>
      <p>
        However, please be aware that no method of transmission over the
        internet or electronic storage is 100% secure. While we strive to
        protect your personal information, we cannot guarantee its absolute
        security.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies, which are small text files placed on your device, to
        authorize users and identify the logged-in user. These cookies are
        strictly necessary for the functioning of our platform and enable
        certain features and personalizations.
      </p>
      <p>
        You have the option to disable or decline cookies through your browser
        settings, but please note that certain features of the LCC Club web
        application may not work correctly if cookies are disabled.
      </p>

      <h2>User Access and Control</h2>
      <p>
        You have the right to access, update, or delete your personal
        information. You can make changes or delete your account from your
        account settings on our website.
      </p>
      <p>
        If you need any assistance or encounter any issues while accessing or
        modifying your personal information, please contact our support team at{" "}
        <a href="mailto:moha@elguarir.dev">moha@elguarir.dev</a>.
      </p>

      <h2>Data Retention</h2>
      <p>
        We will retain your personal information for as long as necessary to
        fulfill the purposes outlined in this Privacy Policy, unless a longer
        retention period is required or permitted by law. If you request the
        deletion of your account, we will securely and promptly delete your
        personal information, subject to any legal obligations to retain certain
        data or anonymized information for statistical analysis or business
        purposes.
      </p>

      <h2>Compliance with Laws</h2>
      <p>
        We comply with all applicable data protection laws and regulations,
        including but not limited to the General Data Protection Regulation
        (GDPR) and the California Consumer Privacy Act (CCPA).
      </p>

      <h2>Changes to the Privacy Policy</h2>
      <p>
        We reserve the right to update or modify this Privacy Policy at any
        time. Any changes to this policy will be effective immediately upon
        posting on this page. We encourage you to review this Privacy Policy
        periodically for any updates or amendments.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy
        Policy or the handling of your personal information, please contact us
        at <a href="mailto:moha@elguarir.dev">moha@elguarir.dev</a>.
      </p>
    </main>
  );
};

export default page;
