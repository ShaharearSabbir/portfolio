import rootRhythom from "../assets/rootRhythm.webp";
import learnOsphere from "../assets/LearnOsphere.webp";
import appify from "../assets/appify.webp";

export const PROJECTS = [
  {
    id: "project-1",
    name: "Root Rhythm (Full Stack Plant Care tracking Platform)",
    shortDescription:
      "A comprehensive MERN stack web application designed to be your digital plant care assistant. It empowers plant enthusiasts to effortlessly manage their botanical collection, track care tasks, and set reminders, ensuring healthy, thriving plants and peace of mind.",
    topFeatures: [
      "Personalized Plant Management",
      "Automated Care Reminders:",
      "One Click Authentication",
      "Mobile-Responsive:",
      "Personal Dashboard",
    ],
    usedLibraries: ["React", "MongoDB", "Express.js", "Firebase", "DaisyUI"],
    image: rootRhythom,
    liveLink: "https://root-rhythm.web.app",
    githubLink: "https://github.com/ShaharearSabbir/root-rhythm-client",
    details: {
      category: "Plant Management",
      fullDescription:
        "Root Rhythm is a personalized plant management system designed to help users track and maintain the health of their plants. The application features a comprehensive dashboard where users can view an overview of total users and plants managed. Users can sign in securely with Google via Firebase Authentication. A key feature is the ability to track a plant's health status, with options like 'Healthy', 'Stressed', 'Diseased', 'Pest-Infested', 'Recovering', and 'Declining/Dying'. The platform is built with a mobile-first approach to ensure optimal usability across all devices. Users can add new plants, manage existing ones, and view a log of watering schedules and health updates, making plant care intuitive and efficient.",
      clientSideTech: [
        "React",
        "Vite",
        "Tailwind CSS",
        "DaisyUI",
        "Lottie React",
        "React CountUp",
        "React Simple Typewriter",
        "React Chart JS 2",
        "Firebase (for authentication)",
      ],
      serverSideTech: ["Express.js", "JWT"],
      databaseTech: "MongoDB",
      authenticationTech:
        "Firebase (initial user authentication), JWT (secure API calls)",
      keyFeatures: [
        "Personalized Plant Profiles with Watering Log & Health Status Tracking",
        "Personal Dashboard providing a quick overview of user and platform data",
        "Mobile-First Design Approach ensuring optimal usability on all devices",
      ],
      challengesLearned:
        "Implementing filtering, sorting, and API query parameters for dynamic data retrieval was a significant first-time challenge.",
      futureEnhancements: [
        "Implement automatic notifications for watering reminders.",
        "Add a dedicated notes feature for tracking specific plant health status and observations.",
      ],
      deployment: {
        client: "Firebase Hosting",
        backend: "Vercel",
      },
      testingStrategy: "Manual testing was performed.",
      responsiveDesign: true,
    },
  },
  {
    id: "project-2",
    name: "LearnOsphere (Full Stack Online Course Platform)",
    shortDescription:
      "An innovative online learning platform designed to provide a seamless and engaging educational experience. It offers a wide range of courses and resources to help users acquire new skills and knowledge at their own pace.",
    topFeatures: [
      "Diverse Course Catalog",
      "Interactive Learning",
      "User-Friendly Interface",
      "Responsive Design",
      "Secure Data Fetching",
    ],
    usedLibraries: [
      "React",
      "Tailwind CSS",
      "Firebase",
      "Express.js",
      "MongoDB",
      "React Router",
      "Axios",
      "JWT",
    ],
    image: learnOsphere,
    liveLink: "https://learn-osphere.web.app",
    githubLink: "https://github.com/ShaharearSabbir/LearnOsphere-client",
    details: {
      category: "E-learning Platform",
      fullDescription:
        "LearnOsphere is a robust full-stack online course platform enabling instructors to create and manage courses, and students to enroll and learn. The platform features a comprehensive 'Add New Course' form that allows instructors to define course titles, descriptions, durations, thumbnails, and assign them to categories like Web Development, Data Science, Marketing, Graphic Design, or Business. Courses can be set as free or have a regular and discount price, supporting multiple currencies such as USD, EUR, GBP, and JPY. Users can enroll in courses, with a unique limit of three active enrollments at a time. The platform also includes a dedicated blog section where content can be created using a rich text editor. Security is handled via JWT for API calls, and users can manage their enrolled courses, including the option to un-enroll.",
      clientSideTech: [
        "React",
        "Vite",
        "Tailwind CSS",
        "DaisyUI",
        "Jodit React (for blog content)",
        "React Router DOM",
        "React Simple Typewriter",
        "React Chart JS 2",
        "Firebase (for authentication)",
      ],
      serverSideTech: ["Express.js", "JWT"],
      databaseTech: "MongoDB",
      authenticationTech:
        "Firebase (user authentication), JWT (secure API calls)",
      keyFeatures: [
        "Comprehensive Course Catalog with Categorization & Flexible Pricing (Free/Paid options)",
        "Secure User Authentication (JWT) & Authorization for protected routes and user data",
        "Course Enrollment & Management, including a 3-course enrollment limit and unenrollment ('discard') functionality",
        "Integrated Course Reviews & Ratings System for user feedback",
        "Dedicated Blog Section with Rich Text Content, allowing for dynamic blog post creation",
        "Responsive Design ensuring a seamless experience across various devices",
      ],
      challengesLearned:
        "A major challenge was implementing secure API calls for the first time, leading to a switch from problematic Firebase access tokens to JWT. Mastering MongoDB aggregation pipelines and transactions for atomicity also proved to be complex.",
      futureEnhancements: [
        "Implement comprehensive course progress tracking functionality, allowing users to track their learning within courses.",
      ],
      deployment: {
        client: "Firebase Hosting",
        backend: "Vercel",
      },
      testingStrategy: "Manual testing was performed.",
      responsiveDesign: true,
    },
  },
  {
    id: "project-3",
    name: "Appify (Front-end AppStore Application)",
    shortDescription:
      "A modern and responsive front-end application for an app store, built with React and Vite, featuring a sleek UI, dynamic content display, and user interaction capabilities.",
    topFeatures: [
      "App Listing and Display",
      "Friendly User Interface",
      "Routing for Navigation",
      "Notifications",
      "Content Carousels",
    ],
    usedLibraries: [
      "React",
      "Vite",
      "DaisyUI",
      "Tailwind CSS",
      "Firebase",
      "React Router",
      "Swiper",
    ],
    image: appify,
    liveLink: "https://appify-10c0d.web.app/",
    githubLink: "https://github.com/ShaharearSabbir/Appify",
    details: {
      category: "Frontend App Store",
      fullDescription:
        "Appify is a modern frontend app store application designed to showcase various applications and allow user interaction. Users can browse app listings and view detailed information. A key interactive feature is the 'Install' button for each app, which simulates an installation process. Following installation, users gain the ability to submit ratings using a star system and write detailed reviews for the apps. The platform uses Firebase for secure user authentication, requiring users to be logged in to view app details and to submit ratings or reviews. All app data is currently managed using fake JSON data, as the application is frontend-driven without a live backend.",
      clientSideTech: [
        "React",
        "Vite",
        "Tailwind CSS",
        "DaisyUI",
        "Lottie React",
        "React Simple Typewriter",
        "React Chart JS 2",
        "Firebase (for authentication)",
        "React Router DOM",
        "Auth Context",
        "useEffect",
      ],
      serverSideTech: [],
      databaseTech: "",
      authenticationTech: [
        "Firebase (user authentication, conditional access)",
      ],
      keyFeatures: [
        "Interactive App Listing allowing users to browse and view detailed information for applications.",
        "Simulated Installation feature where users can 'install' apps, triggering conditional access to further functionalities.",
        "App Rating & Review System enabling users to provide star ratings and write comments for installed applications.",
        "Secure User Authentication (Firebase) where login is required for viewing app details, rating, and reviewing.",
        "Frontend-Driven Data Management, with app information displayed from local JSON data.",
        "Intuitive UI with Interactive Components for enhanced user experience.",
        "Responsive Design to ensure usability across various screen sizes.",
      ],
      challengesLearned:
        "The most significant technical challenge was the first-time implementation of authentication context and private routes in React, which required extensive effort and learning.",
      futureEnhancements: [
        "Add a full backend to make the app dynamic and manage app data persistently.",
      ],
      deployment: "Netlify",
      testingStrategy: "Manual testing was performed.",
      responsiveDesign: true,
    },
  },
];
