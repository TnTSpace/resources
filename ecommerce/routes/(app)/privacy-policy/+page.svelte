<script lang="ts">
	import Educational from '$lib/components/frontend/Educational.svelte';
	import { educationalList } from '$lib/constants';

	const sections = [
		{
			id: 'introduction',
			title: 'Introduction',
			content: `<p>Welcome to Beuzibah Stores. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our e-commerce platform.</p>`
		},
		{
			id: 'information-collection',
			title: 'Information Collection',
			content: `<p>We collect information in the following ways:</p>
              <ul>
                <li><strong>Directly from You:</strong> When you create an account, place an order, or contact customer support.</li>
                <li><strong>Automatically:</strong> Through cookies and analytics tools that track website usage.</li>
                <li><strong>From Third Parties:</strong> Such as payment processors and social media platforms when you interact with our services.</li>
              </ul>`
		},
		{
			id: 'use-of-information',
			title: 'Use of Information',
			content: `<p>We use the information collected for various purposes, including:</p>
              <ul>
                <li>Processing transactions and fulfilling orders.</li>
                <li>Providing customer support and responding to inquiries.</li>
                <li>Improving our website, products, and services.</li>
                <li>Sending promotional offers and marketing communications.</li>
                <li>Ensuring security and preventing fraudulent activity.</li>
              </ul>`
		},
		{
			id: 'information-sharing',
			title: 'Information Sharing',
			content: `<p>We do not sell or rent your personal data. However, we may share information in the following cases:</p>
              <ul>
                <li><strong>With Service Providers:</strong> Such as payment processors, shipping companies, and IT support teams.</li>
                <li><strong>For Legal Reasons:</strong> When required to comply with laws, regulations, or legal requests.</li>
                <li><strong>In Business Transfers:</strong> If Beuzibah Stores is involved in a merger, acquisition, or asset sale.</li>
              </ul>`
		},
		{
			id: 'data-security',
			title: 'Data Security',
			content: `<p>We implement industry-standard security measures to protect your personal data, including:</p>
              <ul>
                <li>Encryption of sensitive data.</li>
                <li>Secure payment processing.</li>
                <li>Regular security audits and monitoring.</li>
              </ul>
              <p>However, no method of transmission over the internet is 100% secure, and we encourage users to take precautions when sharing personal information online.</p>`
		},
		{
			id: 'your-rights',
			title: 'Your Rights',
			content: `<p>You have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access and Correction:</strong> You can review and update your information through your account settings.</li>
                <li><strong>Data Deletion:</strong> You may request the deletion of your personal data.</li>
                <li><strong>Marketing Preferences:</strong> You can opt out of promotional emails at any time.</li>
              </ul>`
		},
		{
			id: 'cookies-and-tracking',
			title: 'Cookies and Tracking Technologies',
			content: `<p>We use cookies and similar tracking technologies to enhance your experience. These help us:</p>
              <ul>
                <li>Remember your preferences and login details.</li>
                <li>Analyze website traffic and usage patterns.</li>
                <li>Provide personalized content and advertisements.</li>
              </ul>
              <p>You can manage cookie preferences in your browser settings.</p>`
		},
		{
			id: 'third-party-services',
			title: 'Third-Party Services',
			content: `<p>We may include links to third-party websites or services. Please note that their privacy practices may differ from ours, and we encourage you to review their policies before providing personal information.</p>`
		},
		{
			id: 'changes-to-policy',
			title: 'Changes to This Privacy Policy',
			content: `<p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of significant updates.</p>`
		},
		{
			id: 'contact-us',
			title: 'Contact Us',
			content: `<p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
              <p><strong>Email:</strong> beuzibahz@gmail.com</p>
              <p><strong>Address:</strong> 4 Silifat Abioye St, Ojodu, Lagos 101233, Lagos</p>
              <p><strong>Phone:</strong> <a href="tel:+2348066514072">+2348066514072</a></p>
							`
		}
	];
</script>

<Educational pages={educationalList} title="Privacy Policy" {sections} lastUpdated="January 30, 2025" />
