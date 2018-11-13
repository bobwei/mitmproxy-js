/* eslint-disable no-empty */
import { execSync } from 'child_process';

const fn = () => {
  try {
    const pid = execSync('lsof -t -i :8765').toString();
    if (pid) {
      execSync(`kill ${pid}`);
    }
  } catch (e) {}
};

export default fn;
