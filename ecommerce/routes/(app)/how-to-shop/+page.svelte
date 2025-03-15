<script lang="ts">
	import Educational from '$lib/components/frontend/Educational.svelte';
	import { educationalList } from '$lib/constants';

	const sections = [
		{
			id: 'introduction',
			title: 'Introduction',
			content: `<p>Shopping at Beuzibah Stores is designed to be seamless and convenient. Follow this guide to learn how to browse, select, and purchase your favorite fashion, beauty, and appliance products with ease.</p>`
		},
		{
			id: 'creating-an-account',
			title: 'Creating an Account',
			content: `<p>To enjoy a personalized shopping experience, we recommend creating an account:</p>
              <ul>
                <li>Click on the 'Sign Up' button at the top right corner of our website.</li>
                <li>Enter your name, email address, and a secure password.</li>
                <li>Verify your email to activate your account.</li>
                <li>Log in to access your personalized dashboard.</li>
              </ul>`
		},
		{
			id: 'browsing-products',
			title: 'Browsing Products',
			content: `<p>Explore our wide range of products using the following features:</p>
              <ul>
                <li><strong>Search Bar:</strong> Enter keywords to find specific products.</li>
                <li><strong>Categories:</strong> Browse through fashion, beauty, and appliances.</li>
                <li><strong>Filters:</strong> Sort products by price, brand, ratings, and more.</li>
                <li><strong>Product Details:</strong> Click on any product for more images, descriptions, and reviews.</li>
              </ul>`
		},
		{
			id: 'adding-to-cart',
			title: 'Adding to Cart',
			content: `<p>Once you find the perfect item, follow these steps to add it to your cart:</p>
              <ul>
                <li>Select the desired size, color, or variation (if applicable).</li>
                <li>Click the 'Add to Cart' button.</li>
                <li>View your cart anytime by clicking the cart icon at the top of the page.</li>
                <li>Adjust quantities or remove items as needed before proceeding to checkout.</li>
              </ul>`
		},
		{
			id: 'checkout-process',
			title: 'Checkout Process',
			content: `<p>Securely complete your purchase by following these steps:</p>
              <ul>
                <li>Click the 'Checkout' button in your cart.</li>
                <li>Enter your shipping and billing details.</li>
                <li>Choose your preferred payment method (credit card, PayPal, bank transfer, etc.).</li>
                <li>Review your order summary to ensure accuracy.</li>
                <li>Click 'Place Order' to finalize your purchase.</li>
              </ul>`
		},
		{
			id: 'order-confirmation',
			title: 'Order Confirmation',
			content: `<p>After placing your order, you will receive:</p>
              <ul>
                <li>A confirmation email with your order details.</li>
                <li>A tracking number once your order is shipped.</li>
                <li>Real-time order updates via email or SMS.</li>
              </ul>`
		},
		{
			id: 'shipping-and-delivery',
			title: 'Shipping and Delivery',
			content: `<p>We offer fast and reliable delivery services. Here’s what you need to know:</p>
              <ul>
                <li>Delivery times vary based on location and shipping method.</li>
                <li>Tracking details will be provided via email.</li>
                <li>For express delivery, select our priority shipping option at checkout.</li>
              </ul>`
		},
		{
			id: 'returns-and-exchanges',
			title: 'Returns and Exchanges',
			content: `<p>Your satisfaction is our priority. If you're not happy with your purchase:</p>
              <ul>
                <li>You can return items within 14 days of delivery.</li>
                <li>Ensure products are in their original condition with tags and packaging.</li>
                <li>Initiate a return request from your account dashboard.</li>
                <li>Refunds are processed within 5-7 business days after we receive the item.</li>
              </ul>`
		},
		{
			id: 'customer-support',
			title: 'Customer Support',
			content: `<p>Need assistance? Our support team is available to help:</p>
              <p><strong>Email:</strong> beuzibahz@gmail.com</p>
              <p><strong>Address:</strong> 4 Silifat Abioye St, Ojodu, Lagos 101233, Lagos</p>
              <p><strong>Phone:</strong> <a href="tel:+2348066514072">+2348066514072</a></p>
              `
		}
	];
</script>

<Educational pages={educationalList} title="How to Shop" {sections} lastUpdated="January 30, 2025" />
