import { execFile as execFileCallback } from 'child_process';
import { promisify } from 'util';
import { Logger } from "koishi";

const execFile = promisify(execFileCallback);
const logger = new Logger('ping')

export async function pingIP(ipAddress) {
  try {
    let pingCommand = '';
    let pingArguments = [];
    if (process.platform === 'win32') {
      pingCommand = 'ping';
      pingArguments = ['-n', '4', ipAddress];
    } else {
      pingCommand = 'ping';
      pingArguments = ['-c', '4', ipAddress];
    }
    const { stdout } = await execFile(pingCommand, pingArguments, { encoding: 'utf8' });
    return stdout;
  } catch (error) {
    logger.error('An error occurred:', error);
    throw error;
  }
}

export function isValidateInput(input) {
  const ipv4Pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){2,2}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$/;
  const domainPattern = /^(?:(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-f0-9:]+)\])$/;
  return ipv4Pattern.test(input) || ipv6Pattern.test(input) || domainPattern.test(input);
}