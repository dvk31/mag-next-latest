// Peeqshop How It Works Component - Next.js

'use client';

import React from 'react';

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h1>How Peeqshop Works</h1>
      
      <div className="section">
        <h2>🏪 Space Provider Onboarding</h2>
        <p>Local businesses register on the Peeqshop platform, purchase and install an interactive video kiosk, and set up their inventory management system.</p>
      </div>
      
      <div className="section">
        <h2>📦 Supplier Integration</h2>
        <p>Online sellers list products on Peeqshop, distribute inventory to local space providers, and upload engaging product videos for kiosks.</p>
      </div>
      
      <div className="section">
        <h2>🛍️ Customer Experience</h2>
        <p>Customers can discover products on in-store kiosks or online, scan QR codes for detailed information and purchasing options, and choose between immediate in-store pickup or delivery.</p>
      </div>
      
      <div className="section">
        <h2>🚚 Order Fulfillment</h2>
        <p>Suppliers receive orders from e-commerce channels, select the nearest space provider for fulfillment, and the space provider packs and ships the order.</p>
      </div>
      
      <div className="section">
        <h2>📊 Data and Insights</h2>
        <p>Track customer interactions and sales data to optimize inventory distribution, marketing strategies, and personalize offers based on customer behavior.</p>
      </div>
      
      <div className="section">
        <h2>💰 Revenue Sharing</h2>
        <p>Space providers earn commissions on sales and fulfillment, suppliers benefit from reduced costs and expanded reach, and Peeqshop facilitates all transactions and platform maintenance.</p>
      </div>

      <style jsx>{`
        .how-it-works {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .section {
          margin-bottom: 20px;
        }
        h1 {
          text-align: center;
        }
        h2 {
          margin-bottom: 10px;
        }
        p {
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;