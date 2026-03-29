export const config = {
    developer: {
        name: "Vikrant",
        fullName: "Vikrant Sharma",
        title: "Data Engineer & Cybersecurity Analyst",
        description: "Master's student at UniSC Adelaide. I build secure data systems, ML pipelines, and full-stack applications. NASA Space Challenge App winner.",
    },
    social: {
        github: "Vikrant892",
        email: "vikrantsharma892@gmail.com",
        location: "Adelaide, South Australia"
    },
    about: {
        title: "About Me",
        description: "Data Engineer and Cybersecurity Analyst based in Adelaide. I build threat detection systems, ML pipelines, and secure applications. Master's student at UniSC. NASA hackathon winner. Competitive gamer."
    },
    experiences: [
        {
            position: "Master's of Information Technology",
            company: "University of the Sunshine Coast (UniSC)",
            period: "2025 - Present",
            location: "Adelaide, Australia",
            description: "Postgraduate studies in IT with a focus on data systems, software engineering, and cybersecurity. Awarded 15% International Student Scholarship. Also serving as Student Mentor and Club Treasurer.",
            responsibilities: [
                "Advanced coursework in data systems and software engineering",
                "15% International Student Scholarship recipient",
                "Student Mentor — supporting first-year students with orientation and academics",
                "Club Treasurer — managing budget, vendor payments, and finance records"
            ],
            technologies: ["Data Systems", "Software Engineering", "Cybersecurity", "Research"]
        },
        {
            position: "Data Engineer",
            company: "Nagarro",
            period: "Dec 2024 - Feb 2025",
            location: "Adelaide, Australia",
            description: "Designed and optimised data models for AWS Redshift and Snowflake data lakes. Participated in Agile/Scrum ceremonies and delivered analytics solutions for business stakeholders.",
            responsibilities: [
                "Designed and optimised data models and schemas for data lakes and warehouses",
                "Collaborated with data scientists and analysts to gather requirements",
                "Contributed to sprint planning, stand-ups, and retrospectives",
                "Delivered scalable analytics pipelines for enterprise clients"
            ],
            technologies: ["Python", "SQL", "AWS Redshift", "Snowflake", "ETL", "Agile"]
        },
        {
            position: "Cybersecurity Junior Analyst",
            company: "AT SecurDI",
            period: "May 2023 - Dec 2023",
            location: "Ahmedabad, India",
            description: "Security monitoring, incident response, and vulnerability assessments using SIEM tools. Performed OWASP Top 10 testing and supported ISO 27001/NIST CSF compliance audits.",
            responsibilities: [
                "SIEM monitoring, alert triage, and incident response runbooks",
                "Vulnerability scans and OWASP Top 10 web/app testing",
                "ISO 27001 and NIST CSF compliance audits and evidence preparation",
                "Authored and maintained security playbooks and procedures"
            ],
            technologies: ["SIEM", "OWASP", "NIST CSF", "ISO 27001", "Threat Detection", "Incident Response"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "Phishing Detection Platform",
            category: "Cybersecurity",
            technologies: "PHP, Python, ML, MySQL, REST API",
            image: "/images/phishing.png",
            github: "https://github.com/Vikrant892",
            live: "",
            description: "Advanced platform that detects phishing URLs and emails using ML classifiers, heuristic analysis, and real-time threat intelligence feeds.",
            highlights: [
                "ML-based URL classifier with 94%+ detection accuracy",
                "Real-time threat intelligence API integration",
                "Admin dashboard with incident logs and analytics",
                "OWASP-aligned secure coding throughout"
            ]
        },
        {
            id: 2,
            title: "Intrusion Detection System",
            category: "Cybersecurity / ML",
            technologies: "Python, Scikit-learn, Pandas, NetworkX",
            image: "/images/ids.png",
            github: "https://github.com/Vikrant892",
            live: "",
            description: "Network intrusion detection system using ML to classify traffic as benign or malicious. Analyses 40+ packet flow features for real-time anomaly detection.",
            highlights: [
                "Random Forest classifier on network traffic features",
                "Feature engineering on 40+ flow attributes",
                "Real-time alert system with severity scoring",
                "Tested against CICIDS2017 benchmark dataset"
            ]
        },
        {
            id: 3,
            title: "Credit Card Fraud Detection",
            category: "ML / Data Science",
            technologies: "Python, Scikit-learn, Pandas, NumPy, PCA",
            image: "/images/fraud-ml.png",
            github: "https://github.com/Vikrant892",
            live: "",
            description: "ML pipeline for real-time fraud detection on 284,807 transactions. Handles severe class imbalance and optimises precision-recall to minimise false positives.",
            highlights: [
                "Logistic Regression & Random Forest with PCA",
                "SMOTE oversampling on 99.8% imbalanced dataset",
                "Precision-recall threshold tuning for production use",
                "F1 score of 0.87 on held-out test set"
            ]
        },
        {
            id: 4,
            title: "Security & Data Toolkit",
            category: "Automation / DevOps",
            technologies: "Python, GitHub Actions, NVD API, HIBP API",
            image: "/images/security-toolkit.png",
            github: "https://github.com/Vikrant892/security-toolkit",
            live: "https://github.com/Vikrant892/security-toolkit",
            description: "Auto-growing public toolkit of 15+ real-world cybersecurity and data tools, with a new tool committed daily via GitHub Actions — CVE tracker, port scanner, log analyser, and more.",
            highlights: [
                "15+ standalone Python tools, zero external dependencies",
                "Daily GitHub Actions workflow — runs at 9 AM Adelaide time",
                "Live CVE feed from NIST NVD, breach checks via HIBP",
                "Categories: cybersecurity, data engineering, ML, automation"
            ]
        },
        {
            id: 5,
            title: "YouTube Hand Gesture Control",
            category: "Computer Vision",
            technologies: "Python, OpenCV, MediaPipe, TensorFlow, PyAutoGUI",
            image: "/images/gesture-control.png",
            github: "https://github.com/Vikrant892",
            live: "",
            description: "Hands-free YouTube control using real-time hand gesture recognition. Detects 21 hand landmarks per frame to map gestures to playback controls, built for accessibility.",
            highlights: [
                "21-point hand landmark detection via MediaPipe",
                "Gesture-to-action: play, pause, seek, volume control",
                "60fps real-time processing via PyAutoGUI",
                "Accessibility-first design for motor-impaired users"
            ]
        },
        {
            id: 6,
            title: "AutoTuber",
            category: "Automation / AI",
            technologies: "Python, OpenAI API, FFmpeg, YouTube Data API",
            image: "/images/autotuber.png",
            github: "https://github.com/Vikrant892",
            live: "",
            description: "End-to-end automated YouTube content pipeline — generates AI scripts, creates voiceovers, renders videos with FFmpeg, and schedules uploads via YouTube Data API v3.",
            highlights: [
                "AI-generated scripts using LLM APIs",
                "Automated TTS voiceover and video rendering via FFmpeg",
                "YouTube Data API v3 for scheduling and upload",
                "Configurable niches, templates, and posting schedules"
            ]
        },
        {
            id: 7,
            title: "Salary Slip Generator",
            category: "Full Stack",
            technologies: "Java, JSP, Servlet, JDBC, MySQL, Bootstrap",
            image: "/images/salary-slip.png",
            github: "https://github.com/Vikrant892",
            live: "",
            description: "Enterprise HR web app for generating and downloading PDF salary slips. Role-based access separates admin and employee views, backed by a MySQL employee database.",
            highlights: [
                "One-click PDF generation and download",
                "Role-based access control: admin vs employee views",
                "JDBC-powered MySQL backend with Servlet MVC",
                "Responsive UI with JSP and Bootstrap"
            ]
        },
        {
            id: 8,
            title: "Portfolio — vikrant69g.com",
            category: "Full Stack / 3D",
            technologies: "TypeScript, React, Three.js, GSAP, Vite",
            image: "/images/portfolio.png",
            github: "https://github.com/Vikrant892/Portfolio-Vik",
            live: "https://vikrant69g.com",
            description: "This portfolio — interactive 3D developer site with a custom animated character, real-time mouse tracking, and scroll-driven animations. Cyberpunk-inspired cybersecurity aesthetic.",
            highlights: [
                "Custom 3D character with real-time head-tracking via Three.js",
                "GSAP scroll-pinned horizontal work showcase",
                "ACES filmic tone mapping and HDR environment lighting",
                "Deployed on Cloudflare Pages with CI/CD"
            ]
        }
    ],
    contact: {
        email: "vikrantsharma892@gmail.com",
        github: "https://github.com/Vikrant892",
        linkedin: "https://www.linkedin.com/in/vik892/",
        twitter: "https://x.com/Vik69G",
        instagram: "",
        resume: "https://drive.google.com/file/d/147TOHldZrNGfYkomPWgf37Dc6ujbXqF8/view?usp=sharing"
    },
    skills: {
        develop: {
            title: "DATA ENGINEER",
            description: "Pipelines, ETL & analytics",
            details: "Building data pipelines, ETL processes, and scalable analytics on AWS Redshift and Snowflake. Python-first with ML integration for anomaly detection and fraud prevention.",
            tools: ["Python", "SQL", "AWS Redshift", "Snowflake", "ETL", "Pandas", "Scikit-learn", "PostgreSQL", "Power BI", "Docker"]
        },
        design: {
            title: "CYBERSECURITY ANALYST",
            description: "Threat detection & incident response",
            details: "SIEM monitoring, OWASP Top 10 testing, ISO 27001/NIST CSF compliance, and incident response. Full-stack development for secure web applications.",
            tools: ["SIEM", "OWASP Top 10", "NIST CSF", "ISO 27001", "MITRE ATT&CK", "Threat Detection", "Node.js", "React", "REST APIs", "GitHub Actions"]
        }
    }
};
