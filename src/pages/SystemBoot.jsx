import React, { useEffect } from 'react';
import ProjectSpecs from '../components/sections/ProjectSpecs';

export default function SystemBoot() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProjectSpecs />;
}
