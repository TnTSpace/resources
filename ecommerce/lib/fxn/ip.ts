export interface IpLookupResult {
  ip: string | null;
  error?: string;
  source?: string;
}

export class IpAddressService {
  private static readonly IP_SERVICES = [
    {
      url: 'https://api.ipify.org?format=json',
      extractIp: (data: any) => data.ip
    },
    {
      url: 'https://api.ip.sb/ip',
      extractIp: (data: any) => data as string
    },
    {
      url: 'https://api64.ipify.org?format=json',
      extractIp: (data: any) => data.ip
    }
  ];

  /**
   * Gets the user's public IP address using multiple fallback services
   * @returns Promise containing the IP address or error information
   */
  public static async getUserIp(): Promise<IpLookupResult> {
    for (const service of this.IP_SERVICES) {
      try {
        const response = await fetch(service.url);
        
        if (!response.ok) {
          continue; // Try next service if this one fails
        }

        let data;
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        const ip = service.extractIp(data);
        
        if (ip && this.isValidIp(ip)) {
          return {
            ip,
            source: new URL(service.url).hostname
          };
        }
      } catch (error) {
        console.warn(`IP lookup failed for ${service.url}:`, error);
        continue; // Try next service
      }
    }

    return {
      ip: null,
      error: 'Failed to retrieve IP address from all available services'
    };
  }

  /**
   * Validates IPv4 and IPv6 addresses
   * @param ip - IP address to validate
   * @returns boolean indicating if the IP is valid
   */
  private static isValidIp(ip: string): boolean {
    // IPv4 regex pattern
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    
    // IPv6 regex pattern
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

    if (ipv4Pattern.test(ip)) {
      // Additional validation for IPv4 octets
      const parts = ip.split('.');
      return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
      });
    }

    return ipv6Pattern.test(ip);
  }
}