// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT

import {useEffect} from 'react';
import {Announcements} from './components/Announcements';
import {Footer, Header} from './components/Chrome';
import {Earthrise} from './components/Earthrise';
import {MissionLog} from './components/MissionLog';
import {Missions} from './components/Missions';
import {Reserve} from './components/Reserve';
import {Trajectory} from './components/Trajectory';
import {useReducedMotion} from './hooks/useReducedMotion';
import {startScroll} from './lib/scroll';

export default function App() {
  const reduced = useReducedMotion();
  useEffect(() => startScroll(reduced), [reduced]);

  return (
    <>
      <div aria-hidden="true" className="grain" />
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      <Header />
      <main id="main">
        <Earthrise />
        <MissionLog />
        <Trajectory />
        <Missions />
        <Announcements />
        <Reserve />
      </main>
      <Footer />
    </>
  );
}
