<script lang="ts">
	import Educational from '$lib/components/frontend/Educational.svelte';
	import { educationalList } from '$lib/constants';

	const sections = [
		{
			id: 'mission',
			title: 'Our Mission',
			content: `<p>At Beuzibah Stores, our mission is to empower individuals with access to high-quality fashion, beauty, and home essentials while providing a seamless and enjoyable shopping experience. We are committed to:</p>
              <ul>
                <li><strong>Delivering Quality:</strong> Ensuring that every product we offer meets the highest standards of excellence.</li>
                <li><strong>Enhancing Convenience:</strong> Making shopping easy and accessible through our user-friendly online platform.</li>
                <li><strong>Providing Affordability:</strong> Offering competitive prices without compromising on quality.</li>
                <li><strong>Innovating in E-Commerce:</strong> Continuously improving our platform, services, and product range to meet the evolving needs of our customers.</li>
                <li><strong>Customer-Centric Approach:</strong> Building trust and long-term relationships by prioritizing customer satisfaction and support.</li>
              </ul>`
		},
		{
			id: 'customer-experience',
			title: 'Exceptional Customer Experience',
			content: `<p>At the heart of our mission is a dedication to delivering an outstanding customer experience. We achieve this by:</p>
              <ul>
                <li>Providing clear and accurate product descriptions to help customers make informed choices.</li>
                <li>Ensuring secure payment options for a smooth and safe checkout process.</li>
                <li>Offering flexible and reliable delivery methods tailored to customer preferences.</li>
                <li>Maintaining an open line of communication through our WhatsApp support, email, and phone assistance.</li>
              </ul>`
		},
		{
			id: 'growth-and-impact',
			title: 'Growth and Community Impact',
			content: `<p>Beyond just selling products, Beuzibah Stores is committed to making a positive impact. Our mission includes:</p>
              <ul>
                <li>Supporting small businesses and local suppliers by featuring their products on our platform.</li>
                <li>Expanding our product selection to meet the diverse needs of customers across different regions.</li>
                <li>Encouraging sustainable shopping practices by promoting eco-friendly products.</li>
                <li>Creating job opportunities and contributing to the growth of the digital economy.</li>
              </ul>
              <p>Through innovation, dedication, and a passion for excellence, we aim to redefine the e-commerce experience and become a household name in online shopping.</p>`
		}
	];
</script>

<Educational pages={educationalList} title="Mission" {sections} lastUpdated="January 30, 2025" />
