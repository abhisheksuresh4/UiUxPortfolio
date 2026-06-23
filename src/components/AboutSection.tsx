import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

export const AboutSection = () => {
  const { data } = usePortfolio();
  if (!data) return null;
  const { profile, skills } = data;

  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-8 uppercase tracking-wider text-white" style={{ fontFamily: '"Poppins", sans-serif' }}>About</h2>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light break-normal whitespace-pre-wrap" style={{ fontFamily: '"Poppins", sans-serif' }}>
          {profile.bio}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {skills.categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-gray-400" style={{ fontFamily: '"Poppins", sans-serif' }}>{category.name}</h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map(item => (
                  <span key={item} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
