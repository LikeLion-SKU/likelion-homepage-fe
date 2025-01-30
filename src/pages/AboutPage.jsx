import { useState } from 'react';
import Management from '@/components/aboutPage/Management';
import Babylion from '@/components/aboutPage/Babylion';
import Generation from '@/components/aboutPage/Generation';

export default function AboutPage() {
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <>
      <Generation
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <Management selectedYear={selectedYear} />
      <Babylion selectedYear={selectedYear} />
    </>
  );
}
