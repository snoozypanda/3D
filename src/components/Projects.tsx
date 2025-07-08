import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your GitHub username
  const GITHUB_USERNAME = 'octocat'; // Change this to your GitHub username

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Fallback projects if GitHub API fails
  const fallbackProjects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration',
      html_url: 'https://github.com',
      homepage: 'https://demo.com',
      language: 'TypeScript',
      stargazers_count: 24,
      forks_count: 8,
      topics: ['react', 'nodejs', 'stripe', 'mongodb'],
      updated_at: '2024-01-15T10:00:00Z',
    },
    {
      id: 2,
      name: 'Task Management App',
      description: 'Collaborative task management with real-time updates and team features',
      html_url: 'https://github.com',
      homepage: 'https://taskapp.com',
      language: 'JavaScript',
      stargazers_count: 18,
      forks_count: 5,
      topics: ['react', 'socket.io', 'postgresql'],
      updated_at: '2024-01-10T14:30:00Z',
    },
    {
      id: 3,
      name: 'Weather Dashboard',
      description: 'Beautiful weather application with location-based forecasts and charts',
      html_url: 'https://github.com',
      homepage: 'https://weather.com',
      language: 'React',
      stargazers_count: 12,
      forks_count: 3,
      topics: ['react', 'api', 'charts', 'weather'],
      updated_at: '2024-01-05T09:15:00Z',
    },
  ];

  const projectsToShow = error ? fallbackProjects : repos;

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      React: '#61dafb',
      Python: '#3776ab',
      HTML: '#e34c26',
      CSS: '#1572b6',
      Vue: '#4fc08d',
      Java: '#ed8b00',
      'C++': '#00599c',
      Go: '#00add8',
    };
    return colors[language] || '#6366f1';
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my latest work and open-source contributions
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-300">Loading projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsToShow.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass p-6 rounded-xl hover:bg-white/10 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex space-x-2">
                    <motion.a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </motion.a>
                    {project.homepage && (
                      <motion.a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star size={16} />
                      <span>{project.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork size={16} />
                      <span>{project.forks_count}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(project.language) }}
                    />
                    <span className="text-sm text-gray-400">{project.language}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.topics?.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 p-4 glass rounded-lg"
          >
            <p className="text-yellow-400 mb-2">
              ⚠️ Using demo projects (GitHub API temporarily unavailable)
            </p>
            <p className="text-gray-400 text-sm">
              Update the GITHUB_USERNAME in Projects.tsx to fetch your repositories
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;