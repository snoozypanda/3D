import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Palette, Zap } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces with modern frameworks',
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Building scalable server-side applications and APIs',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Designing intuitive and visually appealing user experiences',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Ensuring fast loading times and smooth user interactions',
    },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with a love for creating digital experiences 
            that make a difference. With expertise in modern web technologies, I bring ideas to 
            life through clean code and innovative solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass p-6 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 glass p-8 rounded-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 gradient-text">My Journey</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Started my journey in web development 5 years ago, I've had the privilege of working 
                with diverse teams and technologies. From small startups to large enterprises, I've 
                contributed to projects that have impacted thousands of users.
              </p>
              <div className="flex flex-wrap gap-4">
                {['React', 'Node.js', 'TypeScript', 'Python', 'AWS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;