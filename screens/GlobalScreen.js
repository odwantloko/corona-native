import * as React from 'react';
import GlobalStats from '../components/GlobalStatsComponent';

export default function GlobalScreen() {
  return (
    <GlobalStats/>  
  );
}

GlobalScreen.navigationOptions = {
  header: null,
};

