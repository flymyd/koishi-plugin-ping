import {exec as execCallback} from 'child_process';
import {promisify} from 'util';
import {Logger} from "koishi";

const exec = promisify(execCallback);
const logger = new Logger('ping')

export async function pingIP(ipAddress) {
  try {
    let pingCommand = '';
    let pingArguments = [];
    if (process.platform === 'win32') {
      pingCommand = 'chcp 65001 && ping';
      pingArguments = ['-n', '4', ipAddress];
    } else {
      pingCommand = 'ping';
      pingArguments = ['-c', '4', ipAddress];
    }
    const {stdout} = await exec(`${pingCommand} ${pingArguments.join(' ')}`, {encoding: 'utf8'});
    return stdout;
  } catch (error) {
    logger.error('An error occurred:', error);
    throw error;
  }
}

export function isPingable(target: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    let pingCommand, pingArguments;
    if (process.platform === 'win32') {
      pingCommand = 'ping';
      pingArguments = ['-n', '1', target];
    } else {
      pingCommand = 'ping';
      pingArguments = ['-c', '1', target];
    }
    execCallback(`${pingCommand} ${pingArguments.join(' ')}`, {encoding: 'utf8'}, (error) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
