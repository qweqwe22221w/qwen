const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to serve static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Sample data for VPN providers
let vpnProviders = [
  {
    id: 1,
    name: 'NordVPN',
    description: 'Top-rated VPN service with strong security features and wide server network.',
    link: 'https://www.nordvpn.com/',
    price: '$3.99/mo',
    rating: 4.8
  },
  {
    id: 2,
    name: 'ExpressVPN',
    description: 'Fast and reliable VPN with excellent privacy protection and streaming capabilities.',
    link: 'https://www.expressvpn.com/',
    price: '$6.67/mo',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Surfshark',
    description: 'Affordable VPN with unlimited device connections and strong security.',
    link: 'https://surfshark.com/',
    price: '$2.49/mo',
    rating: 4.6
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { vpnProviders });
});

app.get('/admin', (req, res) => {
  res.render('admin', { vpnProviders });
});

app.post('/admin/update', (req, res) => {
  const { id, name, description, link, price, rating } = req.body;
  
  const providerIndex = vpnProviders.findIndex(provider => provider.id == id);
  if (providerIndex !== -1) {
    vpnProviders[providerIndex] = {
      ...vpnProviders[providerIndex],
      name,
      description,
      link,
      price,
      rating: parseFloat(rating)
    };
    res.redirect('/admin?updated=true');
  } else {
    res.status(404).send('Provider not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});