import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';
import type { PortfolioData } from '../types/portfolio';

export const usePortfolio = () => {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    // In a real app, this might be a fetch call.
    // For now, we simulate async loading of the JSON to mimic the data layer.
    setData(portfolioData as PortfolioData);
  }, []);

  return { data, loading: !data };
};
