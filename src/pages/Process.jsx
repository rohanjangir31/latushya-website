import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Process() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/about', { replace: true });
    setTimeout(() => {
      const el = document.getElementById('process');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }, [navigate]);
  return null;
}

