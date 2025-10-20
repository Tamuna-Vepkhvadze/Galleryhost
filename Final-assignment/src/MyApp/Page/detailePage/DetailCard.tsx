import React, { useState, useEffect } from 'react';
import DesktopDatailCard from './DesktopDatailCard';

import type { Photo } from '../../component/interface/interface';
import MobailDatailCard from './mobailDatailCard';

interface DataProp {
  data: Photo;
}

const DetailCard: React.FC<DataProp> = ({ data }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768);

  // დავაკვირდეთ ფანჯრის ზომას
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    // კლინსი
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ternary operator — მხოლოდ ერთი კომპონენტი რეალურად ირეენდერება
  return isDesktop ? (
    <DesktopDatailCard data={data} />
  ) : (
    <MobailDatailCard data={data} />
  );
};

export default DetailCard;
