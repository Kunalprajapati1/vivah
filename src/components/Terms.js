import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const Terms = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Terms and Conditions</Text>

      <Text style={styles.paragraph}>
        Welcome to Sanjog! By using our app, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Sanjog's relationship with you.
      </Text>

      <Text style={styles.subHeader}>1. Acceptance of Terms</Text>
      <Text style={styles.paragraph}>
        By accessing and using the Sanjog app, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this app's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
      </Text>

      <Text style={styles.subHeader}>2. Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We are committed to protecting your privacy. Authorized employees within the company on a need-to-know basis only use any information collected from individual customers. Please review our Privacy Policy, which also governs your use of the app, to understand our practices.
      </Text>

      <Text style={styles.subHeader}>3. User Obligations</Text>
      <Text style={styles.paragraph}>
        As a user of the Sanjog app, you agree to provide true, accurate, current, and complete information about yourself. You also agree to maintain and promptly update your profile information to keep it true, accurate, current, and complete. You are responsible for all activities that occur under your account.
      </Text>

      <Text style={styles.subHeader}>4. Account Security</Text>
      <Text style={styles.paragraph}>
        You are responsible for maintaining the confidentiality of your password and account and for all activities that occur under your account. You agree to notify Sanjog immediately of any unauthorized use of your account or any other breach of security.
      </Text>

      <Text style={styles.subHeader}>5. Prohibited Activities</Text>
      <Text style={styles.paragraph}>
        Users are prohibited from engaging in the following activities:
        {'\n'}- Posting false, inaccurate, or misleading information.
        {'\n'}- Harassing, threatening, or abusing other users.
        {'\n'}- Transmitting viruses or any other malicious code.
        {'\n'}- Using the app for any unlawful purpose.
        {'\n'}- Impersonating any person or entity.
        {'\n'}- Collecting or storing personal data about other users without their consent.
        {'\n'}- Engaging in any activity that interferes with or disrupts the app or its services.
        {'\n'}- Violating any applicable laws or regulations.
      </Text>

      <Text style={styles.subHeader}>6. Termination</Text>
      <Text style={styles.paragraph}>
        Sanjog reserves the right to terminate or suspend your account at any time, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users of the app, us, or third parties, or for any other reason.
      </Text>

      <Text style={styles.subHeader}>7. Limitation of Liability</Text>
      <Text style={styles.paragraph}>
        Sanjog will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of, or inability to use, the app. In no event shall our aggregate liability exceed the amount paid by you, if any, for accessing the app.
      </Text>

      <Text style={styles.subHeader}>8. Changes to Terms</Text>
      <Text style={styles.paragraph}>
        Sanjog reserves the right to modify these terms at any time. We will notify you of any changes by posting the new terms on the app. You are advised to review these terms periodically for any changes. Changes to these terms are effective when they are posted on this page.
      </Text>

      <Text style={styles.subHeader}>9. Governing Law</Text>
      <Text style={styles.paragraph}>
        These terms shall be governed and construed in accordance with the laws of the country, without regard to its conflict of law provisions. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in our country.
      </Text>

      <Text style={styles.subHeader}>10. Intellectual Property</Text>
      <Text style={styles.paragraph}>
        The app and its original content, features, and functionality are and will remain the exclusive property of Sanjog and its licensors. The app is protected by copyright, trademark, and other laws of both the country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sanjog.
      </Text>

      <Text style={styles.subHeader}>11. Links to Other Websites</Text>
      <Text style={styles.paragraph}>
        Our app may contain links to third-party websites or services that are not owned or controlled by Sanjog. Sanjog has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Sanjog shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
      </Text>

      <Text style={styles.subHeader}>12. Changes to the App</Text>
      <Text style={styles.paragraph}>
        Sanjog reserves the right to modify or discontinue, temporarily or permanently, the app (or any part thereof) with or without notice. You agree that Sanjog shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the app.
      </Text>

      <Text style={styles.subHeader}>13. Indemnification</Text>
      <Text style={styles.paragraph}>
        You agree to indemnify and hold Sanjog and its affiliates, officers, agents, employees, and partners harmless from and against any and all claims, liabilities, damages (actual and consequential), losses, and expenses (including attorneys' fees) arising from or in any way related to your use of the app, violation of these Terms and Conditions, or any other actions connected with your use of the app.
      </Text>

      <Text style={styles.subHeader}>14. Dispute Resolution</Text>
      <Text style={styles.paragraph}>
        Any controversy or claim arising out of or relating to these Terms and Conditions or the breach thereof shall be settled by arbitration administered by the [Arbitration Institute] in accordance with its Commercial Arbitration Rules, and judgment on the award rendered by the arbitrator(s) may be entered in any court having jurisdiction thereof.
      </Text>

      <Text style={styles.subHeader}>15. Severability</Text>
      <Text style={styles.paragraph}>
        If any provision of these Terms and Conditions is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.
      </Text>

      <Text style={styles.subHeader}>16. Waiver</Text>
      <Text style={styles.paragraph}>
        The failure of Sanjog to enforce any right or provision of these Terms and Conditions shall not constitute a waiver of such right or provision unless acknowledged and agreed to by Sanjog in writing.
      </Text>

      <Text style={styles.subHeader}>17. Entire Agreement</Text>
      <Text style={styles.paragraph}>
        These Terms and Conditions, together with the Privacy Policy and any other legal notices or policies published by Sanjog on the app, shall constitute the entire agreement between you and Sanjog concerning the app. It supersedes all prior or contemporaneous communications, agreements, and understandings, whether oral or written, between you and Sanjog regarding the app.
      </Text>

      <Text style={styles.subHeader}>18. Contact Information</Text>
      <Text style={styles.paragraph}>
        If you have any questions about these Terms and Conditions, please contact us at support@sanjog.com.
      </Text>

      <Text style={styles.subHeader}>19. Assignment</Text>
      <Text style={styles.paragraph}>
        Sanjog may assign its rights and obligations under these Terms and Conditions to any party at any time without notice to you. Your rights and obligations under these Terms and Conditions are not assignable.
      </Text>

      <Text style={styles.subHeader}>20. Force Majeure</Text>
      <Text style={styles.paragraph}>
        Sanjog shall not be liable for any failure to perform its obligations hereunder where such failure results from any cause beyond Sanjog’s reasonable control, including, without limitation, mechanical, electronic, or communications failure or degradation.
      </Text>

      <Text style={styles.subHeader}>21. No Agency</Text>
      <Text style={styles.paragraph}>
        Nothing in these Terms and Conditions shall be construed as creating any agency, partnership, joint venture, or other form of joint enterprise between you and Sanjog.
      </Text>

     

      <Text style={styles.subHeader}>23. Updates to Terms</Text>
  <Text style={styles.paragraph}>
    
    Sanjog reserves the right to update or modify these Terms and Conditions periodically. Changes will be effective immediately upon posting on the app. Continued use of the app after such changes constitutes your consent to be bound by the updated Terms and Conditions.
  </Text>

  <Text style={styles.subHeader}>24. Feedback</Text>
  <Text style={styles.paragraph}>
    We welcome feedback, comments, and suggestions for improvements to our app and services. You agree that any feedback or suggestions submitted to Sanjog shall become the sole property of Sanjog, and we may use such feedback or suggestions in any manner and for any purpose without compensation to you.
  </Text>

  <Text style={styles.subHeader}>25. Acknowledgment</Text>
  <Text style={styles.paragraph}>
    By using the Sanjog app, you acknowledge that you have read these Terms and Conditions, understand them, and agree to be bound by their terms and conditions. If you do not agree with these Terms and Conditions, please do not use the Sanjog app.
  </Text>

      {/* Add more sections as needed */}
    </ScrollView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#495057',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#6c757d',
  },
});
