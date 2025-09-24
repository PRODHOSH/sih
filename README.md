<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRODHOSH - Interactive 3D Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #000000 0%, #1a0033 50%, #330066 100%);
            color: #ffffff;
            overflow-x: hidden;
            min-height: 100vh;
        }

        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #fff;
            border-radius: 50%;
            animation: twinkle 3s infinite ease-in-out;
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            position: relative;
            z-index: 2;
        }

        .hero {
            text-align: center;
            padding: 100px 0;
            position: relative;
        }

        .hero h1 {
            font-size: 4rem;
            font-weight: bold;
            background: linear-gradient(45deg, #ff6b9d, #c147e9, #8b5cf6, #06b6d4);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 3s ease-in-out infinite;
            margin-bottom: 20px;
            text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
        }

        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .subtitle {
            font-size: 1.5rem;
            color: #a855f7;
            margin-bottom: 40px;
            animation: fadeInUp 1s ease-out 0.5s both;
        }

        .floating-element {
            position: absolute;
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        .section {
            margin: 80px 0;
            padding: 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(139, 92, 246, 0.3);
            position: relative;
            overflow: hidden;
            animation: slideInUp 1s ease-out;
        }

        .section::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        .section-title {
            font-size: 2.5rem;
            color: #c147e9;
            margin-bottom: 30px;
            position: relative;
            display: inline-block;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #ff6b9d, #c147e9, #8b5cf6);
            border-radius: 2px;
            animation: pulse 2s infinite;
        }

        .about-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .about-item {
            padding: 30px;
            background: rgba(139, 92, 246, 0.1);
            border-radius: 15px;
            border: 1px solid rgba(139, 92, 246, 0.3);
            transform: translateY(20px);
            opacity: 0;
            animation: fadeInUp 1s ease-out forwards;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .about-item:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
            border-color: #c147e9;
        }

        .about-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(139, 92, 246, 0.1), transparent);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
        }

        .about-item:hover::before {
            transform: translateX(0);
        }

        .about-item .icon {
            font-size: 3rem;
            margin-bottom: 20px;
            display: block;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }

        .tech-stack {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }

        .tech-item {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(139, 92, 246, 0.3);
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            perspective: 1000px;
            cursor: pointer;
        }

        .tech-item:hover {
            transform: translateY(-15px) rotateY(10deg);
            border-color: #c147e9;
            box-shadow: 
                0 25px 50px rgba(139, 92, 246, 0.4),
                0 0 20px rgba(193, 71, 233, 0.6);
        }

        .tech-item .tech-icon {
            font-size: 3rem;
            margin-bottom: 15px;
            display: block;
            filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.5));
            animation: rotate3d 8s linear infinite;
        }

        @keyframes rotate3d {
            0% { transform: rotateY(0deg) rotateX(0deg); }
            25% { transform: rotateY(90deg) rotateX(0deg); }
            50% { transform: rotateY(180deg) rotateX(90deg); }
            75% { transform: rotateY(270deg) rotateX(0deg); }
            100% { transform: rotateY(360deg) rotateX(0deg); }
        }

        .tech-name {
            font-weight: bold;
            color: #ffffff;
            font-size: 0.9rem;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }

        .tech-item:hover .tech-name {
            opacity: 1;
            color: #c147e9;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .stat-card {
            background: rgba(139, 92, 246, 0.1);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(139, 92, 246, 0.3);
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            transform: scale(1.05);
            box-shadow: 0 20px 40px rgba(139, 92, 246, 0.4);
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #ff6b9d, #c147e9, #8b5cf6);
            animation: slideLeft 3s infinite;
        }

        @keyframes slideLeft {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 40px;
            flex-wrap: wrap;
        }

        .social-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 15px 25px;
            background: rgba(139, 92, 246, 0.1);
            border: 2px solid rgba(139, 92, 246, 0.3);
            border-radius: 50px;
            color: #ffffff;
            text-decoration: none;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }

        .social-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), transparent);
            transition: left 0.5s ease;
        }

        .social-link:hover::before {
            left: 100%;
        }

        .social-link:hover {
            transform: translateY(-5px) scale(1.1);
            border-color: #c147e9;
            box-shadow: 0 15px 30px rgba(139, 92, 246, 0.4);
        }

        .pulse-button {
            background: linear-gradient(45deg, #ff6b9d, #c147e9);
            border: none;
            border-radius: 50px;
            padding: 15px 30px;
            color: white;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            animation: pulse 2s infinite;
            margin: 20px 10px;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(193, 71, 233, 0.7); }
            70% { box-shadow: 0 0 0 20px rgba(193, 71, 233, 0); }
            100% { box-shadow: 0 0 0 0 rgba(193, 71, 233, 0); }
        }

        .matrix-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.1;
        }

        .matrix-text {
            position: absolute;
            color: #8b5cf6;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            animation: matrixFall 10s linear infinite;
        }

        @keyframes matrixFall {
            0% { transform: translateY(-100vh); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .glow {
            animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
            from { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #c147e9, 0 0 20px #c147e9; }
            to { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #c147e9, 0 0 40px #c147e9; }
        }

        .github-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .stat-image {
            border-radius: 15px;
            border: 2px solid rgba(139, 92, 246, 0.3);
            transition: all 0.3s ease;
            background: rgba(0, 0, 0, 0.3);
            padding: 10px;
        }

        .stat-image:hover {
            transform: scale(1.05);
            border-color: #c147e9;
            box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
        }

        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .subtitle { font-size: 1.2rem; }
            .section-title { font-size: 2rem; }
            .tech-stack { grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); }
            .social-links { flex-direction: column; align-items: center; }
        }
    </style>
</head>
<body>
    <div class="stars" id="stars"></div>
    <div class="matrix-bg" id="matrix"></div>

    <div class="container">
        <div class="hero">
            <h1 class="glow">PRODHOSH</h1>
            <p class="subtitle">🚀 Machine Learning Enthusiast & Data Science Explorer</p>
            <p style="font-size: 1.2rem; margin-bottom: 30px; color: #a855f7;">
                "Living in numbers, dreaming in algorithms" 📊✨
            </p>
            
            <div class="floating-element" style="top: 20%; left: 10%; color: #ff6b9d; font-size: 2rem;">💫</div>
            <div class="floating-element" style="top: 30%; right: 15%; color: #c147e9; font-size: 1.5rem; animation-delay: -2s;">🔭</div>
            <div class="floating-element" style="top: 60%; left: 20%; color: #8b5cf6; font-size: 1.8rem; animation-delay: -4s;">🤖</div>
        </div>

        <div class="section">
            <h2 class="section-title">💫 About Me</h2>
            <div class="about-grid">
                <div class="about-item" style="animation-delay: 0.1s;">
                    <span class="icon">🔭</span>
                    <h3>Currently Learning</h3>
                    <p>Deep diving into Machine Learning algorithms, Statistics, and Mathematics for ML. Always exploring new frontiers in AI!</p>
                </div>
                <div class="about-item" style="animation-delay: 0.2s;">
                    <span class="icon">👯</span>
                    <h3>Collaboration</h3>
                    <p>Looking to collaborate on Open Source, AI, and ML projects. Let's build the future together!</p>
                </div>
                <div class="about-item" style="animation-delay: 0.3s;">
                    <span class="icon">🤝</span>
                    <h3>Happy to Help</h3>
                    <p>Open to help with Python, C++, and beginner-friendly ML concepts. Teaching is learning twice!</p>
                </div>
                <div class="about-item" style="animation-delay: 0.4s;">
                    <span class="icon">💬</span>
                    <h3>Ask Me About</h3>
                    <p>Coding best practices, productivity hacks, and effective learning strategies for tech enthusiasts.</p>
                </div>
                <div class="about-item" style="animation-delay: 0.5s;">
                    <span class="icon">⚡</span>
                    <h3>Fun Fact</h3>
                    <p>I love math so much that I chose Data Science just to live in numbers! 😅 Every dataset tells a story.</p>
                </div>
                <div class="about-item" style="animation-delay: 0.6s;">
                    <span class="icon">🌱</span>
                    <h3>Growth Mindset</h3>
                    <p>Constantly evolving, learning new technologies, and pushing the boundaries of what's possible with data!</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">💻 Tech Stack</h2>
            <div class="tech-stack">
                <div class="tech-item">
                    <span class="tech-icon" style="color: #00599C;">⚡</span>
                    <div class="tech-name">C++</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #3776AB;">🐍</span>
                    <div class="tech-name">Python</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #F7DF1E;">📜</span>
                    <div class="tech-name">JavaScript</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #E34F26;">🌐</span>
                    <div class="tech-name">HTML5</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #1572B6;">🎨</span>
                    <div class="tech-name">CSS3</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #4479A1;">🗃️</span>
                    <div class="tech-name">MySQL</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #013243;">🔢</span>
                    <div class="tech-name">NumPy</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #150458;">🐼</span>
                    <div class="tech-name">Pandas</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #11557C;">📊</span>
                    <div class="tech-name">Matplotlib</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #4C72B0;">🌊</span>
                    <div class="tech-name">Seaborn</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #F05033;">📋</span>
                    <div class="tech-name">Git</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #181717;">🐙</span>
                    <div class="tech-name">GitHub</div>
                </div>
                <div class="tech-item">
                    <span class="tech-icon" style="color: #000000;">📝</span>
                    <div class="tech-name">Notion</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">🌐 Connect With Me</h2>
            <div class="social-links">
                <a href="https://linkedin.com/in/prodhoshvs" class="social-link">
                    <span style="font-size: 1.5rem;">💼</span>
                    LinkedIn
                </a>
                <a href="https://instagram.com/itzprodhosh" class="social-link">
                    <span style="font-size: 1.5rem;">📸</span>
                    Instagram
                </a>
                <a href="mailto:prodhosh3@gmail.com" class="social-link">
                    <span style="font-size: 1.5rem;">📧</span>
                    Email
                </a>
                <a href="https://github.com/PRODHOSH" class="social-link">
                    <span style="font-size: 1.5rem;">🐙</span>
                    GitHub
                </a>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">📊 GitHub Analytics</h2>
            <div class="github-stats">
                <img class="stat-image" src="https://github-readme-stats.vercel.app/api?username=PRODHOSH&theme=midnight-purple&hide_border=false&include_all_commits=false&count_private=false" alt="GitHub Stats">
                <img class="stat-image" src="https://nirzak-streak-stats.vercel.app/?user=PRODHOSH&theme=midnight-purple&hide_border=false" alt="GitHub Streak">
                <img class="stat-image" src="https://github-readme-stats.vercel.app/api/top-langs/?username=PRODHOSH&theme=midnight-purple&hide_border=false&include_all_commits=false&count_private=false&layout=compact" alt="Top Languages">
                <img class="stat-image" src="https://github-profile-trophy.vercel.app/?username=PRODHOSH&theme=midnight-purple&no-frame=false&no-bg=true&margin-w=4" alt="GitHub Trophies">
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">💡 Daily Inspiration</h2>
            <div style="text-align: center; margin-top: 30px;">
                <img class="stat-image" src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical" alt="Dev Quote">
            </div>
        </div>

        <div class="section" style="text-align: center;">
            <h2 class="section-title">🚀 Let's Build Something Amazing</h2>
            <p style="font-size: 1.2rem; margin-bottom: 30px; color: #a855f7;">
                Ready to collaborate on the next big thing? Let's turn ideas into reality!
            </p>
            <button class="pulse-button" onclick="window.open('mailto:prodhosh3@gmail.com', '_blank')">
                📧 Get In Touch
            </button>
            <button class="pulse-button" onclick="window.open('https://github.com/PRODHOSH', '_blank')">
                🔥 View My Work
            </button>
        </div>
    </div>

    <script>
        // Create animated stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const numStars = 100;

            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                starsContainer.appendChild(star);
            }
        }

        // Create matrix effect
        function createMatrix() {
            const matrixContainer = document.getElementById('matrix');
            const characters = '01';
            const numColumns = Math.floor(window.innerWidth / 20);

            for (let i = 0; i < numColumns; i++) {
                const column = document.createElement('div');
                column.style.position = 'absolute';
                column.style.left = i * 20 + 'px';
                column.style.top = '0';

                for (let j = 0; j < 50; j++) {
                    const char = document.createElement('div');
                    char.className = 'matrix-text';
                    char.textContent = characters[Math.floor(Math.random() * characters.length)];
                    char.style.animationDelay = Math.random() * 10 + 's';
                    char.style.animationDuration = (Math.random() * 5 + 5) + 's';
                    column.appendChild(char);
                }
                matrixContainer.appendChild(column);
            }
        }

        // Add scroll animations
        function addScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            });

            document.querySelectorAll('.section, .about-item, .tech-item').forEach(el => {
                observer.observe(el);
            });
        }

        // Add mouse parallax effect
        function addParallaxEffect() {
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;

                document.querySelectorAll('.floating-element').forEach((el, index) => {
                    const speed = (index + 1) * 0.1;
                    const x = (mouseX - 0.5) * speed * 50;
                    const y = (mouseY - 0.5) * speed * 50;
                    el.style.transform += ` translate(${x}px, ${y}px)`;
                });
            });
        }

        // Add tech item interactions
        function addTechInteractions() {
            document.querySelectorAll('.tech-item').forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateY(-15px) rotateY(15deg) scale(1.1)';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateY(0) rotateY(0deg) scale(1)';
                });

                item.addEventListener('click', () => {
                    item.style.animation = 'bounce 0.6s ease';
                    setTimeout(() => {
                        item.style.animation = '';
                    }, 600);
                });
            });
        }

        // Initialize all effects
        document.addEventListener('DOMContentLoaded', () => {
            createStars();
            createMatrix();
            addScrollAnimations();
            addParallaxEffect();
            addTechInteractions();
        });

        // Add typing effect for subtitle
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Add particle explosion effect on tech items
        function createParticleExplosion(x, y) {
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = '#c147e9';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                
                document.body.appendChild(particle);
                
                const angle = (Math.PI * 2 * i) / 10;
                const velocity = Math.random() * 100 + 50;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                let opacity = 1;
                let posX = x;
                let posY = y;
                
                function animate() {
                    posX += vx * 0.02;
                    posY += vy * 0.02;
                    opacity -= 0.02;
                    
                    particle.style.left = posX + 'px';
                    particle.style.top = posY + 'px';
                    particle.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        document.body.removeChild(particle);
                    }
                }
                animate();
            }
        }

        // Add click effects to tech items
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.tech-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const rect = item.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    createParticleExplosion(x, y);
                });
            });
        });

        // Add floating animation to hero elements
        function addFloatingAnimation() {
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((el, index) => {
                const delay = index * 1000;
                const duration = 4000 + (index * 500);
                
                setInterval(() => {
                    el.style.transform += ` scale(${1 + Math.sin(Date.now() / 1000) * 0.1})`;
                }, 100);
            });
        }

        // Add ripple effect to buttons
        function addRippleEffect() {
            document.querySelectorAll('.pulse-button, .social-link').forEach(button => {
                button.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.background = 'rgba(255, 255, 255, 0.4)';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.animation = 'ripple 0.6s linear';
                    ripple.style.pointerEvents = 'none';
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Add CSS for ripple effect
        const rippleCSS = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .pulse-button, .social-link {
                position: relative;
                overflow: hidden;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = rippleCSS;
        document.head.appendChild(style);

        // Add 3D tilt effect to sections
        function add3DTiltEffect() {
            document.querySelectorAll('.section').forEach(section => {
                section.addEventListener('mousemove', (e) => {
                    const rect = section.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / centerY * -5;
                    const rotateY = (x - centerX) / centerX * 5;
                    
                    section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
                
                section.addEventListener('mouseleave', () => {
                    section.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                });
            });
        }

        // Add color changing effect to title
        function addColorChangingTitle() {
            const title = document.querySelector('.hero h1');
            const colors = [
                'linear-gradient(45deg, #ff6b9d, #c147e9, #8b5cf6, #06b6d4)',
                'linear-gradient(45deg, #f093fb, #f5576c)',
                'linear-gradient(45deg, #4facfe, #00f2fe)',
                'linear-gradient(45deg, #43e97b, #38f9d7)',
                'linear-gradient(45deg, #fa709a, #fee140)'
            ];
            
            let colorIndex = 0;
            setInterval(() => {
                colorIndex = (colorIndex + 1) % colors.length;
                title.style.background = colors[colorIndex];
                title.style.backgroundSize = '300% 300%';
                title.style.webkitBackgroundClip = 'text';
                title.style.webkitTextFillColor = 'transparent';
                title.style.backgroundClip = 'text';
            }, 3000);
        }

        // Add scroll progress indicator
        function addScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.position = 'fixed';
            progressBar.style.top = '0';
            progressBar.style.left = '0';
            progressBar.style.width = '0%';
            progressBar.style.height = '3px';
            progressBar.style.background = 'linear-gradient(90deg, #ff6b9d, #c147e9, #8b5cf6)';
            progressBar.style.zIndex = '10000';
            progressBar.style.transition = 'width 0.1s ease';
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }

        // Initialize all enhanced effects
        document.addEventListener('DOMContentLoaded', () => {
            createStars();
            createMatrix();
            addScrollAnimations();
            addParallaxEffect();
            addTechInteractions();
            addFloatingAnimation();
            addRippleEffect();
            add3DTiltEffect();
            addColorChangingTitle();
            addScrollProgress();
            
            // Add a welcome message with typing effect
            setTimeout(() => {
                const subtitle = document.querySelector('.subtitle');
                const originalText = subtitle.textContent;
                typeWriter(subtitle, originalText, 100);
            }, 1000);
        });

        // Add Easter egg - Konami code
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                // Easter egg triggered!
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                    alert('🎉 Easter egg found! You\'re a true developer! 🚀');
                }, 2000);
                konamiCode = [];
            }
        });

        // Add rainbow animation for easter egg
        const rainbowCSS = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = rainbowCSS;
        document.head.appendChild(rainbowStyle);

        // Add dynamic background particles
        function createBackgroundParticles() {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '1';
            canvas.style.opacity = '0.3';
            document.body.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const particles = [];
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    color: `hsl(${280 + Math.random() * 40}, 70%, 60%)`
                });
            }
            
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                    
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                });
                
                requestAnimationFrame(animateParticles);
            }
            
            animateParticles();
            
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }
        
        // Initialize background particles
        setTimeout(createBackgroundParticles, 500);
    </script>
</body>
</html>
