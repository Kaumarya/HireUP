# HireUP — Hire Smarter. Get Hired Faster.

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Groq_API-Integrated-000000?style=for-the-badge&logo=groq&logoColor=white" alt="Groq API">
</div>

## 🚀 Overview

HireUP is a comprehensive career development and recruitment platform that bridges the gap between talented job seekers and forward-thinking companies. Built with modern web technologies and powered by AI, HireUP offers intelligent skill assessments, personalized learning roadmaps, and seamless recruitment processes.

## ✨ Key Features

### 🎓 For Job Seekers
- **AI-Powered Skill Assessment**: Take comprehensive tests evaluated by Groq's Llama 3.1 model
- **Personalized Learning Roadmaps**: Get customized career development paths
- **Job Discovery**: Find opportunities that match your skills and aspirations
- **Certificate Generation**: Earn verified certificates for completed assessments
- **Application Tracking**: Monitor your job application status in real-time

### 🏢 For Recruiters
- **Smart Candidate Screening**: AI-assisted candidate evaluation
- **Job Posting Management**: Create and manage job listings effortlessly
- **Analytics Dashboard**: Track recruitment metrics and insights
- **Interview Scheduling**: Streamline the interview process
- **Candidate Database**: Build and manage your talent pool

### 🤖 AI Integration
- **Groq API Integration**: Powered by Llama 3.1-8b-instant model
- **Intelligent Question Generation**: Dynamic test question creation
- **Roadmap Generation**: AI-driven career path recommendations
- **Chatbot Support**: 24/7 assistance with site navigation

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0 with Vite
- **Styling**: TailwindCSS 3.4.1
- **Routing**: React Router DOM 6.22.0
- **Animations**: Framer Motion 11.0.0
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **AI**: Groq API (Llama 3.1)
- **Environment**: dotenv for secure API key management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hireup.git
   cd hireup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Groq API Setup
1. Visit [Groq Console](https://console.groq.com/keys)
2. Create an account and generate an API key
3. Add the key to your `.env` file

### Environment Variables
```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here
```

## 📁 Project Structure

```
hireup/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI components
│   ├── contexts/          # React contexts
│   ├── config/            # Configuration files
│   ├── data/              # Mock data
│   ├── pages/             # Page components
│   └── utils/             # Utility functions
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 🗺 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Hero, How it works, Features, Featured Jobs, CTA |
| `/dashboard` | Student Dashboard | Stats, AI matches, applications, skills |
| `/profile` | Student Profile | About, Projects, Skills, Experience, Certs |
| `/jobs` | Job Discovery | Filterable job board with sidebar filters |
| `/recruiter` | Recruiter Dashboard | Hiring overview, pipeline, candidate search |
| `/skill-tests` | Skill Tests | AI-powered assessments and certifications |
| `/roadmap` | Learning Roadmap | Personalized career development paths |
| `/placements` | Placements | Success stories and testimonials |
| `/pricing` | Pricing | Subscription plans and features |

## 🎨 Design System

### Theme Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg-bg-primary` | `#0A0A0A` | Page background |
| `bg-bg-card` | `#111111` | Card backgrounds |
| `bg-bg-elevated` | `#161616` | Elevated surfaces |
| `bg-bg-border` | `#1F1F1F` | Borders |
| `text-accent-green` | `#22C55E` | Primary accent |
| `text-accent-green-light` | `#4ADE80` | Secondary accent |
| `text-text-primary` | `#E5E7EB` | Main text |
| `text-text-muted` | `#9CA3AF` | Secondary text |

### Typography
- **Display font**: `Syne` (headings, labels, scores)
- **Body font**: `DM Sans` (paragraphs, descriptions)

## 🧩 Components

### UI Components
- `<SkillBadge skill="React" size="sm|lg" />` — Green tag
- `<TalentScore score={87} size="md|lg" />` — Circular progress score
- `<ProgressBar value={72} label="Completion" />` — Animated bar
- `<StatusBadge status="Interview|Applied|Rejected|Shortlisted" />` — Status pill
- `<VerifiedBadge />` — Green verified checkmark
- `<MatchScore score={94} />` — Colorized match percentage

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Core Features Deep Dive

### Skill Assessment System
- **Dynamic Question Generation**: AI creates relevant questions based on job requirements
- **Real-time Evaluation**: Instant feedback and scoring
- **Adaptive Difficulty**: Questions adjust based on user performance

### Learning Roadmaps
- **Personalized Paths**: Custom learning journeys based on career goals
- **Milestone Tracking**: Progress monitoring with clear objectives
- **Resource Recommendations**: Curated learning materials and courses

### Recruitment Analytics
- **Candidate Insights**: Data-driven candidate evaluation
- **Hiring Metrics**: Track time-to-hire and conversion rates
- **Performance Analytics**: Monitor recruitment funnel effectiveness

## � Security Features

- **Environment Variables**: Secure API key management
- **Input Validation**: Comprehensive form validation
- **Error Boundaries**: Graceful error handling
- **Secure Routing**: Protected routes for authenticated users

## 📱 Responsive Breakpoints

| Screen | Layout |
|--------|--------|
| Mobile (`<768px`) | Single column + bottom tab nav |
| Tablet (`768–1024px`) | Two columns, sidebar hidden |
| Desktop (`>1024px`) | Full sidebar + multi-column grid |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** for providing the powerful Llama 3.1 API
- **React Team** for the amazing framework
- **TailwindCSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set

## 📞 Support

For support, please contact [your-email@example.com] or create an issue in the repository.

---

<div align="center">
  <strong>Built with ❤️ by the HireUP Team</strong>
</div>
