// src/client-modules/injectReact.js
// This script attempts to make React globally available,
// which might resolve 'React is not defined' errors in some Docusaurus environments.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  try {
    window.React = require('react');
  } catch (e) {
    console.error('Failed to inject React globally:', e);
  }
}
