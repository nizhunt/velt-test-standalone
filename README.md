## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd velt-test-standalone
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Get your Velt API key:

   - Go to [Velt Console](https://console.velt.dev/)
   - Sign up or log in to your account
   - Create a new project or select an existing one
   - Copy your API key from the project settings

3. Update `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_VELT_API_KEY=your_actual_velt_api_key_here
   ```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:4004](http://localhost:4004).
