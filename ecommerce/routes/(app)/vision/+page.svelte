<script lang="ts">
	import Educational from '$lib/components/frontend/Educational.svelte';
	import { educationalList } from '$lib/constants';

	const sections = [
		{
			id: 'vision',
			title: 'Our Vision',
			content: `<p>At Beuzibah Stores, our vision is to be the leading e-commerce destination for fashion, beauty, and home essentials, delivering innovation, quality, and affordability to customers worldwide.</p>
              <p>We are committed to redefining online shopping by offering an unparalleled selection of products, seamless user experience, and personalized customer service.</p>
              <p>Our long-term goal is to build a trusted brand known for its reliability, style, and customer-centric approach, ensuring that shopping at Beuzibah Stores remains an exciting and satisfying experience.</p>`
		},
		{
			id: 'core-values',
			title: 'Core Values',
			content: `<p>Our vision is built on the following core values:</p>
              <ul>
                <li><strong>Customer Satisfaction:</strong> We prioritize our customers' needs and strive to exceed their expectations.</li>
                <li><strong>Quality and Innovation:</strong> We continuously evolve to offer top-tier products and cutting-edge shopping experiences.</li>
                <li><strong>Trust and Transparency:</strong> We believe in honest business practices and maintaining strong customer relationships.</li>
                <li><strong>Convenience and Accessibility:</strong> We make shopping effortless, secure, and enjoyable for everyone.</li>
                <li><strong>Growth and Expansion:</strong> We aspire to expand our reach, connecting more customers with premium products across different regions.</li>
              </ul>`
		},
		{
			id: 'future-goals',
			title: 'Our Future Goals',
			content: `<p>As Beuzibah Stores continues to grow, we aim to:</p>
              <ul>
                <li>Enhance our digital platform for a smoother shopping experience.</li>
                <li>Expand our product categories to cater to diverse customer needs.</li>
                <li>Introduce localized shipping solutions for faster and more efficient deliveries.</li>
                <li>Strengthen our partnerships with global and local brands.</li>
                <li>Build a community-driven platform where customer feedback shapes our offerings.</li>
              </ul>
              <p>With a forward-thinking approach and unwavering dedication, Beuzibah Stores is poised to become a household name in e-commerce.</p>`
		}
	];
</script>

<Educational pages={educationalList} title="Vision" {sections} lastUpdated="January 30, 2025" />
