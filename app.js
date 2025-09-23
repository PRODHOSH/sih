// EduGameOdisha Platform JavaScript

// Application state
let currentUser = null;
let currentRole = 'student';
let currentSubject = null;
let currentGrade = null;
let theme = 'light';

// Application data
const appData = {
  students: [
    {id: 1, name: "Aarav Patel", grade: 8, points: 2450, streak: 12, level: 5, subjects: {math: 78, physics: 65, chemistry: 82, biology: 71, cs: 45}},
    {id: 2, name: "Priya Sharma", grade: 10, points: 3200, streak: 25, level: 7, subjects: {math: 92, physics: 88, chemistry: 90, biology: 85, cs: 76}},
    {id: 3, name: "Ravi Kumar", grade: 9, points: 1800, streak: 5, level: 4, subjects: {math: 55, physics: 48, chemistry: 62, biology: 58, cs: 35}},
    {id: 4, name: "Sneha Mishra", grade: 11, points: 4100, streak: 18, level: 8, subjects: {math: 95, physics: 91, chemistry: 89, biology: 93, cs: 87}}
  ],
  subjects: [
    {id: "math", name: "Mathematics", icon: "📊", grades: ["6", "7", "8", "9", "10", "11", "12"]},
    {id: "physics", name: "Physics", icon: "⚡", grades: ["6", "7", "8", "9", "10", "11", "12"]},
    {id: "chemistry", name: "Chemistry", icon: "🧪", grades: ["6", "7", "8", "9", "10", "11", "12"]},
    {id: "biology", name: "Biology", icon: "🌱", grades: ["6", "7", "8", "9", "10", "11", "12"]},
    {id: "cs", name: "Computer Science", icon: "💻", grades: ["6", "7", "8", "9", "10", "11", "12"]}
  ],
  lessons: [
    {id: 1, subject: "math", grade: "8", title: "Linear Equations", completed: true, points: 50},
    {id: 2, subject: "math", grade: "8", title: "Quadratic Functions", completed: false, points: 60},
    {id: 3, subject: "physics", grade: "8", title: "Motion and Force", completed: true, points: 45},
    {id: 4, subject: "chemistry", grade: "8", title: "Atomic Structure", completed: false, points: 55}
  ],
  badges: [
    {id: 1, name: "First Steps", description: "Complete your first lesson", icon: "🎯", earned: true},
    {id: 2, name: "Streak Master", description: "Maintain a 10-day learning streak", icon: "🔥", earned: true},
    {id: 3, name: "Math Wizard", description: "Complete 20 math lessons", icon: "🧮", earned: false},
    {id: 4, name: "Perfect Score", description: "Get 100% on 5 consecutive quizzes", icon: "⭐", earned: false}
  ],
  challenges: [
    {id: 1, title: "Weekly Math Challenge", description: "Solve 25 algebra problems this week", progress: 18, total: 25, points: 200, timeLeft: "3 days"},
    {id: 2, title: "Science Explorer", description: "Complete lessons in 3 different science subjects", progress: 2, total: 3, points: 150, timeLeft: "5 days"}
  ],
  teacherAnalytics: {
    totalStudents: 45,
    activeToday: 38,
    avgEngagement: 78,
    completionRate: 85,
    atRiskStudents: 7,
    topPerformers: ["Priya Sharma", "Sneha Mishra", "Arjun Singh"],
    subjectPerformance: [
      {subject: "Mathematics", avgScore: 76},
      {subject: "Physics", avgScore: 71},
      {subject: "Chemistry", avgScore: 79},
      {subject: "Biology", avgScore: 74},
      {subject: "Computer Science", avgScore: 68}
    ]
  },
  chatbotResponses: [
    {
      question: "How do I solve quadratic equations?", 
      response: "Great question! Let me walk you through the steps:\n\n1. First, identify the standard form: ax² + bx + c = 0\n2. You can solve using factoring, completing the square, or the quadratic formula\n3. The quadratic formula is: x = (-b ± √(b²-4ac)) / 2a\n\nWould you like me to show you an example?"
    },
    {
      question: "What is photosynthesis?", 
      response: "Photosynthesis is the process plants use to make food from sunlight! 🌱\n\nThe simple equation is:\n6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nThis means plants take in carbon dioxide and water, use sunlight, and produce glucose (food) and oxygen. That's why plants are so important for our environment!\n\nWant to learn about the two main stages: light reactions and the Calvin cycle?"
    }
  ]
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('EduGameOdisha app initializing...');
  initializeTheme();
  showPage('landing-page');
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Modal close on overlay click
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        hideLogin();
      }
    });
  }
}

// Theme management
function initializeTheme() {
  // Don't use localStorage in sandbox environment
  setTheme('light');
}

function setTheme(newTheme) {
  theme = newTheme;
  document.documentElement.setAttribute('data-color-scheme', theme);
  
  // Update theme toggle icons
  const toggles = document.querySelectorAll('.theme-toggle i');
  toggles.forEach(toggle => {
    toggle.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  });
}

function toggleTheme() {
  console.log('Toggling theme from', theme);
  setTheme(theme === 'light' ? 'dark' : 'light');
}

// Navigation functions
function showPage(pageId) {
  console.log('Showing page:', pageId);
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  } else {
    console.error('Page not found:', pageId);
  }
}

// Authentication functions
function showLogin() {
  console.log('Opening login modal');
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('hidden');
    selectRole('student');
  } else {
    console.error('Login modal not found');
  }
}

function showTeacherLogin() {
  console.log('Opening teacher login modal');
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('hidden');
    selectRole('teacher');
  } else {
    console.error('Login modal not found');
  }
}

function hideLogin() {
  console.log('Closing login modal');
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function selectRole(role) {
  console.log('Selecting role:', role);
  currentRole = role;
  
  // Update role button states
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const selectedRoleBtn = document.querySelector(`[data-role="${role}"]`);
  if (selectedRoleBtn) {
    selectedRoleBtn.classList.add('active');
  }
  
  // Update form placeholder values
  const emailInput = document.querySelector('#login-form input[type="email"]');
  const passwordInput = document.querySelector('#login-form input[type="password"]');
  
  if (emailInput && passwordInput) {
    if (role === 'student') {
      emailInput.value = 'student@demo.com';
      passwordInput.value = 'demo123';
    } else {
      emailInput.value = 'teacher@demo.com';
      passwordInput.value = 'demo123';
    }
  }
}

function handleLogin(event) {
  event.preventDefault();
  console.log('Handling login for role:', currentRole);
  
  hideLogin();
  
  if (currentRole === 'student') {
    currentUser = appData.students[0]; // Demo student
    console.log('Loading student dashboard for:', currentUser.name);
    loadStudentDashboard();
    showPage('student-dashboard');
  } else {
    currentUser = { name: 'Teacher Demo', role: 'teacher' };
    console.log('Loading teacher dashboard');
    loadTeacherDashboard();
    showPage('teacher-dashboard');
  }
  
  return false;
}

function demoLogin(role) {
  console.log('Demo login for role:', role);
  currentRole = role;
  hideLogin();
  
  if (role === 'student') {
    currentUser = appData.students[0];
    console.log('Demo student login:', currentUser.name);
    loadStudentDashboard();
    showPage('student-dashboard');
  } else {
    currentUser = { name: 'Teacher Demo', role: 'teacher' };
    console.log('Demo teacher login');
    loadTeacherDashboard();
    showPage('teacher-dashboard');
  }
}

function logout() {
  console.log('Logging out user');
  currentUser = null;
  currentRole = 'student';
  currentSubject = null;
  currentGrade = null;
  showPage('landing-page');
}

// Student dashboard functions
function loadStudentDashboard() {
  console.log('Loading student dashboard for:', currentUser?.name);
  if (!currentUser) {
    console.error('No current user for dashboard');
    return;
  }
  
  // Update user info in header
  const studentName = document.getElementById('student-name');
  const userPoints = document.getElementById('user-points');
  const userStreak = document.getElementById('user-streak');
  const userLevel = document.getElementById('user-level');
  
  if (studentName) studentName.textContent = currentUser.name;
  if (userPoints) userPoints.textContent = currentUser.points;
  if (userStreak) userStreak.textContent = currentUser.streak + '🔥';
  if (userLevel) userLevel.textContent = currentUser.level;
  
  // Update progress bars
  updateProgressBars();
}

function updateProgressBars() {
  if (!currentUser) return;
  
  console.log('Updating progress bars for subjects:', currentUser.subjects);
  
  const subjectMappings = {
    'math': 'math',
    'physics': 'physics', 
    'chemistry': 'chemistry',
    'biology': 'biology',
    'cs': 'cs'
  };
  
  Object.entries(subjectMappings).forEach(([displayKey, dataKey]) => {
    const progressElement = document.querySelector(`[data-subject="${displayKey}"]`);
    if (progressElement && currentUser.subjects[dataKey] !== undefined) {
      const fillElement = progressElement.querySelector('.progress-fill');
      const percentElement = progressElement.querySelector('.progress-percent');
      
      if (fillElement && percentElement) {
        const percentage = currentUser.subjects[dataKey];
        fillElement.style.width = percentage + '%';
        percentElement.textContent = percentage + '%';
        console.log(`Updated ${displayKey}: ${percentage}%`);
      }
    }
  });
}

function showStudentDashboard() {
  console.log('Navigating to student dashboard');
  loadStudentDashboard();
  showPage('student-dashboard');
}

// Subject navigation
function showSubject(subjectId) {
  console.log('Showing subject:', subjectId);
  currentSubject = subjectId;
  const subject = appData.subjects.find(s => s.id === subjectId);
  
  if (subject) {
    // Update subject view
    const currentSubjectName = document.getElementById('current-subject-name');
    const subjectIcon = document.getElementById('subject-icon');
    const subjectTitle = document.getElementById('subject-title');
    
    if (currentSubjectName) currentSubjectName.textContent = subject.name;
    if (subjectIcon) subjectIcon.textContent = subject.icon;
    if (subjectTitle) subjectTitle.textContent = subject.name;
    
    showPage('subject-view');
  } else {
    console.error('Subject not found:', subjectId);
  }
}

function showLessons(grade) {
  console.log('Showing lessons for grade:', grade, 'subject:', currentSubject);
  currentGrade = grade;
  
  if (currentSubject) {
    const subject = appData.subjects.find(s => s.id === currentSubject);
    if (subject) {
      // Update lesson view
      const lessonSubject = document.getElementById('lesson-subject');
      const lessonTitle = document.getElementById('lesson-title');
      
      if (lessonSubject) lessonSubject.textContent = subject.name;
      if (lessonTitle) lessonTitle.textContent = 'Linear Equations';
      
      showPage('lesson-view');
    }
  } else {
    console.error('No current subject selected');
  }
}

function goBackToSubject() {
  console.log('Going back to subject:', currentSubject);
  if (currentSubject) {
    showSubject(currentSubject);
  } else {
    showStudentDashboard();
  }
}

// Lesson interaction
function selectOption(button, isCorrect) {
  console.log('Option selected, correct:', isCorrect);
  
  // Clear previous selections
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('selected', 'correct', 'incorrect');
  });
  
  // Mark selected option
  button.classList.add('selected');
  
  // Show feedback after a short delay
  setTimeout(() => {
    button.classList.add(isCorrect ? 'correct' : 'incorrect');
    showFeedback(isCorrect);
  }, 500);
}

function showFeedback(isCorrect) {
  console.log('Showing feedback, correct:', isCorrect);
  const feedback = document.getElementById('feedback');
  if (!feedback) {
    console.error('Feedback element not found');
    return;
  }
  
  const icon = feedback.querySelector('.feedback-icon');
  const title = feedback.querySelector('h4');
  const text = feedback.querySelector('p');
  
  if (isCorrect) {
    if (icon) icon.textContent = '✅';
    if (title) title.textContent = 'Correct!';
    if (text) text.textContent = 'Great job! Subtracting 5 from both sides gives us: 2x = 8';
  } else {
    if (icon) icon.textContent = '❌';
    if (title) title.textContent = 'Not quite right';
    if (text) text.textContent = 'Think about what we need to do to isolate the x term. We want to get 2x by itself.';
  }
  
  feedback.classList.remove('hidden');
}

function nextStep() {
  console.log('Moving to next step');
  const feedback = document.getElementById('feedback');
  if (feedback) {
    feedback.classList.add('hidden');
  }
  
  // Update lesson content for next step
  const problemTitle = document.querySelector('.lesson-problem h2');
  const problemText = document.querySelector('.lesson-problem p');
  const options = document.querySelectorAll('.option-btn');
  
  if (problemTitle) problemTitle.textContent = 'Now solve: 2x = 8';
  if (problemText) problemText.textContent = 'We have 2x = 8. What should we do next to find the value of x?';
  
  if (options.length >= 4) {
    options[0].textContent = 'Add 2 to both sides';
    options[1].textContent = 'Subtract 2 from both sides';
    options[2].textContent = 'Multiply both sides by 2';
    options[3].textContent = 'Divide both sides by 2';
    
    // Reset option states and update click handlers
    options.forEach((btn, index) => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      btn.onclick = function() { selectOption(this, index === 3); }; // Correct answer is index 3
    });
  }
  
  // Update progress
  const progressFill = document.querySelector('.lesson-progress-header .progress-fill');
  const progressText = document.querySelector('.lesson-progress-header span');
  if (progressFill) progressFill.style.width = '80%';
  if (progressText) progressText.textContent = '4/5 Complete';
}

function showHint() {
  alert('💡 Hint: To solve for x, we need to isolate it by performing the opposite operation. What operation is being performed on x?');
}

// Chatbot functions
function toggleChatbot() {
  console.log('Toggling chatbot');
  const chatbot = document.getElementById('chatbot-sidebar');
  if (chatbot) {
    chatbot.classList.toggle('hidden');
  } else {
    console.error('Chatbot sidebar not found');
  }
}

function handleChatInput(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function sendChatMessage() {
  const input = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  
  if (!input || !messagesContainer) {
    console.error('Chatbot elements not found');
    return;
  }
  
  const message = input.value.trim();
  
  if (!message) return;
  
  console.log('Sending chat message:', message);
  
  // Add user message
  const userMessage = createMessageElement(message, 'user');
  messagesContainer.appendChild(userMessage);
  
  // Clear input
  input.value = '';
  
  // Simulate bot response
  setTimeout(() => {
    const response = getBotResponse(message);
    const botMessage = createMessageElement(response, 'bot');
    messagesContainer.appendChild(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1000);
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function createMessageElement(content, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}-message`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = content;
  
  messageDiv.appendChild(contentDiv);
  return messageDiv;
}

function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('quadratic') || lowerMessage.includes('equation')) {
    return appData.chatbotResponses[0].response;
  } else if (lowerMessage.includes('photosynthesis') || lowerMessage.includes('plant')) {
    return appData.chatbotResponses[1].response;
  } else if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
    return "I'm here to help! 😊 You can ask me about:\n\n• Math concepts like equations and functions\n• Science topics like photosynthesis and forces\n• Study tips and problem-solving strategies\n\nWhat specific topic would you like help with?";
  } else if (lowerMessage.includes('linear') || lowerMessage.includes('solve')) {
    return "For linear equations like 2x + 5 = 13:\n\n1. Identify what operation is being done to x\n2. Do the opposite operation to both sides\n3. Simplify step by step\n\nIn this case, we subtract 5 from both sides first, then divide by 2. Would you like me to walk through another example?";
  } else {
    return "That's an interesting question! Let me think about that... 🤔\n\nCould you be more specific about what you'd like to learn? I can help with math problems, science concepts, or study strategies.";
  }
}

// Teacher dashboard functions
function loadTeacherDashboard() {
  console.log('Loading teacher dashboard');
  // Teacher dashboard is already populated with static data
  // In a real application, this would fetch live data
}

function createAssignment() {
  alert('Create Assignment feature would open a modal to create new assignments for students.');
}

function sendAnnouncement() {
  alert('Send Announcement feature would open a modal to send messages to all students.');
}

function generateReport() {
  alert('Generate Report feature would create detailed progress reports for download.');
}

function viewAllStudents() {
  alert('View All Students feature would show a detailed list of all students with individual progress data.');
}

// Utility functions
function showNotification(message, type = 'info') {
  console.log('Showing notification:', message, type);
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    padding: var(--space-12) var(--space-16);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    transition: all var(--duration-normal) var(--ease-standard);
    color: var(--color-text);
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
  // Alt + T to toggle theme
  if (event.altKey && event.key === 't') {
    event.preventDefault();
    toggleTheme();
  }
  
  // Alt + C to toggle chatbot (when in lesson view)
  if (event.altKey && event.key === 'c') {
    const lessonView = document.getElementById('lesson-view');
    if (lessonView && lessonView.classList.contains('active')) {
      event.preventDefault();
      toggleChatbot();
    }
  }
  
  // Escape to close modals
  if (event.key === 'Escape') {
    hideLogin();
    const chatbot = document.getElementById('chatbot-sidebar');
    if (chatbot && !chatbot.classList.contains('hidden')) {
      toggleChatbot();
    }
  }
});

// Performance optimization - lazy load content
function lazyLoadContent() {
  // Simulate lazy loading of dashboard content
  const cards = document.querySelectorAll('.card');
  if (cards.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Initialize lazy loading when dashboard loads
setTimeout(lazyLoadContent, 500);

console.log('EduGameOdisha app loaded successfully');
