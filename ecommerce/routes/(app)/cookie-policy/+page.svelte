<script lang="ts">
	import Educational from '$lib/components/frontend/Educational.svelte';
	import { educationalList } from '$lib/constants';
	const sections = [
		{
			id: 'introduction',
			title: 'Introduction',
			content: `<p>Welcome to Beuzibah Stores. This Cookie Policy explains how we use cookies and similar technologies to improve your browsing experience on our website.</p>`
		},
		{
			id: 'what-are-cookies',
			title: 'What Are Cookies?',
			content: `<p>Cookies are small text files that websites place on your device to store data. They help enhance user experience by remembering preferences, enabling security features, and analyzing website performance.</p>`
		},
		{
			id: 'types-of-cookies-we-use',
			title: 'Types of Cookies We Use',
			content: `<p>We use different types of cookies for various purposes, including:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Necessary for core website functions, such as authentication and secure transactions.</li>
                <li><strong>Performance Cookies:</strong> Help us analyze website traffic and optimize user experience.</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences, such as language and location settings.</li>
                <li><strong>Advertising Cookies:</strong> Used to personalize ads and measure their effectiveness.</li>
              </ul>`
		},
		{
			id: 'how-we-use-cookies',
			title: 'How We Use Cookies',
			content: `<p>Beuzibah Stores uses cookies to:</p>
              <ul>
                <li>Enhance website functionality and security.</li>
                <li>Provide personalized shopping experiences.</li>
                <li>Analyze user behavior and improve our services.</li>
                <li>Display relevant advertisements.</li>
              </ul>`
		},
		{
			id: 'third-party-cookies',
			title: 'Third-Party Cookies',
			content: `<p>We may allow third-party service providers to place cookies on your device for analytics, advertising, and payment processing. These third parties have their own privacy policies, and we encourage you to review them.</p>`
		},
		{
			id: 'cookie-preferences',
			title: 'Managing Cookie Preferences',
			content: `<p>You can manage or disable cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.</p>
              <p>To change your cookie preferences, visit your browser settings and follow the instructions provided by your browser developer.</p>`
		},
		{
			id: 'cookie-retention',
			title: 'Cookie Retention',
			content: `<p>Cookies are stored for different durations:</p>
              <ul>
                <li><strong>Session Cookies:</strong> Temporary and deleted when you close your browser.</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a specified period or until manually deleted.</li>
              </ul>`
		},
		{
			id: 'changes-to-policy',
			title: 'Changes to This Cookie Policy',
			content: `<p>We may update this Cookie Policy from time to time. Any changes will be posted on this page, and we will notify you of significant updates.</p>`
		},
		{
			id: 'contact-us',
			title: 'Contact Us',
			content: `<p>If you have any questions about this Cookie Policy, please contact us at:</p>
              <p><strong>Email:</strong> beuzibahz@gmail.com</p>
              <p><strong>Address:</strong> 4 Silifat Abioye St, Ojodu, Lagos 101233, Lagos</p>
              <p><strong>Phone:</strong> <a href="tel:+2348066514072">+2348066514072</a></p>
							`
		}
	];
</script>

<Educational pages={educationalList} title="Cookie Policy" {sections} lastUpdated="January 30, 2025" />
