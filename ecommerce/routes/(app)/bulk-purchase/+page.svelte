<script lang="ts">
	import Educational from '$lib/components/frontend/Educational.svelte';
	import { educationalList } from '$lib/constants';

	const sections = [
		{
			id: 'introduction',
			title: 'Introduction',
			content: `<p>At Beuzibah Stores, we ensure that your orders are delivered safely and efficiently. Since our customers are located in different regions with unique delivery preferences, we offer flexible shipping options tailored to your needs.</p>`
		},
		{
			id: 'order-processing',
			title: 'Order Processing',
			content: `<p>Once your order is placed, it will be processed within 24-48 hours. You will receive an order confirmation email containing your purchase details.</p>`
		},
		{
			id: 'customized-delivery',
			title: 'Customized Delivery',
			content: `<p>Because our customers have different shipping needs, we allow you to discuss and finalize your preferred delivery method directly with the seller. Follow these steps:</p>
              <ul>
                <li>Click on the WhatsApp icon on our website.</li>
                <li>Reach out to the seller with your order number.</li>
                <li>Discuss your delivery preferences, including location, time, and mode of shipment.</li>
                <li>Confirm the final delivery arrangement before dispatch.</li>
              </ul>`
		},
		{
			id: 'delivery-options',
			title: 'Delivery Options',
			content: `<p>We offer multiple delivery options to suit your needs:</p>
              <ul>
                <li><strong>Standard Delivery:</strong> Takes 3-7 business days depending on your location.</li>
                <li><strong>Express Delivery:</strong> Available for select locations, ensuring delivery within 24-48 hours.</li>
                <li><strong>Pick-Up Option:</strong> If you prefer, you can arrange to pick up your order from a designated location.</li>
              </ul>`
		},
		{
			id: 'tracking-your-order',
			title: 'Tracking Your Order',
			content: `<p>After your order is shipped, you will receive a tracking number via email or WhatsApp. You can use this to monitor your delivery status in real time.</p>`
		},
		{
			id: 'delivery-fees',
			title: 'Delivery Fees',
			content: `<p>Delivery fees vary based on location and shipping method. The exact cost will be discussed and agreed upon with the seller during the WhatsApp conversation.</p>`
		},
		{
			id: 'delivery-issues',
			title: 'Delivery Issues & Support',
			content: `<p>If you encounter any issues with your delivery, please contact our support team:</p>
              <ul>
                <li><strong>WhatsApp:</strong> Use the icon on our website for instant support.</li>
                <li><strong>Email:</strong> beuzibahz@gmail.com</li>
                <li><strong>Phone:</strong> +234 800 123 4567</li>
              </ul>`
		},
		{
			id: 'bulk-purchase',
			title: 'Bulk Purchase',
			content: `<p>Beuzibah Stores offers exclusive deals and discounts for bulk buyers, whether you're a business, reseller, or organizing a special event. Enjoy the convenience of ordering large quantities at competitive prices.</p>
              <p>To ensure a seamless bulk purchase experience, follow these steps:</p>
              <ul>
                <li><strong>Reach Out:</strong> Contact the seller directly via the WhatsApp icon on our website to discuss your bulk order requirements.</li>
                <li><strong>Get a Quote:</strong> Receive a customized price quote based on the quantity and product selection.</li>
                <li><strong>Finalize Payment & Shipping:</strong> Agree on the best shipping method and confirm payment details.</li>
                <li><strong>Order Processing & Delivery:</strong> Your bulk order will be processed and shipped as per your preferred arrangement.</li>
              </ul>
              <p>For special bulk discounts or partnership inquiries, please contact us at <strong>beuzibahz@gmail.com</strong>.</p>`
		}
	];
</script>

<Educational
	pages={educationalList}
	title="Bulk Purchase"
	{sections}
	lastUpdated="January 30, 2025"
/>
