# Backend Services

Serverless API endpoints and business logic for the online grocery platform.

## Architecture
- **Framework**: Node.js with TypeScript
- **Hosting**: Vercel Edge Functions
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh

### Products
- `GET /api/products` - Get product list
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `GET /api/orders/admin` - Get all orders (Admin)

## Development
```bash
npm install
npm run dev
```

## Deployment
Auto-deploys to Vercel on push to main branch.