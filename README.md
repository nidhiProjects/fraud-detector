# Catch the Fake

*Catch the Fake* is an interactive web game where users must identify whether a displayed image is *fake or genuine. The game is engaging, score-based, and ends with a dynamic **leaderboard* showcasing top players. Built with React and Firebase, it includes slick animations and responsive design for a smooth user experience.

## Features

- ✅ Image-based fake vs genuine challenge
- ✅ Score system: +5 for correct, -5 for incorrect
- ✅ Animated drag interactions (using Framer Motion)
- ✅ Carousel of images (Slick Slider)
- ✅ Real-time leaderboard
- ✅ Firebase Authentication & Database
- ✅ Screenshot capture of results using html2canvas
- ✅ Responsive UI styled with Tailwind CSS
- ✅ Sleek icons via Lucide Icons

## Tech Stack

| Frontend        | Backend           | Others                        |
|-----------------|-------------------|-------------------------------|
| React.js        | Firebase (Auth + DB) | Tailwind CSS                  |
| Framer Motion   |                   | Slick Slider                  |
| Lucide Icons    |                   | html2canvas (for screenshot)  |

## Installation

1. *Clone the repository*
   ```bash
   git clone https://github.com/nidhiProjects/fraud-detector.git
   cd fraud-detector

2. Install dependencies

npm install


3. Set up Firebase

Create a Firebase project

Enable Authentication (Email/Password or Google)

Set up Firestore Database

Create a .env file and add your Firebase config:

VITE_SOME_API_KEY=your_api_key
VITE_SOME_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_SOME_PROJECT_ID=your_project_id
VITE_SOME_STORAGE_BUCKET=your_project.appspot.com
VITE_SOME_MESSAGING_SENDER_ID=your_sender_id
VITE_SOME_APP_ID=your_app_id



4. Run the app

npm run dev


How to Play

1. Log in or sign up.


2. View the image and decide if it's real or fake.


3. Drag or click to select your choice.


4. Score updates in real-time.


5. At the end, view your ranking on the leaderboard.


6. Save a screenshot of your score to share with friends.

#### Live Demo
[Live Demo]( https://fraud-detector-dj.netlify.app/)