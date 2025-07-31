# Sam's Goods LLC Website

A complete e-commerce website for Sam's Goods LLC, featuring custom clothing products and rap beats with multiple pricing tiers.

## Features

- Modern, responsive user interface
- Product pages for custom clothing (T-shirts, hoodies, mugs)
- Rap beats with 3 pricing tiers: Basic, Premium, and Exclusive
- Custom design upload functionality
- AI chatbot for customer assistance
- Shopping cart and checkout with multiple payment options:
  - Stripe
  - PayPal
  - Cryptocurrency
- Product image galleries with clear categories and pricing
- Audio player to preview rap beats before purchase
- Order confirmation emails
- Standard pages: Home, About, FAQ, Contact
- SEO optimization

## Tech Stack

- React.js
- Tailwind CSS
- Vite
- React Router
- Stripe API
- PayPal API
- NOWPayments API
- EmailJS
- Tidio Chat

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/sams-goods-website.git
   cd sams-goods-website
   ```

2. Install dependencies
   ```
   pnpm install
   ```

3. Start the development server
   ```
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```
./build.sh
```

This will create a `dist` folder with the production-ready website.

### Deployment

To deploy the website to Vercel:

```
./deploy.sh
```

This will deploy the website to Vercel and make it accessible at `https://samsgoods.vercel.app`.

## Configuration

### Payment Gateways

The website is configured to use the following payment gateways:

- **Stripe**: Update the API keys in `src/services/payment/stripeService.js`
- **PayPal**: Update the client ID in `src/services/payment/paypalService.js`
- **NOWPayments**: Update the API key in `src/services/payment/cryptoService.js`

### Contact Form

The contact form uses EmailJS. Update the service ID and template ID in `src/components/contact/ContactForm.jsx`.

### Chat Widget

The AI chatbot uses Tidio. Update the Tidio key in `src/components/chat/ChatbotWidget.jsx`.

## Customization

### Adding Products

To add new products, update the product data in `src/data/products.js`.

### Adding Beats

To add new beats, update the beats data in `src/data/beats.js`.

### Changing Colors and Styles

The website uses Tailwind CSS for styling. You can customize the colors and styles in `tailwind.config.js`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact Samsgoodshelp@gmail.com.

