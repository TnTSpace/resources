<script lang="ts">
	import Educational from '$lib/components/frontend/Educational.svelte';
	import { educationalList } from '$lib/constants';
	const sections = [
		{
			id: 'introduction',
			title: 'Introduction',
			content: `<p>Welcome to Beuzibah Stores. These Terms of Use govern your access to and use of our website, services, and products. By using our platform, you agree to comply with these terms.</p>`
		},
		{
			id: 'eligibility',
			title: 'Eligibility',
			content: `<p>You must be at least 18 years old to use our services. By using Beuzibah Stores, you confirm that you meet this requirement.</p>`
		},
		{
			id: 'account-responsibilities',
			title: 'Account Responsibilities',
			content: `<p>When you create an account with us, you agree to:</p>
              <ul>
                <li>Provide accurate and up-to-date information.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
                <li>Notify us immediately if you suspect unauthorized access to your account.</li>
              </ul>`
		},
		{
			id: 'orders-and-payments',
			title: 'Orders and Payments',
			content: `<p>All orders placed on Beuzibah Stores are subject to availability and confirmation. You agree to:</p>
              <ul>
                <li>Provide valid payment information.</li>
                <li>Pay all applicable fees, taxes, and shipping costs.</li>
                <li>Follow all payment security guidelines.</li>
              </ul>`
		},
		{
			id: 'shipping-and-delivery',
			title: 'Shipping and Delivery',
			content: `<p>We strive to ensure timely delivery of all orders. However, shipping times may vary based on location and carrier conditions. We are not responsible for delays beyond our control.</p>`
		},
		{
			id: 'returns-and-refunds',
			title: 'Returns and Refunds',
			content: `<p>We offer returns and refunds under specific conditions:</p>
              <ul>
                <li>Items must be returned in their original condition within 14 days of delivery.</li>
                <li>Refunds will be processed based on the original payment method.</li>
                <li>Certain items, such as personal care products, may not be eligible for return.</li>
              </ul>`
		},
		{
			id: 'acceptable-use',
			title: 'Acceptable Use',
			content: `<p>By using Beuzibah Stores, you agree not to:</p>
              <ul>
                <li>Engage in fraudulent or deceptive activities.</li>
                <li>Disrupt the website or services.</li>
                <li>Use our platform for illegal purposes.</li>
              </ul>`
		},
		{
			id: 'intellectual-property',
			title: 'Intellectual Property',
			content: `<p>All content, including logos, images, and text, is the property of Beuzibah Stores. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>`
		},
		{
			id: 'limitation-of-liability',
			title: 'Limitation of Liability',
			content: `<p>Beuzibah Stores is not liable for any indirect, incidental, or consequential damages arising from your use of our services, except as required by law.</p>`
		},
		{
			id: 'termination',
			title: 'Termination',
			content: `<p>We reserve the right to suspend or terminate your account if you violate these terms. Termination may result in loss of access to your account and any associated data.</p>`
		},
		{
			id: 'changes-to-terms',
			title: 'Changes to These Terms',
			content: `<p>We may update these Terms of Use periodically. Any changes will be posted on this page, and continued use of our services constitutes acceptance of the updated terms.</p>`
		},
		{
			id: 'contact-us',
			title: 'Contact Us',
			content: `<p>If you have any questions about these Terms of Use, please contact us at:</p>
              <p><strong>Email:</strong> beuzibahz@gmail.com</p>
              <p><strong>Address:</strong> 4 Silifat Abioye St, Ojodu, Lagos 101233, Lagos</p>
              <p><strong>Phone:</strong> <a href="tel:+2348066514072">+2348066514072</a></p>
							`
		}
	];
</script>

<Educational pages={educationalList} title="Terms of Use" {sections} lastUpdated="January 30, 2025" />
