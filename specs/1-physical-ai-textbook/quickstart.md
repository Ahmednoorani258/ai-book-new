# Quickstart Guide: Physical AI & Humanoid Robotics Textbook

**Branch**: `1-physical-ai-textbook` | **Date**: 2025-12-05 | **Spec**: specs/1-physical-ai-textbook/spec.md

## Summary

This guide provides instructions to set up, run, and build the "Physical AI & Humanoid Robotics — The Embodied Intelligence Textbook" Docusaurus project locally.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

- **Git**: For cloning the repository.
- **Node.js**: Version 18.x or higher (which includes npm).

## 2. Setup Instructions

Follow these steps to get the project running on your local machine:

### 2.1 Clone the Repository

```bash
git clone <repository-url>
cd <repository-name> # e.g., cd ai-book-new
```

### 2.2 Install Dependencies

Navigate to the project root and install the Docusaurus dependencies:

```bash
npm install
```

## 3. Running the Project

### 3.1 Start Development Server

To start the local development server and view the website in your browser, run:

```bash
npm start
```

This will open a new browser window at `http://localhost:3000`. Any changes you make to the content will be hot-reloaded.

### 3.2 Build the Project

To build the static HTML, CSS, and JavaScript files for production, run:

```bash
npm run build
```

The built files will be located in the `/build` directory.

## 4. Project Structure Overview

Key directories for content and configuration:

- `/docs/`: Contains all the textbook content organized by modules, chapters, and sections.
- `/static/img/`: Stores all images and diagrams used in the textbook.
- `/src/docusaurus-theme/`: Customizations for the Docusaurus theme and landing page.
- `docusaurus.config.js`: Main Docusaurus configuration file.
- `sidebar.js`: Defines the structure and order of the documentation sidebar.

## 5. Next Steps

- Start exploring the content by navigating through the sidebar in your browser.
- Begin contributing by adding new modules, chapters, or sections following the defined specification.

