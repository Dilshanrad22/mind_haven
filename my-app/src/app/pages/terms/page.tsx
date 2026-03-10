'use client';
import Navbar from '../../components/navbar';

export default function TermsPage() {
  const sections = [
    { id: 'intro', title: '1. Introduction', content: 'Welcome to Mind Haven. These Terms of Service govern your use of our platform and services. By accessing or using Mind Haven, you agree to be bound by these terms. If you do not agree, please do not use our services.' },
    { id: 'eligibility', title: '2. Eligibility', content: 'You must be at least 18 years old to use Mind Haven. If you are under 18, you may only use the platform with the consent and supervision of a parent or legal guardian. By using our services, you represent that you meet these requirements.' },
    { id: 'accounts', title: '3. User Accounts', content: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information during registration and to update it as needed. You are responsible for all activities that occur under your account.' },
    { id: 'services', title: '4. Services Description', content: 'Mind Haven provides a platform connecting users with licensed mental health professionals for counselling sessions via video, chat, and in-person meetings. We also provide educational mental health resources and articles.' },
    { id: 'conduct', title: '5. User Conduct', content: 'You agree not to: use the platform for any unlawful purpose; harass, abuse, or threaten other users or counsellors; share false or misleading information; attempt to gain unauthorized access to any part of the platform; or use the service to provide medical advice if you are not a licensed professional.' },
    { id: 'privacy', title: '6. Privacy', content: 'Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy. By using Mind Haven, you consent to the collection and use of your information as described in our Privacy Policy.' },
    { id: 'disclaimer', title: '7. Medical Disclaimer', content: 'Mind Haven is NOT a substitute for emergency medical services. If you are experiencing a medical emergency or are in immediate danger, please call your local emergency services immediately. Our counsellors provide supportive counselling but do not provide medical diagnoses or prescribe medication.' },
    { id: 'liability', title: '8. Limitation of Liability', content: 'Mind Haven is provided on an "as is" basis. We do not guarantee specific outcomes from counselling sessions. To the fullest extent permitted by law, Mind Haven shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.' },
    { id: 'termination', title: '9. Termination', content: 'We may suspend or terminate your account at any time for violation of these terms. You may also delete your account at any time through your account settings. Upon termination, your right to use the platform ceases immediately.' },
    { id: 'changes', title: '10. Changes to Terms', content: 'We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notification. Your continued use of Mind Haven after changes constitutes acceptance of the updated terms.' },
    { id: 'contact', title: '11. Contact Information', content: 'If you have questions about these Terms of Service, please contact us at support@mindhaven.com or through our Contact Us page.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 bg-gradient-to-br from-[#00610B] to-[#16320D] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
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
