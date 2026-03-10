'use client';
import Navbar from '../../components/navbar';

export default function PrivacyPage() {
  const sections = [
    { id: 'collect', title: '1. Information We Collect', content: 'We collect information you provide directly: name, email, phone number, date of birth, gender, and profile information. We also collect session data, usage analytics, device information, and cookies for platform improvement.' },
    { id: 'use', title: '2. How We Use Information', content: 'We use your information to: provide and maintain our services, connect you with appropriate counsellors, process appointments and communications, send notifications and updates, improve our platform, and ensure security and prevent fraud.' },
    { id: 'sharing', title: '3. Information Sharing', content: 'We do not sell your personal information. We may share information with: your chosen counsellor (for session purposes), service providers who assist platform operations, and legal authorities when required by law. Session content between you and your counsellor remains strictly confidential.' },
    { id: 'security', title: '4. Data Security', content: 'We implement industry-standard security measures including encryption (SSL/TLS), secure data storage, access controls, and regular security audits. While we strive to protect your data, no method of transmission over the internet is 100% secure.' },
    { id: 'cookies', title: '5. Cookies', content: 'We use cookies and similar technologies to maintain your session, remember preferences, and analyze usage patterns. You can control cookie settings through your browser, though some features may not function properly without cookies.' },
    { id: 'rights', title: '6. Your Rights', content: 'You have the right to: access your personal data, correct inaccurate information, request deletion of your account and data, export your data, opt out of marketing communications, and withdraw consent at any time.' },
    { id: 'retention', title: '7. Data Retention', content: 'We retain your data for as long as your account is active or as needed to provide services. After account deletion, we may retain certain data for legal compliance purposes for up to 5 years. Anonymized data may be kept indefinitely for analytics.' },
    { id: 'children', title: '8. Children\'s Privacy', content: 'Mind Haven is not intended for children under 13. We do not knowingly collect personal information from children under 13. Users between 13-18 must have parental consent. If we discover we have collected data from a child under 13, we will delete it promptly.' },
    { id: 'changes', title: '9. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of significant changes via email or platform notification. The updated policy will be effective upon posting with the new "Last updated" date.' },
    { id: 'contact', title: '10. Contact Us', content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@mindhaven.com or write to us at: Mind Haven, Colombo, Sri Lanka.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 bg-gradient-to-br from-[#00610B] to-[#16320D] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-green-200">Last updated: March 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="mb-8 p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold text-[#16320D] mb-2">Table of Contents</h3>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="text-[#00610B] hover:underline text-sm">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.id} id={s.id}>
                <h2 className="text-xl font-bold text-[#16320D] mb-3">{s.title}</h2>
                <p className="text-gray-600 leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
