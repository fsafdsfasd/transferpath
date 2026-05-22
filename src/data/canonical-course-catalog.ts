/** Shared catalog for onboarding step 4 and timeline "add course". Keep in sync. */
export const CANONICAL_COURSE_CATEGORIES: { category: string; courses: string[] }[] = [
  {
    category: "English / Writing",
    courses: ["English Composition I", "English Composition II", "Technical Writing", "Creative Writing", "Public Speaking", "Business Communication"],
  },
  {
    category: "Math",
    courses: ["College Algebra", "Precalculus", "Calculus I", "Calculus II", "Calculus III", "Statistics", "Business Statistics", "Linear Algebra", "Differential Equations", "Discrete Mathematics"],
  },
  {
    category: "Science",
    courses: ["Biology I", "Biology II", "General Chemistry I", "General Chemistry II", "Organic Chemistry I", "Organic Chemistry II", "Physics I", "Physics II", "Environmental Science", "Earth Science", "Geology", "Astronomy"],
  },
  {
    category: "Computer Science / Technology",
    courses: ["Intro to Programming", "Programming Fundamentals", "Data Structures", "Computer Organization", "Discrete Math", "Web Development", "Database Systems", "Cybersecurity Fundamentals", "Computer Networks", "Software Engineering Fundamentals"],
  },
  {
    category: "Business",
    courses: ["Financial Accounting", "Managerial Accounting", "Microeconomics", "Macroeconomics", "Business Law", "Business Calculus", "Principles of Management", "Marketing Fundamentals", "Information Systems Fundamentals"],
  },
  {
    category: "Engineering",
    courses: ["Engineering Mechanics", "Statics", "Dynamics", "Circuit Analysis", "Engineering Physics", "Engineering Design", "Materials Science", "Thermodynamics", "Intro to Engineering"],
  },
  {
    category: "Social Sciences",
    courses: ["Psychology", "Sociology", "American Government", "Texas Government", "U.S. History I", "U.S. History II", "World History", "Anthropology", "Human Geography", "Political Science"],
  },
  {
    category: "Humanities",
    courses: ["Philosophy", "Ethics", "Art Appreciation", "Music Appreciation", "Literature", "Humanities", "Religious Studies"],
  },
  {
    category: "Health / Pre-Med",
    courses: ["Anatomy & Physiology I", "Anatomy & Physiology II", "Microbiology", "Nutrition", "Kinesiology", "Medical Terminology", "Health Sciences", "Public Health"],
  },
  {
    category: "Communication / Media",
    courses: ["Intro to Communication", "Media Studies", "Journalism", "Public Relations", "Digital Media", "Film Studies"],
  },
  {
    category: "Education",
    courses: ["Intro to Education", "Child Development", "Educational Psychology", "Special Education Fundamentals"],
  },
  {
    category: "Architecture / Design",
    courses: ["Intro to Architecture", "Graphic Design Fundamentals", "Design Principles", "Interior Design Fundamentals"],
  },
  {
    category: "Agriculture / Environment",
    courses: ["Animal Science", "Plant Science", "Agricultural Economics", "Environmental Sustainability"],
  },
  {
    category: "General Electives",
    courses: ["Freshman Seminar", "College Success", "Leadership Studies", "Internship/Practicum", "Independent Study"],
  },
]

export function flattenCanonicalCourseNames(): string[] {
  return CANONICAL_COURSE_CATEGORIES.flatMap((g) => g.courses)
}
