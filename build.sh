#!/bin/bash

# Build script for Sam's Goods LLC website

echo "Building Sam's Goods LLC website for production..."

# Install dependencies
pnpm install

# Build the website
pnpm build

echo "Build completed successfully!"

