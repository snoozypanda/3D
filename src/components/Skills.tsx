import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

const SkillSphere = ({ skill, position }: { skill: string; position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#6366f1" transparent opacity={0.8} />
      </mesh>
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </group>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skills = [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'TypeScript', level: 85, category: 'Language' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'Python', level: 80, category: 'Language' },
    { name: 'SQL', level: 72, category: 'API' },
    { name: 'Next.js', level: 80, category: 'Framework' },
    { name: 'Tailwind CSS', level: 75, category: 'Styling' },
    { name: 'Express.js', level: 78, category: 'Backend' },
    { name: 'MongoDB', level: 70, category: 'Database' },
    { name: 'Firebase', level: 65, category: 'Backend' },
  {name:'C++', level: 60, category: 'Language' },
  

  ];

  const skillSpheres = [
    { skill: 'React', position: [0, 0, 0] as [number, number, number] },
    { skill: 'Node.js', position: [2, 1, -1] as [number, number, number] },
    { skill: 'TypeScript', position: [-2, -1, 1] as [number, number, number] },
    { skill: 'Python', position: [1, -2, 0] as [number, number, number] },
    { skill: 'MongoDB', position: [-1, 2, -1] as [number, number, number] },
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96"
          >
            <Canvas>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              {skillSpheres.map((item, index) => (
                <SkillSphere key={index} skill={item.skill} position={item.position} />
              ))}
            </Canvas>
          </motion.div>

          {/* Skills List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <div key={index} className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-purple-400 text-sm">{skill.category}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;