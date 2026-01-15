# WikiFlow: Product and Tester Manual

## 1. Introduction

Welcome to WikiFlow! This document serves as a comprehensive guide for testers and stakeholders to understand the application's current features and functionality.

**CRITICAL NOTE:** This version of the application uses an **in-memory data store**. This means that any pages you create, edits you make, or links you add will be **lost when you refresh your browser or restart the application.** The primary purpose of this build is to test UI, user flow, and AI functionality without database persistence.

---

## 2. Authentication

The application uses a simulated authentication system to mimic a real user experience.

### Logging In
You can log in in two ways:

1.  **Email & Password:**
    -   Navigate to the `/login` page.
    -   You can use any email and password. The form is pre-filled with `user@example.com` and `password` for convenience.
    -   Clicking "Log In" will start a new session and redirect you to the dashboard.

2.  **Google Login (Simulated):**
    -   Click the **"Continue with Google"** button.
    -   This will log you in as a mock Google user (`user@google.com`) and redirect you to the dashboard. No actual Google authentication occurs.

### Signing Up
- The `/signup` page functions similarly to the login page. Entering any email and password will create a new session and log you in.

### Logging Out
- Click on your user avatar in the top-right corner of the application header.
- Select **"Logout"** from the dropdown menu.
- Your session will be terminated, and you will be redirected to the login page.

---

## 3. The Dashboard

The dashboard is the central hub for your workspace, providing quick access to key actions and resources.

### Core Actions

-   **Create a new page:** Located in the top-left card. Clicking this button instantly creates a new, untitled page and navigates you to the editor.
-   **Invite Members:** This button links to the "Members" tab in the Settings page. The functionality for inviting users is not yet implemented.

### Quick Links

This is a dynamic section for organizing important resources.

#### Manually Adding a Resource

You can add any link to this section.

1.  Click the **"Add Resource"** button.
2.  A dialog form will appear with the following fields:
    -   **Title:** The display name for your link (e.g., "Q4 Marketing Plan").
    -   **URL:** The destination URL.
    -   **Type:** Choose the resource type to assign the correct icon (`Website Link`, `Google Drive Folder`, or `Google Drive Doc`).
    -   **Category:** Select an existing category from the dropdown or choose **"Create a new category"** to add a new one.
3.  Click **"Add Resource"** to save it. The link will immediately appear under the correct category in the accordion.

#### Automated Drive Scanning (AI Feature)

This feature uses an AI agent to simulate finding and organizing files from a Google Drive.

1.  Click the **"Scan for Drive Files"** button. A toast notification will appear to indicate the scan is in progress.
2.  The application will call a mock service that returns a list of predefined Google Drive files.
3.  An AI flow analyzes the file names and intelligently assigns a business category (e.g., "Operations", "Marketing", "Finance", "Product").
4.  The discovered files are automatically added to the "Quick Links" section under their new categories. If a category doesn't exist, it will be created.

---

## 4. Page Management

This is the core feature of the wiki.

### Creating a Page

-   **From the Dashboard:** Click the "Create a new page" button.
-   **From the Sidebar:** Click the `+` icon next to the "Pages" label in the sidebar. This will open a dialog where you can choose a **Parent Page**.
    -   Selecting **"Root"** places the page at the top level.
    -   Selecting another page makes the new page a sub-page (nested).

### Editing a Page

-   Navigate to any page by clicking its title in the sidebar.
-   **Title:** The page title at the top of the editor is an input field. You can click on it and type to change the title.
-   **Content:** The main body of the page is a large text area where you can write and edit content.

### Saving and Organizing a Page

1.  After making changes to the title or content, click the **"Save"** button in the top-right corner.
2.  A dialog will appear, prompting you to select a **Parent Page**. This allows you to confirm or change the page's location within the hierarchy.
3.  Click **"Save Changes"**. The page's content is saved (for the current session), and its position in the sidebar will update according to the parent you selected.

---

## 5. Navigation

### Sidebar
-   The sidebar on the left provides a tree-like view of all pages.
-   Parent pages with children are displayed as collapsible sections.
-   The sidebar is fully responsive and collapses into an icon-based menu on larger screens.

### Breadcrumbs
-   Located in the header, the breadcrumb trail shows your current position in the page hierarchy (e.g., `Workspace > Engineering > Frontend Guidelines`).
-   It updates automatically as you navigate through pages.

---

Thank you for testing WikiFlow! Your feedback is crucial for its development.