import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

export const AboutSection = () => {
  const { data } = usePortfolio();
  if (!data) return null;
  const { profile, skills } = data;

  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto scroll-mt-20">
      {/* Subtle top separator */}
      <div
        className="w-full h-px mb-16 mx-auto max-w-md"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(232, 162, 58, 0.15), transparent)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-8 uppercase tracking-wider text-text-primary">
          About
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed text-text-secondary font-light break-normal whitespace-pre-wrap">
          {profile.bio}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {skills.categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
            >
              <h3 className="text-sm font-bold mb-5 uppercase tracking-[0.2em] text-accent">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm font-medium text-text-secondary hover:border-accent/25 hover:text-text-primary hover:bg-accent/[0.04] transition-all duration-200 cursor-default"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.15 + itemIndex * 0.04, duration: 0.3 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
