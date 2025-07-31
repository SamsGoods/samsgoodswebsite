#!/bin/bash

# Deployment script for Sam's Goods LLC website

echo "Deploying Sam's Goods LLC website to Vercel..."

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null
then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (this will open a browser window)
echo "Logging in to Vercel..."
vercel login Samsgoodshelp@gmail.com

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment completed successfully!"
echo "Your website is now live at: https://samsgoods.vercel.app"

