# 📅 Interactive Wall Calendar Component

A polished, responsive, and interactive **Wall Calendar UI component** built using **React / Next.js**, inspired by a physical wall calendar design. This project focuses on delivering a premium user experience with clean UI, smooth interactions, and practical functionality.

---

## 🎯 Objective

This project demonstrates the ability to transform a static design concept into a fully functional, responsive, and user-friendly frontend component.

---

## ✨ Features

### 🖼 Wall Calendar Aesthetic

* Real-world wall calendar inspired UI
* Hero image as a visual anchor
* Clean layout with strong visual hierarchy

### 📅 Date Range Selection

* Select start and end dates
* Highlight:

  * Start date
  * End date
  * Dates in between
* Handles edge cases (same date, reverse selection)

### 📝 Notes Section

* Add notes for:

  * Entire month OR selected range
* Edit and update notes
* Data persistence using `localStorage`

### 📱 Fully Responsive Design

* Desktop: Split layout (image + calendar + notes)
* Mobile: Stacked layout for touch usability
* Smooth transitions across screen sizes

---

## 🚀 Live Demo

👉 https://wall-calendar-mauve-two.vercel.app/

---

**Demo covers:**

* Date range selection
* Notes functionality
* Responsive behavior (desktop + mobile)

---

## 🛠 Tech Stack

* **Frontend:** React / Next.js
* **Styling:** Tailwind CSS / Custom CSS
* **Date Handling:** date-fns / dayjs
* **State Management:** React Hooks
* **Persistence:** localStorage

---

## 📂 Project Structure

```
/components
  ├── CalendarGrid.jsx
  ├── DateCell.jsx
  ├── CalendarHeader.jsx
  ├── HeroImage.jsx
  ├── NotesPanel.jsx

/pages
  ├── index.js

/styles
  ├── globals.css
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

## 🧠 Key Implementation Details

### 🔹 Date Range Logic

* Uses state:

  ```js
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  ```
* Dynamically highlights selected range

### 🔹 Notes Persistence

* Stored in `localStorage`
* Auto-loads on page refresh

### 🔹 Responsive Design

* CSS Grid + Flexbox
* Media queries / Tailwind breakpoints

---

## 🎨 UX Enhancements

* Smooth hover and click interactions
* Clean spacing and typography
* Visual feedback for selected dates
* Mobile-friendly touch interactions

---

## 🚀 Bonus Features (Optional Enhancements)

* Month navigation (prev/next)
* Dark/Light theme toggle
* Holiday/weekend highlighting
* Animated transitions

---

## 📌 Constraints Followed

* ❌ No backend used
* ✅ Fully frontend implementation
* ✅ Data handled via localStorage

---

## 📈 Evaluation Readiness

This project is built with focus on:

* Clean and maintainable code
* Modular component architecture
* Strong UI/UX design
* Responsive behavior across devices

---

## 🙌 Author

**Amit Kumar**
Frontend Developer | React | Next.js

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
